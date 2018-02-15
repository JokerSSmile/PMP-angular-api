import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Invite, InviteStatus, InviteStatusUpdateRequest } from '../../../models/invite';
import { UserService } from '../../../services/user-service/user.service';
import { InviteService } from '../../../services/invite-service/invite.service';

@Component({
  selector: 'app-want',
  templateUrl: './want.component.html',
  styleUrls: ['./want.component.css']
})
export class WantComponent implements OnInit {

  invitedMe: Invite[];

  constructor(
    private router: Router,
    private userService: UserService,
    private inviteService: InviteService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getUserInvitedMe();
  }

  getUserInvitedMe() {
    return this.userService.getUser().subscribe((user) => {
      this.invitedMe = user.invited_me;
    });
  }

  rejectInvite(inviteId: number): void {
    let request: InviteStatusUpdateRequest = {
      inviteId: inviteId,
      status: InviteStatus.Cancelled
    };

    this.inviteService.updateInviteStatus(request).subscribe(response => {
      if (response.isError) {
        this.toastr.error(response.message);
        return;
      }
      this.toastr.success('Вы отклонили приглашение!');
    });
  }

  getBageClasses(status: InviteStatus): string {
    let style: string = 'badge badge-';
    switch(status) {
      case InviteStatus.Waiting:
        style += 'primary';
        break;
      case InviteStatus.Accepted:
        style += 'success';
        break;
      case InviteStatus.Cancelled:
        style += 'warning';
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
}
