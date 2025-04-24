import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseApiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  pingServer(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/api/ping`);
  }
}
