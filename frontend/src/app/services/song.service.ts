import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private apiUrl = 'http://localhost:3000/api/songs';

  constructor(private http: HttpClient) { }

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrl);
  }

  // Fetch now playing song
  getNowPlaying(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/nowplaying');
  }

  // Update listening time
  updateListeningTime(data: { userEmail: string | null, duration: number }): Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/userstats/updateTime', data);
  }

  // Fetch user stats
  getUserStats(userEmail: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/userstats/${userEmail}`);
  }
}
