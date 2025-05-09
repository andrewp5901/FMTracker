import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.message = '';
    this.error = '';

    if (this.registerForm.invalid) return;

    const formData = this.registerForm.value;

    this.authService.register(formData).subscribe({
      next: (res) => {
        this.message = 'Registration successful! You can now log in.';
      },
      error: (err) => {
        this.error = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
