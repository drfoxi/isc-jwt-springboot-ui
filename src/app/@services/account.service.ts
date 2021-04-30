import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {environment} from '@environments/environment';
import {User} from '@app/@models';
import jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username, password, channel) {
    return this.http.post(`${environment.apiUrl}/security/authenticate`, {username, password, channel});
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('_auth_token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/security/register`, user);

  }

  getAllUsers() {
    return this.http.get(`${environment.apiUrl}/user/fetchAllUsers`);
  }

  getById(id: string) {
    return this.http.get(`${environment.apiUrl}/user/fetchUserById/?id=${id}`);
  }

  update(id, user) {
    return this.http.put(`${environment.apiUrl}/user/updateUserById`, user);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/user/deleteUserById/?id=${id}`);
  }

  getUserRole() {
    const token = this.getDecodedAccessToken(JSON.parse(localStorage.getItem('_auth_token')));
    return (token != null) ? token.payload.userRole : false;
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('_auth_token'));
    return (token != null) ? token : false;
  }
}
