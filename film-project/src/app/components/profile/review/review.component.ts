import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user.service';
import { UserDefault } from '../../../models/user';
import { Review } from '../../../models/review';
import { Router } from '@angular/router';
import { ReviewService } from '../../../services/review-service/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public user: UserDefault;
  public reviews: Review[];

  constructor(
    private userService: UserService,
    private reviewService: ReviewService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(forceUpdate?: boolean): void {
    this.userService.getUser(forceUpdate).subscribe((user: UserDefault) => {
      this.user = user;
      this.reviewService.getReviews(this.user.id).subscribe(reviews => {
        this.reviews = reviews;
      });
    });
  }

  goToUserProfile(profileId: number): void {
    this.router.navigate(['/profile/' + profileId]);
  }
}
