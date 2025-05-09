import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  passwd: string = '';

  login() {
    // Auth service and JWT implementation
    console.log('Login form submitted: ', this.email, this.passwd);
  }
}
