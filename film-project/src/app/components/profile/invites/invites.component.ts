import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { Invite, InviteStatusUpdateRequest, InviteRequest, InviteStatus } from '../../../models/invite';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user-service/user.service';
import { InviteService } from '../../../services/invite-service/invite.service';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {

  user: User;
  invites: Invite[];

  constructor(
    private userService: UserService,
    private inviteService: InviteService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getUser(false);
  }

  getUser(forceUpdate: boolean) {
    return this.userService.getUser(forceUpdate).subscribe(user => {
      this.user = user;
      this.invites = this.getUserInvites();
    });
  }

  removeInvite(invite: Invite): void {
    let request: InviteRequest =  {
      filmId: invite.film.id,
      from: this.user.id,
      to: invite.invited_user.id
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

  changeInviteStatus(inviteId: number, status: InviteStatus): void {
    let request: InviteStatusUpdateRequest = {
      inviteId: inviteId,
      status: status
    }
    this.inviteService.updateInviteStatus(request).subscribe(response => {
      if (response.isError) {
        this.toastr.error(response.message);
        return;
      }
      this.toastr.success('Статус изменен!');
      this.getUser(true);
    });
  }

  getInviteClass(status: InviteStatus): string {
    let style: string = 'list-group-item list-group-item-';
    switch(status) {
      case InviteStatus.Waiting:
        style += 'primary';
        break;
      case InviteStatus.Accepted:
        style += 'success';
        break;
      case InviteStatus.Cancelled:
        style += 'danger';
        break;
    }

    return style;
  }

  getStatusText(status: InviteStatus): string {
    switch(status) {
      case InviteStatus.Waiting:
        return 'Ожидание';
      case InviteStatus.Accepted:
        return 'Принято';
      case InviteStatus.Cancelled:
        return 'Отменено';
    }
  }

  goToUserProfile(profileId: number): void {
    this.router.navigate(['/profile/' + profileId]);
  }

  getUserInvites(): Invite[] {
    let invites = _.concat(this.user.invites, this.user.invited_me);

    _.forEach(invites, invite => {
      if (!invite.invited_user) {
        invite.invited_user = this.user;
      } else if (!invite.user) {
        invite.user = this.user;
      }
    });

    return _.sortBy(invites, invite => {return invite.date.getMilliseconds});
  }
}
