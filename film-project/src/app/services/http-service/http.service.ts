import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {
    Http,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Request,
    Headers,
    XHRBackend,
    BaseRequestOptions
} from '@angular/http';
import { PreloaderService } from '../preloader-service/preloader.service';

@Injectable()
export class HttpService extends Http {

    private _preloaderService: PreloaderService

    constructor(
        backend: XHRBackend,
        defaultOptions: BaseRequestOptions,
        preloaderService: PreloaderService
    ) {
        super(backend, defaultOptions);
        this._preloaderService = preloaderService;
    }

    get<T>(url: string, options?: RequestOptionsArgs): Observable<T> {

        this.showLoader();

        return super.get(url, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                console.log(res)
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });

    }

    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = {};
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }

        return options;
    }

    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    private onSuccess(res: Response): void {
        console.log('Request successful');
    }

    private onError(res: Response): void {
        console.log('Error, status code: ' + res.status);
    }

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        this._preloaderService.show();
    }

    private hideLoader(): void {
        this._preloaderService.hide();
    }
}