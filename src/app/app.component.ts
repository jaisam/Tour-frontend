import { Component } from '@angular/core';


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

  constructor() { }

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

}
