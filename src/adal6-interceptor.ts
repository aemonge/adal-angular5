import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adal6Service } from './adal6.service';

@Injectable()
export class Adal6Interceptor implements HttpInterceptor {
    constructor(public Adal6Service: Adal6Service) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.Adal6Service.userInfo.token}`
            }
        });
        return next.handle(request);
    }
}
