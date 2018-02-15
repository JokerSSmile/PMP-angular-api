import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Film } from '../../models/film';
import { FilmService } from '../../services/film-service/film.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  films: Film[];

  constructor(
    private filmService: FilmService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getFilms();
  }

  getFilms(): void {
    this.filmService.getFilms().subscribe(result => {
      this.films = result;
    });
  }

  onFilmSelect(film: Film): void {
    this.router.navigate(['/film/' + film.id]);
  }

}
