import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user-service/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUser().subscribe((user: User) => {
      this.user = user;
    })
  }
}
