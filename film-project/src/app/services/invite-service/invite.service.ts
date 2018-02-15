import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { InviteRequest, InviteStatusUpdateRequest } from '../../models/invite';
import { BaseResponse } from '../../models/common';

@Injectable()
export class InviteService {

  private inviteUrl = 'http://films/app_dev.php/api/invite';
  private removeInviteUrl = 'http://films/app_dev.php/api/remove-invite';
  private updateInviteStatusUrl = 'http://films/app_dev.php/api/update-invite-status';

  constructor(
    private http: HttpClient
  ) { }

  invite(request: InviteRequest) {
    return this.http
      .post(this.inviteUrl, request)
      .map((response: BaseResponse) => {
        return response;
      });
  }

  removeInvite(request: InviteRequest) {
    return this.http
      .post(this.removeInviteUrl, request)
      .map((response: BaseResponse) => {
        return response;
      });
  }

  updateInviteStatus(request: InviteStatusUpdateRequest) {
    return this.http
      .post(this.updateInviteStatusUrl, request)
      .map((response: BaseResponse) => {
        return response;
      });
  }
}
