import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

import { OAuthResponse } from '../../models/authentication';

@Injectable()
export class AuthService {

  private tokenUrl = 'http://films/oauth/v2/token';

  private clientRandomId = '2_3jas9un8ty04c0kso4oko4c0gwwkgck4c0sc4oso88o08oc8g8';
  private clientSecret = '4d2jwwqpkps0swwcw4oskwccwks08o0408w4sc4oosgc0ssks0';

  constructor(
    private http: HttpClient
  ) { }

  public getToken(): string {
    return localStorage.getItem('auth_token');
  }

  private getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  public deleteTokens() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('auth_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  public refreshToken(): Observable<any> {
    if (!this.getRefreshToken()) {
      return Observable.of<boolean>(false);
    }

    let requestUrl = `${this.tokenUrl}?grant_type=refresh_token&client_id=${this.clientRandomId}&client_secret=${this.clientSecret}&refresh_token=${this.getRefreshToken()}`;

    return this.http.get(requestUrl);
  }

  public login(username: string, password: string): Promise<boolean> {
    let requestUrl = `${this.tokenUrl}?grant_type=password&client_id=${this.clientRandomId}&client_secret=${this.clientSecret}&username=${username}&password=${password}`;

    return this.http.get(requestUrl).toPromise()
      .then((result: OAuthResponse) => {
        this.setTokens(result.access_token, result.refresh_token);

        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
