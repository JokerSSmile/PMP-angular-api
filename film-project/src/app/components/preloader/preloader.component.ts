import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PreloaderService } from '../../services/preloader-service/preloader.service';
import { LoaderState } from '../../models/loader';

@Component({
    selector: 'app-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.css']
})
    export class PreloaderComponent implements OnInit {

    show: boolean = false;

    private subscription: Subscription;

    constructor(
        private preloaderService: PreloaderService
    ) { }

    ngOnInit() {
        this.subscription = this.preloaderService.loaderState.subscribe(state => {
            this.show = state.show;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}