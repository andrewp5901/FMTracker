import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userEmail$.subscribe(email => {
      this.userEmail = email;
    });
  }

  logout() {
    this.authService.logout();
    // Optionally: this.router.navigate(['/login']);
  }
}
