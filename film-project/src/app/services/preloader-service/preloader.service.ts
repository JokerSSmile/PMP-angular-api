import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LoaderState } from '../../models/loader';

@Injectable()
export class PreloaderService {

    private loaderSubject = new Subject<LoaderState>();

    loaderState = this.loaderSubject.asObservable();

    constructor() { }

    show() {
        this.loaderSubject.next(<LoaderState>{show: true});
    }

    hide() {
        this.loaderSubject.next(<LoaderState>{show: false});
    }
}