import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, Input, OnDestroy } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { AuthService } from './services/auth.service';
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
  private userCredentialsSubscription: Subscription;

  @ViewChild('alert', { static: false, read: ViewContainerRef }) entry: ViewContainerRef;


  constructor(private resolver: ComponentFactoryResolver,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit() {
    if (this.authService.getToken()) {
      this.authService.getUser();
    }
    else {
      this.user = {
        name: "",
        email: "",
        photo: "",
        role: ""
      }
    }
    this.userCredentialsSubscription = this.authService.getUserCredentials()
      .subscribe(res => {
        if (res) {
          this.user = { ...res };
          this.user.name = this.user.name.split(" ")[0];
          // console.log(this.user.name);
        }
      });
  }

  ngOnDestroy() {
    this.userCredentialsSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
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

}
