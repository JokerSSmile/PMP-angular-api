import { Component, OnInit } from '@angular/core';

import { Invite } from '../../../models/invite';
import { UserService } from '../../../services/user-service/user.service';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {

  invites: Invite[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getInvites();
  }

  getInvites() {
    return this.userService.getUser().subscribe((user) => {
      this.invites = user.invites;
    });
  }
}
