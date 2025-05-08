import { Component, OnInit } from '@angular/core';
import { UserStats } from '../../models/user-stats';

@Component({
  selector: 'app-analytics',
  standalone: false,
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  stats: UserStats = {
    totalListens: 0,
    favGenre: '',
    topSongs: [],
    totalListenTime: 0,
  };

  ngOnInit(): void {
    // Fetch user stats from the backend
  }
}
