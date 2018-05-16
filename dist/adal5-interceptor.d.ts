import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adal5Service } from './adal5.service';
export declare class Adal5Interceptor implements HttpInterceptor {
    adal5Service: Adal5Service;
    constructor(adal5Service: Adal5Service);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
