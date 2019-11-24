import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, Input, OnDestroy } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { AuthService } from './services/auth.service';
import { GlobalsService } from './services/globals.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  user;
  isAuthenticated = false;
  private userCredentialsSubscription: Subscription;

  @ViewChild('alert', { static: false, read: ViewContainerRef }) entry: ViewContainerRef;


  constructor(private resolver: ComponentFactoryResolver,
    private authService: AuthService,
    globalsService: GlobalsService, private toastr: ToastrService, private router: Router) {
    // this.user = globalsService.user;
  }

  ngOnInit() {
    // this.userRole = this.authService.getRole();
    console.log(this.authService.getToken());
    if (this.authService.getToken()) {
      this.authService.getUser();
    }
    this.userCredentialsSubscription = this.authService.getUserCredentials()
      .subscribe(res => {
        console.log(res);
        if (res.name != "") {
          this.user = { ...res };
          this.user.name = this.user.name.split(" ")[0];
          this.isAuthenticated = !this.isAuthenticated;;
        } else {
          // this.isAuthenticated = !this.isAuthenticated;
          console.log(this.isAuthenticated);
        }
      });
  }

  ngOnDestroy() {
    this.userCredentialsSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    console.log('Before', this.isAuthenticated);
    this.isAuthenticated = !this.isAuthenticated;
    console.log('after', this.isAuthenticated);
    this.toastr.success('User logged out successfully!', '', {
      positionClass: 'toast-top-center',
      timeOut: 3000
    });
  }

  createAlertComponent(type, msg) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(AlertComponent);
    let componentRef = this.entry.createComponent(factory);
    componentRef.instance.type = type;
    componentRef.instance.msg = msg;
    window.setTimeout(() => {
      componentRef.destroy();
    }, 3000);
  }

  // userCredential(user) {
  //   this.user = user.name;
  // }
}
