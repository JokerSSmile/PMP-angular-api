import { Component, OnInit } from '@angular/core';
import { HistoryItem } from '../../../models/history';
import { UserService } from '../../../services/user-service/user.service';
import { User } from '../../../models/user';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Review } from '../../../models/review';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historyItems: HistoryItem[];
  user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser(false);
  }

  getUser(forceUpdate: boolean) {
    return this.userService.getUser(forceUpdate).subscribe(user => {
      this.user = user;
      this.historyItems = this.getUserHistory();
    });
  }

  goToUserProfile(profileId: number): void {
    this.router.navigate(['/profile/' + profileId]);
  }

  canAddReview(history: HistoryItem): boolean {
    let canAdd: boolean = true;
    _.forEach(history.reviews, (review: Review) => {
      if (review.sender.id === this.user.id) {
        canAdd = true;
      }
    });

    return canAdd;
  }

  getUserHistory(): HistoryItem[] {
    let historyItems = _.concat(this.user.self_history, this.user.partner_history);

    _.forEach(historyItems, history => {
      if (!history.partner) {
        history.partner = this.user;
      } else if (!history.user) {
        history.user = this.user;
      }

    });

    return _.sortBy(historyItems, history => {return history.date.getMilliseconds});
  }

  addReview(history: HistoryItem): void {

  }

  showInfo(history: HistoryItem): void {
    
  }
}
