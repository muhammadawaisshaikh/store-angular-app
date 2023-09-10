import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './auth.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated : boolean = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router
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

  /**
   * check authentication
   * @returns isAuthenticated
   */
  checkAuthentication(): boolean {
    let userDetails = this.getSessionUser();

    if (userDetails && Object.keys(userDetails)?.length > 0) {
      this.isAuthenticated = true;
      return true;
    } 
    else {
      this.isAuthenticated = false;
      this.router.navigateByUrl('/auth');
      return false;
    }
  }

  /**
   * checking if loggedIn User is Admin
   * @returns isAdmin
   */
  isAdmin(): boolean {
    let userDetails = this.getSessionUser();

    if (userDetails && Object.keys(userDetails)?.length > 0 && userDetails.role == "admin") {
      return true;
    } 
    else {
      return false;
    }
  }

  /**
   * Get User Role
   * @returns role
   */
  getRole() {
    let userDetails = this.getSessionUser();

    if (userDetails && Object.keys(userDetails)?.length > 0) {
      return userDetails.role;
    }
  }
}
