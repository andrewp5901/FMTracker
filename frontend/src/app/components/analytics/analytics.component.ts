import { Component, OnInit } from '@angular/core';
import { UserStats } from '../../models/user-stats';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-analytics',
  standalone: false,
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
  stats: UserStats = {
    totalListens: 0,
    favGenre: '',
    topSongs: [],
    totalListenTime: 0,
  };

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
      this.songService.getUserStats(userEmail).subscribe({
        next: (data) => {
          this.stats.totalListenTime = data.totalListeningTime;
        },
        error: (err) => {
          console.error('Failed to fetch user stats.', err);
        }
      });
    }
  }
  get formattedListenTime(): string {
    const minutes = Math.floor(this.stats.totalListenTime / 60);
    const seconds = this.stats.totalListenTime % 60;
    return `${minutes}m ${seconds}s`;
  }


}


