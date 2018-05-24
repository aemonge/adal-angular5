# Warning: Deprecated!!!

Please use https://github.com/benbaran/adal-angular4 which has already been merged into angular 6.

This repository lives only as my personal documentation on how to do a naive migration.

# adal-angular6

![build status](https://travis-ci.org/grumar/adal-angular6.svg?branch=master)


___

Angular 6 Active Directory Authentication Library (ADAL) wrapper package. Can be used to authenticate Angular 6 applications to Azure Active Directory.

Based on https://github.com/grumar/adal-angular5
Which is based on https://github.com/benbaran/adal-angular4


## How to use it
> IMPORTANT!

Don't use `Http` and `HttpModule`, You definitely must use `HttpClient` and `HttpClientModule` instead of them.
The new interceptor is used only for request made by `HttpClient`.
When old `Http` used request will be untouched (no authorization header).

In `app.module.ts`

```typescript
import { HttpClient, HttpClientModule } from '@angular/common/http';
...
    imports: [..., HttpClientModule  ], // important! HttpClientModule replaces HttpModule
    providers: [
        Adal6Service,
        { provide: Adal6HTTPService, useFactory: Adal6HTTPService.factory, deps: [HttpClient, Adal6Service] } //  // important! HttpClient replaces Http
  ]
```

## Example

```typescript
import { Adal6HTTPService, Adal6Service } from 'adal-angular6';
...
export class HttpService {
    constructor(
        private adal6HttpService: Adal6HTTPService,
        private adal6Service: Adal6Service) { }

public get(url: string): Observable<any> {
        const options = this.prepareOptions();
        return this.adal6HttpService.get(url, options)
    }

private prepareOptions():any{
 let headers = new HttpHeaders();
        headers = headers
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.adal6Service.userInfo.token}`);
        return { headers };
}
```
