import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  passwd: string = '';

  register() {
    // Connect with AuthService and JWT
    console.log('Register form submitted:', this.name, this.email, this.passwd);
  }
}
