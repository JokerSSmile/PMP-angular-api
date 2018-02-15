import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { Film, Ratings } from '../../models/film';
import { User } from '../../models/user';
import { Invite, InviteRequest } from '../../models/invite';
import { BaseResponse } from '../../models/common';
import { FilmService } from '../../services/film-service/film.service';
import { UserService } from '../../services/user-service/user.service';
import { InviteService } from '../../services/invite-service/invite.service';

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
  ratings: Ratings;

  constructor(
    private filmService: FilmService,
    private userService: UserService,
    private inviteService: InviteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.filmId = +params['id'];
      this.ratings = new Ratings();
      this.getFilm(this.filmId);
    });
  }

  getFilm(filmId): void {
    this.filmService.getFilm(filmId).subscribe(result => {
      this.film = result;
      this.getUser(false);
      this.getRatings();
    });
  }

  getUser(forceUpdate: boolean): void {
    this.userService.getUser(forceUpdate).subscribe(user => {
      this.user = user;
      this.actors = this.film.actors.split(', ');
      this.isUserSubscribed = _.some(this.film.users, { id: this.user.id });
    });
  }

  subscribe(): void {
    this.filmService.subscribe(this.film.id, this.user.id).subscribe(result => {
      if (result.isError) {
        this.toastr.error('Не удалось подписаться!');
        return;
      }
      this.isUserSubscribed = true;
      this.getFilm(this.filmId);
      this.toastr.success('Вы подписались на фильм!');
    });
  }

  unsubscribe(): void {
    this.filmService.unsubscribe(this.film.id, this.user.id).subscribe(result => {
      if (result.isError) {
        this.toastr.error('Не удалось отписаться!');
        return;
      }
      this.isUserSubscribed = false;
      this.getFilm(this.filmId);
      this.toastr.success('Вы отписались от фильма!');
    });
  }

  goToUserProfile(profileId: number): void {
    this.router.navigate(['/profile/' + profileId]);
  }

  invite(profileId: number): void {
    let request: InviteRequest =  {
      filmId: this.filmId,
      from: this.user.id,
      to: profileId
    }
    this.inviteService.invite(request).subscribe(response => {
        if (response.isError) {
          this.toastr.error(response.message);
          return;
        }
        this.toastr.success('Вы пригласили пользователя!');
        this.getUser(true);
      });
  }

  removeInvite(profileId: number): void {
    let request: InviteRequest =  {
      filmId: this.filmId,
      from: this.user.id,
      to: profileId
    }
    this.inviteService.removeInvite(request).subscribe(response => {
        if (response.isError) {
          this.toastr.error(response.message);
          return;
        }
        this.toastr.success('Вы отменили приглашение!');
        this.getUser(true);
      });
  }

  isUserAlreadyInvited(userId: number): boolean {
    let isExists: boolean = false;
    _.forEach(this.user.invites, (invite: Invite) => {
      if (invite.invited_user.id == userId) {
        isExists = true;
      }
    });

    return isExists;
  }

  getRatings(): void {
    let data = this.filmService.getRatings(this.film.kinopoisk_id).then(data => {
      this.ratings.kp_rating = data.getElementsByTagName('rating')[0].childNodes[0].innerHTML;
      this.ratings.imdb_rating = data.getElementsByTagName('rating')[0].childNodes[1].innerHTML;
    });
  }
}
