import { Component, OnInit } from '@angular/core';

import { UserDefault } from '../../models/user';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  user: UserDefault;
  userProfileLink: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(true).subscribe(user => {
      if (user) {
        this.user = user;
        this.userProfileLink = '/profile/' + user.id;
      } else {
        this.user = null;
      }
    });
  }

  goToUserProfile(): void {
    this.router.navigate([this.userProfileLink]);
  }

  goToAddFilm(): void {
    this.router.navigate(['/admin']);
  }

  onLogoutClick(): void {
    this.userService.logout();
  }
}
