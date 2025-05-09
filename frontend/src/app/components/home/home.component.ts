import { Component, OnInit, OnDestroy } from '@angular/core';
import { LastfmService } from '../../services/lastfm.service';
import { UserService } from '../../services/user.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {
  nowPlaying: string = '';
  art: string = '/frontend/public/image.png';
  private startTime: number = 0;
  private userEmail: string | null = '';
  private currentSong: { name: string; artist: string } | null = null;
  likeMessage: string = '';
  likeError: string = '';
  subscription: any;

  constructor(
    private lastfmService: LastfmService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.startTime = Date.now();
    this.userEmail = localStorage.getItem('userEmail');

    this.subscription = timer(0,5000).subscribe(() =>{
      this.lastfmService.getUserInfo().subscribe({
        next: (data) => {
          const recentTracks = data?.recenttracks?.track;
          if (recentTracks && recentTracks.length > 0) {
            const latestTrack = recentTracks[0];
            const songName = latestTrack.name;
            const artist = latestTrack.artist['#text'];
            this.art = latestTrack.image[1]['#text'];
            this.nowPlaying = `${songName} by ${artist}`;
            this.currentSong = { name: songName, artist: artist };
          } else {
            this.nowPlaying = 'No recent tracks found.';
          }
        },
        error: (err) => {
          console.error('Failed to fetch now playing:', err);
          this.nowPlaying = 'Error loading track.';
        }
      });
      console.log(this.art)
    })

    
  }

  likeSong(): void {
    if (!this.userEmail || !this.currentSong) {
      this.likeError = 'No user logged in or no song to like.';
      return;
    }

    this.userService.likeSong(this.userEmail, this.currentSong).subscribe({
      next: (res) => {
        this.likeMessage = 'Song liked successfully!';
        this.likeError = '';
      },
      error: (err) => {
        console.error('Error liking song:', err);
        this.likeMessage = '';
        this.likeError =
          err.error?.message || 'Failed to like song. It may already be liked.';
      }
    });
  }

  ngOnDestroy(): void {
    const endTime = Date.now();
    const durationSeconds = Math.floor((endTime - this.startTime) / 1000);

    if (this.userEmail && durationSeconds > 0) {
      this.userService.updateListeningTime(this.userEmail, durationSeconds).subscribe({
        next: (res) => console.log('Listening time updated:', res),
        error: (err) => console.error('Failed to update listening time.', err)
      });
    }
  }
}
