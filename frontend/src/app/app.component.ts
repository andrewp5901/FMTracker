import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  message = 'Connecting...'

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.pingServer().subscribe({
      next: (res) => this.message = res.message,
      error: () => this.message = 'Failed to connect to server.'
    });
  }
}
