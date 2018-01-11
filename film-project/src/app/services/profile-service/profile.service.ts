import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth-service/auth.service';
import 'rxjs/add/observable/of';

import { User } from '../../models/user';

@Injectable()
export class ProfileService {

  private getProfileUrl = 'http://films/api/get-user-profile';

  private user: User;

  constructor(
    private http: HttpClient
  ) { }

  getUserProfile(profileId: number): Observable<User> {
    return this.http.get<User>(`${this.getProfileUrl}/${profileId}`);
  }
}
