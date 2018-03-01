import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user.service';
import { User } from '../../../models/user';
import { Review } from '../../../models/review';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public user: User;
  public reviews: Review[];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(forceUpdate?: boolean): void {
    this.userService.getUser(forceUpdate).subscribe((user: User) => {
      this.user = user;
      this.reviews = user.reviews;
    });
  }

  goToUserProfile(profileId: number): void {
    this.router.navigate(['/profile/' + profileId]);
  }
}
