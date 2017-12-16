import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/distinctUntilChanged';
import '../rxjs-operator';
import {
  UserModel, TokenModel
} from '../../shared/models';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private http: Http
  ) {
  }

  private islogin   = localStorage.getItem('token') ? true : false;
    private url       = 'https://api.rldwebshop.xyz/api/v1';
  private headers   = new Headers({'Accept': 'application/json'});

  login(data: any): Promise<UserModel>{
    return this.http.post(this.url+'/auth/login', data, {headers: this.headers})
      .toPromise()
      .then(response  => response.json() as UserModel)
      .catch(this.handleError);
  }

  register(data: any): Promise<UserModel[]>{
    return this.http.post(this.url+'/auth/register', data, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as UserModel[])
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(this.url+'/auth/logout?token='+this.getToken(), {header: this.headers})
    .toPromise()
    .then(response=>null)
    .catch(this.handleError);
  }

  getUser(): Promise<UserModel> {
    return this.http.get(this.url+'/user/'+this.getUserToken().id, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as UserModel)
      .catch(this.handleError);
  }

  getStatus() {
    if(localStorage.getItem('token')) return true;
    else return false;
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }

  getUserToken() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setLogin(user, token) {
    this.islogin = true;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  updateUserToken(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setLogout() {
    this.islogin = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn() {
    return this.islogin;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
