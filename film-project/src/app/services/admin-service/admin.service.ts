import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CreateFilmRequest } from '../../models/film';
import { BaseResponse } from '../../models/common';

@Injectable()
export class AdminService {

  private addFilmUrl = 'http://films/app_dev.php/api/add-film';

  constructor(
    private http: HttpClient
  ) { }

  addFilm(request: CreateFilmRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(this.addFilmUrl, request);
  }
}
