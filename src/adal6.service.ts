import { Observable, bindCallback } from 'rxjs';
import * as adalLib from 'adal-angular';
import { Adal6User } from './adal6-user';
import { Injectable } from '@angular/core';

// import User = adal.User;

// adal = new AdalModule(conf);
// var AdalModule = require('../../../lib/adal.js');

/**
 *
 *
 * @export
 * @class Adal6Service
 */
@Injectable()
export class Adal6Service {

  /**
   *
   *
   * @private
   * @type {adal.AuthenticationContext}
   * @memberOf Adal6Service
   */
  private adalContext: adal.AuthenticationContext;

  /**
   *
   *
   * @private
   * @type {Adal6User}
   * @memberOf Adal6Service
   */
  private Adal6User: Adal6User = {
    authenticated: false,
    username: '',
    error: '',
    token: '',
    profile: {}
  };

  /**
   * Creates an instance of Adal6Service.
   *
   * @memberOf Adal6Service
   */
  constructor() { }

  /**
   *
   *
   * @param {any} configOptions
   *
   * @memberOf Adal6Service
   */
  public init(configOptions: any) {
    if (!configOptions) {
      throw new Error('You must set config, when calling init.');
    }

    // redirect and logout_redirect are set to current location by default
    const existingHash = window.location.hash;

    let pathDefault = window.location.href;
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
  }

  /**
   *
   *
   * @readonly
   * @type {any}
   * @memberOf Adal6Service
   */
  public get config(): any {
    return this.adalContext.config;
  }

  /**
   *
   *
   * @readonly
   * @type {Adal6User}
   * @memberOf Adal6Service
   */
  public get userInfo(): Adal6User {
    return this.Adal6User;
  }

  /**
   *
   *
   *
   * @memberOf Adal6Service
   */
  public login(): void {
    this.adalContext.login();
  }

  /**
   *
   *
   * @returns {boolean}
   *
   * @memberOf Adal6Service
   */
  public loginInProgress(): boolean {
    return this.adalContext.loginInProgress();
  }

  /**
   *
   *
   *
   * @memberOf Adal6Service
   */
  public logOut(): void {
    this.adalContext.logOut();
  }

  /**
   *
   *
   *
   * @memberOf Adal6Service
   */
  public handleWindowCallback(): void {
    const hash = window.location.hash;
    if (this.adalContext.isCallback(hash)) {
      const requestInfo = this.adalContext.getRequestInfo(hash);
      this.adalContext.saveTokenFromHash(requestInfo);
      if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.LOGIN) {
        this.updateDataFromCache(this.adalContext.config.loginResource);

      } else if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.RENEW_TOKEN) {
        this.adalContext.callback = window.parent.callBackMappedToRenewStates[requestInfo.stateResponse];
      }

      if (requestInfo.stateMatch) {
        if (typeof this.adalContext.callback === 'function') {
          if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.RENEW_TOKEN) {
            // Idtoken or Accestoken can be renewed
            if (requestInfo.parameters['access_token']) {
              this.adalContext.callback(this.adalContext._getItem(this.adalContext.CONSTANTS.STORAGE.ERROR_DESCRIPTION)
                , requestInfo.parameters['access_token']);
            } else if (requestInfo.parameters['error']) {
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
  }

  /**
   *
   *
   * @param {string} resource
   * @returns {string}
   *
   * @memberOf Adal6Service
   */
  public getCachedToken(resource: string): string {
    return this.adalContext.getCachedToken(resource);
  }

  /**
   *
   *
   * @param {string} resource
   * @returns
   *
   * @memberOf Adal6Service
   */
  public acquireToken(resource: string) {
    const _this = this;   // save outer this for inner function

    let errorMessage: string;
    return bindCallback(acquireTokenInternal, function (token: string) {
      if (!token && errorMessage) {
        throw (errorMessage);
      }
      return token;
    })();

    function acquireTokenInternal(cb: any) {
      let s: string = null;

      _this.adalContext.acquireToken(resource, (error: string, tokenOut: string) => {
        if (error) {
          _this.adalContext.error('Error when acquiring token for resource: ' + resource, error);
          errorMessage = error;
          cb(<string>null);
        } else {
          cb(tokenOut);
          s = tokenOut;
        }
      });
      return s;
    }
  }

  /**
   *
   *
   * @returns {Observable<Adal6User>}
   *
   * @memberOf Adal6Service
   */
  public getUser(): Observable<any> {
    return bindCallback((cb: (u: Adal6User) => Adal6User) => {
      this.adalContext.getUser((error: string, user: any) => {
      // this.adalContext.getUser((error: string, user: Adal6User): Adal6User => {
        if (error) {
          this.adalContext.error('Error when getting user', error);
          // return cb(null);
          cb(null);
        } else {
          // return cb(user);
          cb(user);
        }
      });
    })();
  }

  /**
   *
   *
   *
   * @memberOf Adal6Service
   */
  public clearCache(): void {
    this.adalContext.clearCache();
  }

  /**
   *
   *
   * @param {string} resource
   *
   * @memberOf Adal6Service
   */
  public clearCacheForResource(resource: string): void {
    this.adalContext.clearCacheForResource(resource);
  }

  /**
   *
   *
   * @param {string} message
   *
   * @memberOf Adal6Service
   */
  public info(message: string): void {
    this.adalContext.info(message);
  }

  /**
   *
   *
   * @param {string} message
   *
   * @memberOf Adal6Service
   */
  public verbose(message: string): void {
    this.adalContext.verbose(message);
  }

  /**
   *
   *
   * @param {string} url
   * @returns {string}
   *
   * @memberOf Adal6Service
   */
  public GetResourceForEndpoint(url: string): string {
    return this.adalContext.getResourceForEndpoint(url);
  }

  /**
   *
   *
   *
   * @memberOf Adal6Service
   */
  public refreshDataFromCache() {
    this.updateDataFromCache(this.adalContext.config.loginResource);
  }

  /**
   *
   *
   * @private
   * @param {string} resource
   *
   * @memberOf Adal6Service
   */
  private updateDataFromCache(resource: string): void {
    const token = this.adalContext.getCachedToken(resource);
    this.Adal6User.authenticated = token !== null && token.length > 0;
    const user = this.adalContext.getCachedUser() || { userName: '', profile: undefined };
    if (user) {
      this.Adal6User.username = user.userName;
      this.Adal6User.profile = user.profile;
      this.Adal6User.token = token;
      this.Adal6User.error = this.adalContext.getLoginError();
    } else {
      this.Adal6User.username = '';
      this.Adal6User.profile = {};
      this.Adal6User.token = '';
      this.Adal6User.error = '';
    }
  };
}
