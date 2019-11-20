import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, Input } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userName;
  hideLogIn = true;
  hideSignUp = true;
  hideLogOut = false;
  hideMe = false;
  @ViewChild('alert', { static: false, read: ViewContainerRef }) entry: ViewContainerRef;


  constructor(private resolver: ComponentFactoryResolver, private authService: AuthService) { }

  ngOnInit() {
  }

  switchButtons() {
    this.hideLogIn = !this.hideLogIn;
    this.hideSignUp = !this.hideSignUp;
    this.hideLogOut = !this.hideLogOut;
    this.hideMe = !this.hideMe;
  }

  logOut() {
    this.authService.deleteToken();
    this.createAlertComponent("success", "User logged out successfully!");
    this.switchButtons();
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

  userCredential(user) {
    console.log(user);
    this.userName = user.name;
  }
}
