import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name;
  email;
  password;
  passwordConfirm;
  @Output() userCredentials = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  createAccount(form) {

    let user = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      passwordConfirm: form.value.passwordConfirm
    };

    this.authService.signup(user)
  }

}
