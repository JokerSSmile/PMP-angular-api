import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { Film } from '../../models/film';
import { User } from '../../models/user';
import { BaseResponse } from '../../models/common';
import { FilmService } from '../../services/film-service/film.service';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  filmId: number;
  film: Film;
  actors: string[];
  user: User;
  isUserSubscribed: boolean;
  errorMessage: string;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.filmId = +params['id'];

      this.getFilm(this.filmId);
    });
  }

  getFilm(filmId): void {
    this.filmService.getFilm(filmId)
      .then((result) => {
        this.userService.getUser().toPromise()
        .then(user => {
          this.user = user;
          this.film = result;
          this.actors = this.film.actors.split(', ');
          this.isUserSubscribed = _.some(this.film.users, { id: this.user.id });
        });
      });
  }

  subscribe(): void {
    this.filmService.subscribe(this.film.id, this.user.id)
      .then((result: BaseResponse) => {
        if (result.isError) {
          this.errorMessage = result.message;
          return;
        }
        this.isUserSubscribed = true;
        this.getFilm(this.filmId);
      });
  }

  unsubscribe(): void {
    this.filmService.unsubscribe(this.film.id, this.user.id)
      .then((result: BaseResponse) => {
        if (result.isError) {
          this.errorMessage = result.message;
          return;
        }
        this.isUserSubscribed = false;
        this.getFilm(this.filmId);
      });
  }

  goToUserProfile(profileId: number): void {
    this.router.navigate(['/profile/' + profileId]);
  }

  invite(profileId: number): void {

  }
}
