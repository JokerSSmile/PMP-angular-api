import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Film } from '../../models/film';

@Injectable()
export class FilmService {

  private getFilmsUrl = 'http://films/api/get-films';
  private getFilmUrl = 'http://films/api/get-film/';

  constructor(
    private http: HttpClient
  ) { }

  getFilms(): Promise<Film[]> {
    return this.http.get<Film[]>(this.getFilmsUrl).toPromise();
  }

  getFilm(filmId: number): Promise<Film> {
    return this.http.get<Film>(this.getFilmUrl + filmId).toPromise();
  }
}
