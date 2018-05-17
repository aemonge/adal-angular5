"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/catch");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
/**
 *
 *
 * @export
 * @class Adal6HTTPService
 */
var Adal6HTTPService = /** @class */ (function () {
    /**
     * Creates an instance of Adal6HTTPService.
     * @param {HttpClient} http
     * @param {Adal6Service} service
     *
     * @memberOf Adal6HTTPService
     */
    function Adal6HTTPService(http, service) {
        this.http = http;
        this.service = service;
    }
    Adal6HTTPService_1 = Adal6HTTPService;
    /**
     *
     *
     * @static
     * @param {HttpClient} http
     * @param {Adal6Service} service
     *
     * @memberOf Adal6HTTPService
     */
    Adal6HTTPService.factory = function (http, service) {
        return new Adal6HTTPService_1(http, service);
    };
    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal6HTTPService
     */
    Adal6HTTPService.prototype.get = function (url, options) {
        return this.sendRequest('get', url, options);
    };
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
    Adal6HTTPService.prototype.post = function (url, body, options) {
        options.body = body;
        return this.sendRequest('post', url, options);
    };
    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal6HTTPService
     */
    Adal6HTTPService.prototype.delete = function (url, options) {
        return this.sendRequest('delete', url, options);
    };
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
    Adal6HTTPService.prototype.patch = function (url, body, options) {
        options.body = body;
        return this.sendRequest('patch', url, options);
    };
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
    Adal6HTTPService.prototype.put = function (url, body, options) {
        options.body = body;
        return this.sendRequest('put', url, options);
    };
    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal6HTTPService
     */
    Adal6HTTPService.prototype.head = function (url, options) {
        return this.sendRequest('head', url, options);
    };
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
    Adal6HTTPService.prototype.sendRequest = function (method, url, options) {
        var _this = this;
        var resource = this.service.GetResourceForEndpoint(url);
        var authenticatedCall;
        if (resource) {
            if (this.service.userInfo.authenticated) {
                authenticatedCall = this.service.acquireToken(resource)
                    .mergeMap(function (token) {
                    if (options.headers == null) {
                        options.headers = new http_1.HttpHeaders();
                    }
                    options.headers = options.headers.append('Authorization', 'Bearer ' + token);
                    return _this.http.request(method, url, options)
                        .catch(_this.handleError);
                });
            }
            else {
                authenticatedCall = rxjs_1.Observable.throw(new Error('User Not Authenticated.'));
            }
        }
        else {
            authenticatedCall = this.http.request(method, url, options).catch(this.handleError);
        }
        return authenticatedCall;
    };
    /**
     *
     *
     * @private
     * @param {*} error
     * @returns
     *
     * @memberOf Adal6HTTPService
     */
    Adal6HTTPService.prototype.handleError = function (error) {
        // In a real world app, we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.error(JSON.stringify(error)); // log to console instead
        return rxjs_1.Observable.throw(error);
    };
    Adal6HTTPService = Adal6HTTPService_1 = __decorate([
        core_1.Injectable()
    ], Adal6HTTPService);
    return Adal6HTTPService;
    var Adal6HTTPService_1;
}());
exports.Adal6HTTPService = Adal6HTTPService;
