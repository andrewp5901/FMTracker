import { Component, OnInit, OnDestroy } from '@angular/core';
import { LastfmService } from '../../services/lastfm.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {
  nowPlaying: string = '';
  private startTime: number = 0;
  private userEmail: string | null = '';

  constructor(
    private lastfmService: LastfmService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.startTime = Date.now();
    this.userEmail = localStorage.getItem('userEmail');

    // Call Last.fm directly
    this.lastfmService.getUserInfo().subscribe({
      next: (data) => {
        console.log('Last.fm data:', data);

        const recentTracks = data?.recenttracks?.track;
        if (recentTracks && recentTracks.length > 0) {
          const latestTrack = recentTracks[0];
          const songName = latestTrack.name;
          const artist = latestTrack.artist['#text'];
          this.nowPlaying = `${songName} by ${artist}`;
        } else {
          this.nowPlaying = 'No recent tracks found.';
        }
      },
      error: (err) => {
        console.error('Failed to fetch now playing:', err);
        this.nowPlaying = 'Error loading track.';
      }
    });
  }

  ngOnDestroy(): void {
    const endTime = Date.now();
    const durationSeconds = Math.floor((endTime - this.startTime) / 1000); // duration in seconds

    if (this.userEmail && durationSeconds > 0) {
      this.userService.updateListeningTime(this.userEmail, durationSeconds).subscribe({
        next: (res) => console.log('Listening time updated:', res),
        error: (err) => console.error('Failed to update listening time.', err)
      });
    }
  }
}
