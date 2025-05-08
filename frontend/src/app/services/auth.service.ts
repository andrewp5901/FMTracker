import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api'; // change this if your backend runs elsewhere

  private userEmailSubject = new BehaviorSubject<string | null>(localStorage.getItem('userEmail'));
  userEmail$ = this.userEmailSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${this.apiUrl}/login`, credentials).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userEmail', credentials.email);
          this.userEmailSubject.next(credentials.email); // update live
          observer.next(response);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.userEmailSubject.next(null); // clear live
  }
}
