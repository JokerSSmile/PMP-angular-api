import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Film } from '../../models/film';
import { BaseResponse } from '../../models/common';

@Injectable()
export class FilmService {

  private getFilmsUrl = 'http://films/api/get-films';
  private getFilmUrl = 'http://films/api/get-film';
  private subscribeUrl = 'http://films/api/subscribe';
  private unsubscribeUrl = 'http://films/api/unsubscribe';

  constructor(
    private http: HttpClient
  ) { }

  getFilms(): Promise<Film[]> {
    return this.http.get<Film[]>(this.getFilmsUrl).toPromise();
  }

  getFilm(filmId: number): Promise<Film> {
    return this.http.get<Film>(`${this.getFilmUrl}/${filmId}`).toPromise();
  }

  subscribe(filmId: number, userId: number) {
    return this.http.get<BaseResponse>(`${this.subscribeUrl}?filmId=${filmId}&userId=${userId}`).toPromise();
  }

  unsubscribe(filmId: number, userId: number) {
    return this.http.get<BaseResponse>(`${this.unsubscribeUrl}?filmId=${filmId}&userId=${userId}`).toPromise();
  }
}
