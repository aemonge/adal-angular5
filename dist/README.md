# adal-angular6
![build status](https://travis-ci.org/grumar/adal-angular5.svg?branch=master)


___

Angular 5 Active Directory Authentication Library (ADAL) wrapper package. Can be used to authenticate Angular 5 applications to Azure Active Directory.

Based on https://github.com/benbaran/adal-angular4.


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
        Adal5Service,
        { provide: Adal5HTTPService, useFactory: Adal5HTTPService.factory, deps: [HttpClient, Adal5Service] } //  // important! HttpClient replaces Http
  ]
```

## Example

```typescript
import { Adal5HTTPService, Adal5Service } from 'adal-angular5';
...
export class HttpService {
    constructor(
        private adal5HttpService: Adal5HTTPService,
        private adal5Service: Adal5Service) { }

public get(url: string): Observable<any> {
        const options = this.prepareOptions();
        return this.adal5HttpService.get(url, options)
    }

private prepareOptions():any{
 let headers = new HttpHeaders();
        headers = headers
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.adal5Service.userInfo.token}`);
        return { headers };
}
```
