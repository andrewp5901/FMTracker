import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-analytics',
  standalone: false,
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
  totalListeningTime: number = 0;
  likedSongs: { songName: string; artist: string }[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
      this.userService.getUserStats(userEmail).subscribe({
        next: (data) => {
          this.totalListeningTime = data.totalListeningTime || 0;
          this.likedSongs = data.likedSongs || [];
        },
        error: (err) => {
          console.error('Failed to fetch user stats.', err);
        }
      });
    }
  }

  get formattedListenTime(): string {
    const minutes = Math.floor(this.totalListeningTime / 60);
    const seconds = this.totalListeningTime % 60;
    return `${minutes}m ${seconds}s`;
  }
}
