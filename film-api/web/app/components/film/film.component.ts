import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { FilmExtended, Ratings } from '../../models/film';
import { UserDefault } from '../../models/user';
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
  film: FilmExtended;
  actors: string[];
  user: UserDefault;
  isUserSubscribed: boolean;
  ratings: Ratings;
  subscribers: UserDefault[];
  userInvites: Invite[];

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
      this.init();
    });
  }

  init(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.filmService.getFilm(this.filmId).subscribe(result => {
        this.film = result;
        this.actors = this.film.actors.split(', ');
        this.getRatings();

        if (this.user) {
          this.getFilmUsers();
          this.getUserIvites();
        }
      });
    });
  }

  getFilmUsers(): void {
    this.filmService.getFilmUsers(this.filmId).subscribe(result => {
      this.subscribers = result;
      this.isUserSubscribed = _.some(this.subscribers, { id: this.user.id });
    });
  }

  getUserIvites(): void {
    this.inviteService.getUserInvites(this.user.id).subscribe(invites => {
      this.userInvites = invites;
    });
  }

  subscribe(): void {
    this.filmService.subscribe(this.film.id, this.user.id).subscribe(result => {
      if (result.isError) {
        this.toastr.error('Не удалось подписаться');
        return;
      }
      this.isUserSubscribed = true;
      this.getFilmUsers();
      this.toastr.success('Вы подписались на фильм');
    });
  }

  unsubscribe(): void {
    this.filmService.unsubscribe(this.film.id, this.user.id).subscribe(result => {
      if (result.isError) {
        this.toastr.error('Не удалось отписаться');
        return;
      }
      this.isUserSubscribed = false;
      this.getFilmUsers();
      this.toastr.success('Вы отписались от фильма');
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
        this.toastr.success('Вы пригласили пользователя');
        this.getFilmUsers();
        this.getUserIvites();
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
        this.toastr.success('Вы отменили приглашение');
        this.getFilmUsers();
        this.getUserIvites();
      });
  }

  isUserAlreadyInvited(userId: number): boolean {
    let isExists: boolean = false;
    _.forEach(this.userInvites, (invite: Invite) => {
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
