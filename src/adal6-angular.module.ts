import { Adal6Interceptor } from './adal6-interceptor';
import { Adal6User } from './adal6-user';
import { Adal6Service } from './adal6.service';
import { Adal6HTTPService } from './adal6-http.service';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    imports: [
    ],
    exports: [
        Adal6User, Adal6Service, Adal6HTTPService, Adal6Interceptor
    ],
    providers: [,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Adal6Interceptor,
            multi: true
        },
    ],
})
export class Adal6AgnularModule { }
