import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adal5Service } from './adal5.service';

@Injectable()
export class Adal5Interceptor implements HttpInterceptor {
    constructor(public adal5Service: Adal5Service) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.adal5Service.userInfo.token}`
            }
        });
        return next.handle(request);
    }
}
