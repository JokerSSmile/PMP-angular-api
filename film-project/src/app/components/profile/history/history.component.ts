import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HistoryItem } from '../../../models/history';
import { UserService } from '../../../services/user-service/user.service';
import { UserDefault } from '../../../models/user';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Review, AddReviewRequest } from '../../../models/review';
import { ReviewService } from '../../../services/review-service/review.service';
import { ToastrService } from 'ngx-toastr';
import { HistoryService } from '../../../services/history-service/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @Input() historyItems: HistoryItem[];
  @Output() onHistoryUpdated = new EventEmitter<void>();
  user: UserDefault;
  selectedHistory: HistoryItem;
  reviewRating: number;
  reviewComment: string;

  constructor(
    private userService: UserService,
    private reviewService: ReviewService,
    private historyService: HistoryService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getUser(false);
  }

  getUser(forceUpdate: boolean) {
    this.userService.getUser(forceUpdate).subscribe(user => {
      this.user = user;
    });
  }

  goToUserProfile(profileId: number): void {
    this.router.navigate(['/profile/' + profileId]);
  }

  canAddReview(history: HistoryItem): boolean {
    let canAdd: boolean = true;
    _.forEach(history.reviews, (review: Review) => {
      if (review.sender.id === this.user.id) {
        canAdd = false;
      }
    });

    return canAdd;
  }

  getHistoryClass(history: HistoryItem): string {
    let style: string = 'list-group-item list-group-item-';
    if (this.canAddReview(history)) {
      style += 'primary';
    } else {
      style += 'success';
    }

    return style;
  }

  onHistorySelect(history: HistoryItem): void {
    this.selectedHistory = history;
  }

  addReview(history: HistoryItem): void {
    this.onHistorySelect(history);
  }

  onRatingChange($event: any): void {
    this.reviewRating = $event.rating;
  }

  submitReview(): void {
    let reviewRequest: AddReviewRequest = {
      comment: this.reviewComment,
      historyId: this.selectedHistory.id,
      rating: this.reviewRating,
      senderId: this.selectedHistory.partner && this.selectedHistory.partner.id === this.user.id ? this.selectedHistory.user.id : this.selectedHistory.partner.id,
      userId: this.user.id
    }

    this.reviewService.addReview(reviewRequest).subscribe(response => {
      if (response.isError) {
        this.toastr.error(response.message)
        return;
      }

      this.toastr.success('Отзыв отправлен');
      this.onHistoryUpdated.emit();
    });
  }
}
