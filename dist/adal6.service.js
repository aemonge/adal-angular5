"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var adalLib = require("adal-angular");
var core_1 = require("@angular/core");
// import User = adal.User;
// adal = new AdalModule(conf);
// var AdalModule = require('../../../lib/adal.js');
/**
 *
 *
 * @export
 * @class Adal6Service
 */
var Adal6Service = /** @class */ (function () {
    /**
     * Creates an instance of Adal6Service.
     *
     * @memberOf Adal6Service
     */
    function Adal6Service() {
        /**
         *
         *
         * @private
         * @type {Adal6User}
         * @memberOf Adal6Service
         */
        this.Adal6User = {
            authenticated: false,
            username: '',
            error: '',
            token: '',
            profile: {}
        };
    }
    /**
     *
     *
     * @param {any} configOptions
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.init = function (configOptions) {
        if (!configOptions) {
            throw new Error('You must set config, when calling init.');
        }
        // redirect and logout_redirect are set to current location by default
        var existingHash = window.location.hash;
        var pathDefault = window.location.href;
        if (existingHash) {
            pathDefault = pathDefault.replace(existingHash, '');
        }
        configOptions.redirectUri = configOptions.redirectUri || pathDefault;
        configOptions.postLogoutRedirectUri = configOptions.postLogoutRedirectUri || pathDefault;
        // create instance with given config
        this.adalContext = adalLib.inject(configOptions);
        window.AuthenticationContext = this.adalContext.constructor;
        // loginresource is used to set authenticated status
        this.updateDataFromCache(this.adalContext.config.loginResource);
    };
    Object.defineProperty(Adal6Service.prototype, "config", {
        /**
         *
         *
         * @readonly
         * @type {any}
         * @memberOf Adal6Service
         */
        get: function () {
            return this.adalContext.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adal6Service.prototype, "userInfo", {
        /**
         *
         *
         * @readonly
         * @type {Adal6User}
         * @memberOf Adal6Service
         */
        get: function () {
            return this.Adal6User;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     *
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.login = function () {
        this.adalContext.login();
    };
    /**
     *
     *
     * @returns {boolean}
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.loginInProgress = function () {
        return this.adalContext.loginInProgress();
    };
    /**
     *
     *
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.logOut = function () {
        this.adalContext.logOut();
    };
    /**
     *
     *
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.handleWindowCallback = function () {
        var hash = window.location.hash;
        if (this.adalContext.isCallback(hash)) {
            var requestInfo = this.adalContext.getRequestInfo(hash);
            this.adalContext.saveTokenFromHash(requestInfo);
            if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.LOGIN) {
                this.updateDataFromCache(this.adalContext.config.loginResource);
            }
            else if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.RENEW_TOKEN) {
                this.adalContext.callback = window.parent.callBackMappedToRenewStates[requestInfo.stateResponse];
            }
            if (requestInfo.stateMatch) {
                if (typeof this.adalContext.callback === 'function') {
                    if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.RENEW_TOKEN) {
                        // Idtoken or Accestoken can be renewed
                        if (requestInfo.parameters['access_token']) {
                            this.adalContext.callback(this.adalContext._getItem(this.adalContext.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['access_token']);
                        }
                        else if (requestInfo.parameters['error']) {
                            this.adalContext.callback(this.adalContext._getItem(this.adalContext.CONSTANTS.STORAGE.ERROR_DESCRIPTION), null);
                            this.adalContext._renewFailed = true;
                        }
                    }
                }
            }
        }
        // Remove hash from url
        if (window.location.hash) {
            window.location.href = window.location.href.replace(window.location.hash, '');
        }
    };
    /**
     *
     *
     * @param {string} resource
     * @returns {string}
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.getCachedToken = function (resource) {
        return this.adalContext.getCachedToken(resource);
    };
    /**
     *
     *
     * @param {string} resource
     * @returns
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.acquireToken = function (resource) {
        var _this = this; // save outer this for inner function
        var errorMessage;
        return rxjs_1.bindCallback(acquireTokenInternal, function (token) {
            if (!token && errorMessage) {
                throw (errorMessage);
            }
            return token;
        })();
        function acquireTokenInternal(cb) {
            var s = null;
            _this.adalContext.acquireToken(resource, function (error, tokenOut) {
                if (error) {
                    _this.adalContext.error('Error when acquiring token for resource: ' + resource, error);
                    errorMessage = error;
                    cb(null);
                }
                else {
                    cb(tokenOut);
                    s = tokenOut;
                }
            });
            return s;
        }
    };
    /**
     *
     *
     * @returns {Observable<Adal6User>}
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.getUser = function () {
        var _this = this;
        return rxjs_1.bindCallback(function (cb) {
            _this.adalContext.getUser(function (error, user) {
                // this.adalContext.getUser((error: string, user: Adal6User): Adal6User => {
                if (error) {
                    _this.adalContext.error('Error when getting user', error);
                    // return cb(null);
                    cb(null);
                }
                else {
                    // return cb(user);
                    cb(user);
                }
            });
        })();
    };
    /**
     *
     *
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.clearCache = function () {
        this.adalContext.clearCache();
    };
    /**
     *
     *
     * @param {string} resource
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.clearCacheForResource = function (resource) {
        this.adalContext.clearCacheForResource(resource);
    };
    /**
     *
     *
     * @param {string} message
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.info = function (message) {
        this.adalContext.info(message);
    };
    /**
     *
     *
     * @param {string} message
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.verbose = function (message) {
        this.adalContext.verbose(message);
    };
    /**
     *
     *
     * @param {string} url
     * @returns {string}
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.GetResourceForEndpoint = function (url) {
        return this.adalContext.getResourceForEndpoint(url);
    };
    /**
     *
     *
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.refreshDataFromCache = function () {
        this.updateDataFromCache(this.adalContext.config.loginResource);
    };
    /**
     *
     *
     * @private
     * @param {string} resource
     *
     * @memberOf Adal6Service
     */
    Adal6Service.prototype.updateDataFromCache = function (resource) {
        var token = this.adalContext.getCachedToken(resource);
        this.Adal6User.authenticated = token !== null && token.length > 0;
        var user = this.adalContext.getCachedUser() || { userName: '', profile: undefined };
        if (user) {
            this.Adal6User.username = user.userName;
            this.Adal6User.profile = user.profile;
            this.Adal6User.token = token;
            this.Adal6User.error = this.adalContext.getLoginError();
        }
        else {
            this.Adal6User.username = '';
            this.Adal6User.profile = {};
            this.Adal6User.token = '';
            this.Adal6User.error = '';
        }
    };
    ;
    Adal6Service = __decorate([
        core_1.Injectable()
    ], Adal6Service);
    return Adal6Service;
}());
exports.Adal6Service = Adal6Service;
