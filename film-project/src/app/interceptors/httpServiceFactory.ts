import { XHRBackend, BaseRequestOptions } from '@angular/http';
import { HttpService } from '../services/http-service/http.service';
import { PreloaderService } from '../services/preloader-service/preloader.service';

function httpServiceFactory(backend: XHRBackend, options: BaseRequestOptions, preloaderService: PreloaderService ) {
    return new HttpService(backend, options, preloaderService);
}

export { httpServiceFactory };