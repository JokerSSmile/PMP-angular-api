import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserExtended, UserDefault } from '../../models/user';
import { UserService } from '../../services/user-service/user.service';
import { ProfileService } from '../../services/profile-service/profile.service';
import { Router } from '@angular/router';
import { HistoryItem } from '../../models/history';
import { Invite } from '../../models/invite';
import { InviteService } from '../../services/invite-service/invite.service';
import { HistoryService } from '../../services/history-service/history.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileId: number;
  currentProfileUrl: string;
  currentUser: UserDefault;
  user: UserExtended;
  historyItems: HistoryItem[];
  invites: Invite[];

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private inviteService: InviteService,
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentProfileUrl = this.router.url;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.profileId = +params['id'];

      this.userService.getUser().subscribe((user: UserDefault) => {
        this.currentUser = user;
        this.getProfile();
        this.getHistory();
        this.getInvites();
      });
    });
  }
  getProfile(): void {
    this.profileService.getUserProfile(this.profileId).subscribe((user: UserExtended) => {
      this.user = user;
    });
  }

  getAll(): void {
    this.getHistory();
    this.getInvites();
  }

  getHistory(): void {
    this.historyService.getUserHistory(this.currentUser.id).subscribe(history => {
      _.forEach(history, historyItem => {
        if (!historyItem.partner) {
          historyItem.partner = this.currentUser;
        } else if (!historyItem.user) {
          historyItem.user = this.currentUser;
        }

        _.forEach(historyItem.reviews, review => {
          if (!review.sender) {
            review.sender = this.currentUser;
          } else if (!review.user) {
            review.user = this.currentUser;
          }
        });
      });

      this.historyItems = _.sortBy(history, historyItem => {return historyItem.date.getMilliseconds});
    });
  }

  getInvites(): void {
    this.inviteService.getUserInvites(this.currentUser.id).subscribe(result => {
      this.invites = result;
    });
  }
}
