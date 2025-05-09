import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = '';
  error: string = '';
  isLoggedIn: boolean = false;
  userEmail: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // Check if user is already logged in (e.g., page refresh)
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      this.isLoggedIn = true;
      this.userEmail = savedEmail;
    }
  }

  onSubmit() {
    this.message = '';
    this.error = '';

    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.message = 'Login successful!';
        this.isLoggedIn = true;
        this.userEmail = credentials.email;
        // Token & email already saved in service
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  deleteAccount() {
    if (!this.userEmail) {
      this.error = 'No user is logged in.';
      return;
    }

    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    this.authService.deleteAccount(this.userEmail).subscribe({
      next: (response) => {
        this.message = 'Account deleted successfully.';
        this.isLoggedIn = false;
        this.userEmail = null;
        this.authService.logout();
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to delete account.';
      }
    });
  }
}
