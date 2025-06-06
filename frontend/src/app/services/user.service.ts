import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUserStats(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${email}/stats`);
  }

  updateListeningTime(email: string, duration: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${email}/listening-time`, {
      duration: duration
    });
  }

  likeSong(email: string, song: { name: string; artist: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${email}/likes`, {
      songName: song.name,
      artist: song.artist
    });
  }
}
