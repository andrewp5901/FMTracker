import { Component, OnInit, OnDestroy } from '@angular/core';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  nowPlaying: string = '';
  private startTime: number = 0;

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.startTime = Date.now();

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

    const userEmail = localStorage.getItem('userEmail');

    if (userEmail && durationSeconds > 0) {
      this.songService.updateListeningTime({ userEmail, duration: durationSeconds }).subscribe({
        next: (res) => console.log('Listening time updated:', res),
        error: (err) => console.error('Failed to update listening time.', err)
      });
    }
  }
}
