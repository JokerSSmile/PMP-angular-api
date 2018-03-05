import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { InviteRequest, InviteStatusUpdateRequest, Invite } from '../../models/invite';
import { BaseResponse } from '../../models/common';

@Injectable()
export class InviteService {

  private inviteUrl = 'http://films/app_dev.php/api/invite';
  private removeInviteUrl = 'http://films/app_dev.php/api/remove-invite';
  private updateInviteStatusUrl = 'http://films/app_dev.php/api/update-invite-status';
  private getInvitesUrl = 'http://films/app_dev.php/api/get-invites';

  constructor(
    private http: HttpClient
  ) { }

  invite(request: InviteRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(this.inviteUrl, request);
  }

  removeInvite(request: InviteRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(this.removeInviteUrl, request);
  }

  updateInviteStatus(request: InviteStatusUpdateRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(this.updateInviteStatusUrl, request);
  }

  getUserInvites(userId: number): Observable<Invite[]> {
    return this.http.get<Invite[]>(`${this.getInvitesUrl}/${userId}`);
  }
}
