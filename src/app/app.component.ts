import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, Input } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  hideLogIn = false;
  hideSignUp = false;
  hideLogOut = true;
  hideMe = true;
  @ViewChild('alert', { static: false, read: ViewContainerRef }) entry: ViewContainerRef;


  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }
  
  switchButtons(){
    console.log('Before Login flag: ', this.hideLogIn , 'Signup flag:', this.hideSignUp);
    this.hideLogIn = !this.hideLogIn;
    this.hideSignUp = !this.hideSignUp;
    this.hideLogOut = !this.hideLogOut;
    this.hideMe = !this.hideMe;
    console.log('After Login flag: ', this.hideLogIn , 'Signup flag:', this.hideSignUp);
  }

  createAlertComponent(type, msg) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(AlertComponent);
    let componentRef = this.entry.createComponent(factory);
    componentRef.instance.type = type;
    componentRef.instance.msg = msg;
    window.setTimeout(()=>{
      componentRef.destroy();
    } , 3000);
  }
}
