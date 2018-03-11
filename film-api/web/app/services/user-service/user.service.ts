import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { AuthService } from '../auth-service/auth.service';

import { UserDefault, UserRegusterRequest, UserRegisterPreRequest } from '../../models/user';
import { UserRegisterResponse, BaseResponse } from '../../models/common';
import { SettingsRequest } from '../../models/settings';

@Injectable()
export class UserService {

  private getUserUrl = 'http://films/app_dev.php/api/get-user';
  private preRegisterUrl = 'http://films/api/pre-register';
  private registerUrl = 'http://films/api/register';
  private saveSettingsUrl = 'http://films/app_dev.php/api/save-settings';

  private user: UserDefault;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUser(forceUpdate?: boolean): Observable<UserDefault> {
    if (this.user && !forceUpdate) {
      return Observable.of(this.user);
    }

    let userRQ: Observable<UserDefault> = this.http.get<UserDefault>(this.getUserUrl);
    userRQ.subscribe((user: UserDefault) => {
      this.user = user
    });

    return userRQ;
  }

  register(request: UserRegusterRequest): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>(this.registerUrl, request);
  }

  preRegister(request: UserRegisterPreRequest): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>(this.preRegisterUrl, request);
  }

  saveSettings(request: SettingsRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(this.saveSettingsUrl, request);
  }

  login(username: string, password: string): Promise<boolean> {
    return this.authService.login(username, password);
  }

  logout(): void {
    this.user = undefined;
    this.authService.deleteTokens();
    window.location.href = '/login';
  }
}
