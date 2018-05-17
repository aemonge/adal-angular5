import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Adal6Service } from './adal6.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
/**
 *
 *
 * @export
 * @class Adal6HTTPService
 */
export declare class Adal6HTTPService {
    private http;
    private service;
    /**
     *
     *
     * @static
     * @param {HttpClient} http
     * @param {Adal6Service} service
     *
     * @memberOf Adal6HTTPService
     */
    static factory(http: HttpClient, service: Adal6Service): Adal6HTTPService;
    /**
     * Creates an instance of Adal6HTTPService.
     * @param {HttpClient} http
     * @param {Adal6Service} service
     *
     * @memberOf Adal6HTTPService
     */
    constructor(http: HttpClient, service: Adal6Service);
    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal6HTTPService
     */
    get(url: string, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any>;
    /**
     *
     *
     * @param {string} url
     * @param {*} body
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal6HTTPService
     */
    post(url: string, body: any, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any>;
    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal6HTTPService
     */
    delete(url: string, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any>;
    /**
     *
     *
     * @param {string} url
     * @param {*} body
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal6HTTPService
     */
    patch(url: string, body: any, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any>;
    /**
     *
     *
     * @param {string} url
     * @param {*} body
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal6HTTPService
     */
    put(url: string, body: any, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any>;
    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal6HTTPService
     */
    head(url: string, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any>;
    /**
     *
     *
     * @private
     * @param {string} method
     * @param {string} url
     * @param {RequestOptionsArgs} options
     * @returns {Observable<string>}
     *
     * @memberOf Adal6HTTPService
     */
    private sendRequest(method, url, options);
    /**
     *
     *
     * @private
     * @param {*} error
     * @returns
     *
     * @memberOf Adal6HTTPService
     */
    private handleError(error);
}
