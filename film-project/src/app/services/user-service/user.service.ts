import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth-service/auth.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map'

import { User } from '../../models/user';
import { UserRegusterRequest } from '../../models/user';

@Injectable()
export class UserService {

  private getUserUrl = 'http://films/api/get-user';
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
    userRQ.subscribe((user) => {
      this.user = user
    });

    return userRQ;
  }

  register( registerRequest: UserRegusterRequest ): Observable<string> {
    return this.http
      .post(this.registerUrl, registerRequest, { headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .map((response) => {
        console.log(response)
        return "ok"
      })
      .catch((error) => {
        console.log(error);
        return "err"
      });
  }

  login(username: string, password: string): Promise<boolean> {
    return this.authService.login(username, password);
  }

  logout(): void {
    this.user = undefined;
    this.authService.deleteTokens();
  }
}
