import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../../services/user-service/user.service';
import { ProfileService } from '../../services/profile-service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileId: number;
  currentProfileUrl: string;
  currentUser: User;
  user: User;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentProfileUrl = this.router.url;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.profileId = +params['id'];

      this.getUser();
      this.getProfile();
    });
  }

  getUser(): void {
    this.userService.getUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  getProfile(): void {
    this.profileService.getUserProfile(this.profileId).subscribe((user) => {
      this.user = user;
    });
  }
}
