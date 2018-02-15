import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth-service/auth.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map'

import { User, UserRegusterRequest, UserRegisterPreRequest } from '../../models/user';
import { UserRegisterResponse } from '../../models/common';

@Injectable()
export class UserService {

  private getUserUrl = 'http://films/app_dev.php/api/get-user';
  private preRegisterUrl = 'http://films/api/pre-register';
  private registerUrl = 'http://films/api/register';

  private user: User;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUser(forceUpdate?: boolean): Observable<User> {
    if (this.user && !forceUpdate) {
      return Observable.of(this.user);
    }

    let userRQ: Observable<User> = this.http.get<User>(this.getUserUrl);
    userRQ.subscribe((user: User) => {
      this.user = user
    });

    return userRQ;
  }

  register(registerRequest: UserRegusterRequest) {
    return this.http
      .post(this.registerUrl, registerRequest)
      .map((response: UserRegisterResponse) => {
        return response;
      });
  }

  preRegister(preRegisterPreRequest: UserRegisterPreRequest) {
    return this.http
      .post(this.preRegisterUrl, preRegisterPreRequest)
      .map((response: UserRegisterResponse) => {
        return response;
      });
  }

  login(username: string, password: string) {
    return this.authService.login(username, password);
  }

  logout(): void {
    this.user = undefined;
    this.authService.deleteTokens();
  }
}
