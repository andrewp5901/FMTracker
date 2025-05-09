import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastfmService {

  private apiUrl = 'http://localhost:5000';  // Make sure port matches backend

  constructor(private http: HttpClient) {}

  sendData(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.apiUrl}/lastfmendpoint`, data, httpOptions);
  }

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/lastfm`);
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/lastfm/data`);
  }
}
