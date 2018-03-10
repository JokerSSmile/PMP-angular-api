import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { parseString } from 'xml2js';
import * as $ from 'jquery';

import { FilmDefault, FilmExtended, Ratings } from '../../models/film';
import { BaseResponse } from '../../models/common';
import { UserDefault } from '../../models/user';

@Injectable()
export class FilmService {

  private getFilmsUrl = 'http://films/app_dev.php/api/get-films';
  private getFilmUrl = 'http://films/app_dev.php/api/get-film';
  private subscribeUrl = 'http://films/app_dev.php/api/subscribe';
  private unsubscribeUrl = 'http://films/app_dev.php/api/unsubscribe';
  private getFilmUsersUrl = 'http://films/app_dev.php/api/get-film-users';
  private ratingsUrl = 'https://rating.kinopoisk.ru';

  constructor(
    private http: HttpClient
  ) { }

  getFilms() {
    return this.http.get<FilmDefault[]>(this.getFilmsUrl);
  }

  getFilm(filmId: number): Observable<FilmExtended> {
    return this.http.get<FilmExtended>(`${this.getFilmUrl}/${filmId}`);
  }

  // TODO: check
  getFilmUsers(filmId: number): Observable<UserDefault[]> {
    return this.http.get<UserDefault[]>(`${this.getFilmUsersUrl}/${filmId}`);
  }

  subscribe(filmId: number, userId: number): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${this.subscribeUrl}?filmId=${filmId}&userId=${userId}`);
  }

  unsubscribe(filmId: number, userId: number): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${this.unsubscribeUrl}?filmId=${filmId}&userId=${userId}`);
  }

  getRatings(kinopoiskFilmId: number): any {
    return $.ajax({
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      type: 'GET',
      url: this.ratingsUrl + '/' + kinopoiskFilmId + '.xml',
    }).promise();
  }
}
