import { Injectable, Injector } from '@angular/core';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { AuthService } from '../services/auth-service/auth.service';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import * as _ from 'lodash';

import { OAuthResponse } from '../models/authentication';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshingToken: boolean = false;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private exclude: string[] = ['http://films/oauth/v2/token', 'http://films/api/register', 'http://films/api/login', 'https://rating.kinopoisk.ru'];

  constructor(
    private injector: Injector,
    private router: Router
  ) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    let headers = {};
    if (token) {
      headers = { Authorization: 'Bearer ' + token }
    }
    return req.clone({ setHeaders: headers})
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    var isExclude = _.some(this.exclude, (url) => {
      return request.url.startsWith(url);
    });
    if (isExclude) {
        return next.handle(request);
    }

    return next.handle(this.addToken(request, this.injector.get(AuthService).getToken()))
      .catch(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 400:
              return this.handleBadRequestResponse(error);
            case 401:
              return this.handleUnauthorizedResponse(request, next);
            case 404:
              return this.router.navigate(['/404']);
            case 500:
              return this.router.navigate(['/500']);
          }
        } else {
          return Observable.throw(error);
        }
      });
  }

  private handleBadRequestResponse(error: any): Observable<any> {
    return Observable.of();
  }

  private handleUnauthorizedResponse(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);

      return this.injector.get(AuthService).refreshToken()
        .switchMap((newToken: OAuthResponse): any => {
          if (newToken && newToken.access_token) {
            this.tokenSubject.next(newToken.access_token);
            this.injector.get(AuthService).setTokens(newToken.access_token, newToken.refresh_token);

            return next.handle(this.addToken(request, newToken.access_token));
          }

          return this.router.navigate(['/login']);
        })
        .catch(error => {
          return this.router.navigate(['/login']);
        })
        .finally(() => {
          this.isRefreshingToken = false;
        });
    } else {
      return this.tokenSubject
        .filter(token => token != null)
        .take(1)
        .switchMap(token => {
          return next.handle(this.addToken(request, token));
        });
    }
  }
}