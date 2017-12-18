import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';

@Injectable()
export class UserService {

  private getUserUrl = 'http://films/api/get-user';
  private loginUrl = 'http://films/oauth/v2/token';

  constructor(
    private http: HttpClient
  ) { }

  getUser(): Observable<User> {
    return this.http.get<User>(this.getUserUrl);
  }

  login(username: string, password: string): Promise<boolean> {
    let requestUrl = this.loginUrl + '?grant_type=password&client_id=1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4&client_secret=4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k&username=' + username +'&password=' + password;

    return this.http.get(requestUrl).toPromise()
      .then((result: any) => {
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token);

        return true;
      })
      .catch(e => {
        return false;
    });
  }
}
