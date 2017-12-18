import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Film } from '../../models/film';
import { FilmService } from '../../services/film-service/film.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  filmId: number;
  film: Film;
  actors: string[];

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.filmId = +params['id'];

      this.getFilm(this.filmId);
    });
  }

  getFilm(filmId): void {
    this.filmService.getFilm(filmId)
      .then((result) => {
        this.film = result;
        this.actors = this.film.actors.split(', ');
      });
  }

  goToUserProfile(profileId): void {
    console.log("goToUserProfile");
  }
}
