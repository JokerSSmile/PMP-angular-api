import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../../models/common';
import { AddReviewRequest, Review } from '../../models/review';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReviewService {

  private addReviewUrl = 'http://films/app_dev.php/api/add-review';
  private getReviewsUrl = 'http://films/app_dev.php/api/get-reviews';

  constructor(
    private http: HttpClient
  ) { }

  addReview(request: AddReviewRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(this.addReviewUrl, request);
  }

  getReviews(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.getReviewsUrl}/${userId}`);
  }
}
