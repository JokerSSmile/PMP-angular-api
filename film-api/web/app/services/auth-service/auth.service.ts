import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

import { OAuthResponse } from '../../models/authentication';

@Injectable()
export class AuthService {

  private tokenUrl = 'http://films/app_dev.php/oauth/v2/token';

  private clientRandomId = '2_3jas9un8ty04c0kso4oko4c0gwwkgck4c0sc4oso88o08oc8g8';
  private clientSecret = '4d2jwwqpkps0swwcw4oskwccwks08o0408w4sc4oosgc0ssks0';

  private AUTH_TOKEN_NAME: string = 'auth_token';
  private REFRESH_TOKEN_NAME: string = 'refresh_token';

  constructor(
    private http: HttpClient
  ) { }

  public getToken(): string {
    return localStorage.getItem(this.AUTH_TOKEN_NAME);
  }

  private getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN_NAME);
  }

  public deleteTokens() {
    localStorage.removeItem(this.AUTH_TOKEN_NAME);
    localStorage.removeItem(this.REFRESH_TOKEN_NAME);
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.AUTH_TOKEN_NAME, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_NAME, refreshToken);
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
