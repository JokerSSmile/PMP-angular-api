import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HistoryItem } from '../../models/history';

@Injectable()
export class HistoryService {

  private getHistoryUrl = 'http://films/app_dev.php/api/get-history';

  constructor(
    private http: HttpClient
  ) { }

  getUserHistory(userId: number): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(`${this.getHistoryUrl}/${userId}`);
  }
}
