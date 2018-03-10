import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth-service/auth.service';
import 'rxjs/add/observable/of';

import { UserExtended } from '../../models/user';

@Injectable()
export class ProfileService {

  private getProfileUrl = 'http://films/app_dev.php/api/get-user-profile';

  constructor(
    private http: HttpClient
  ) { }

  getUserProfile(profileId: number): Observable<UserExtended> {
    return this.http.get<UserExtended>(`${this.getProfileUrl}/${profileId}`);
  }
}
