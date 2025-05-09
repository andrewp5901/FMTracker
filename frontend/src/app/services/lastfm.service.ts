import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LastfmService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


sendData(data: any): Observable<any>{
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
}