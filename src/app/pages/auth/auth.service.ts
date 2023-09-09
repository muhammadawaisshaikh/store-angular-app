import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Login API call
   * @param user 
   * @returns Observable of User API response
   */
  login(user: User) {
    let endpoint = `${environment.AUTH_BASE_URL}/auth/login`;
    return this.http.post(endpoint, user, this.httpOptions);
  }

  /**
   * Storing user to Session
   * @param user 
   */
  setUserSession(user: User) {
    let strinfigyUser = JSON.stringify(user)
    sessionStorage.setItem('user', strinfigyUser);
  }

  /**
   * Getting user from Session
   * @returns user
   */
  getSessionUser() {
    let user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return user;
  }
}
