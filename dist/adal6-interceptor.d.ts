import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adal6Service } from './adal6.service';
export declare class Adal6Interceptor implements HttpInterceptor {
    Adal6Service: Adal6Service;
    constructor(Adal6Service: Adal6Service);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
