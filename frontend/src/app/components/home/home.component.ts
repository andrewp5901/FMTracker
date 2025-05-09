import { Component, OnInit, OnDestroy } from '@angular/core';
import { SongService } from '../../services/song.service';
import { UserService } from '../../services/user.service';
import { LastfmService } from '../../services/lastfm.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  nowPlaying: string = '';
  private startTime: number = 0;
  private userEmail: string | null = '';

  constructor(
    private songService: SongService,
    private userService: UserService,
    private lastfmService: LastfmService
  ) {}

  ngOnInit(): void {
    this.startTime = Date.now();
    this.userEmail = localStorage.getItem('userEmail');

    this.songService.getNowPlaying().subscribe({
      next: (data) => {
        this.nowPlaying = data.nowPlaying
          ? `${data.title} by ${data.artist}`
          : 'Nothing is currently playing.';
      },
      error: () => {
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
