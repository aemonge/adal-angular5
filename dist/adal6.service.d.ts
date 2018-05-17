import { Observable } from 'rxjs';
import { Adal6User } from './adal6-user';
/**
 *
 *
 * @export
 * @class Adal6Service
 */
export declare class Adal6Service {
    /**
     *
     *
     * @private
     * @type {adal.AuthenticationContext}
     * @memberOf Adal6Service
     */
    private adalContext;
    /**
     *
     *
     * @private
     * @type {Adal6User}
     * @memberOf Adal6Service
     */
    private Adal6User;
    /**
     * Creates an instance of Adal6Service.
     *
     * @memberOf Adal6Service
     */
    constructor();
    /**
     *
     *
     * @param {any} configOptions
     *
     * @memberOf Adal6Service
     */
    init(configOptions: any): void;
    /**
     *
     *
     * @readonly
     * @type {any}
     * @memberOf Adal6Service
     */
    readonly config: any;
    /**
     *
     *
     * @readonly
     * @type {Adal6User}
     * @memberOf Adal6Service
     */
    readonly userInfo: Adal6User;
    /**
     *
     *
     *
     * @memberOf Adal6Service
     */
    login(): void;
    /**
     *
     *
     * @returns {boolean}
     *
     * @memberOf Adal6Service
     */
    loginInProgress(): boolean;
    /**
     *
     *
     *
     * @memberOf Adal6Service
     */
    logOut(): void;
    /**
     *
     *
     *
     * @memberOf Adal6Service
     */
    handleWindowCallback(): void;
    /**
     *
     *
     * @param {string} resource
     * @returns {string}
     *
     * @memberOf Adal6Service
     */
    getCachedToken(resource: string): string;
    /**
     *
     *
     * @param {string} resource
     * @returns
     *
     * @memberOf Adal6Service
     */
    acquireToken(resource: string): Observable<any>;
    /**
     *
     *
     * @returns {Observable<Adal6User>}
     *
     * @memberOf Adal6Service
     */
    getUser(): Observable<any>;
    /**
     *
     *
     *
     * @memberOf Adal6Service
     */
    clearCache(): void;
    /**
     *
     *
     * @param {string} resource
     *
     * @memberOf Adal6Service
     */
    clearCacheForResource(resource: string): void;
    /**
     *
     *
     * @param {string} message
     *
     * @memberOf Adal6Service
     */
    info(message: string): void;
    /**
     *
     *
     * @param {string} message
     *
     * @memberOf Adal6Service
     */
    verbose(message: string): void;
    /**
     *
     *
     * @param {string} url
     * @returns {string}
     *
     * @memberOf Adal6Service
     */
    GetResourceForEndpoint(url: string): string;
    /**
     *
     *
     *
     * @memberOf Adal6Service
     */
    refreshDataFromCache(): void;
    /**
     *
     *
     * @private
     * @param {string} resource
     *
     * @memberOf Adal6Service
     */
    private updateDataFromCache(resource);
}
