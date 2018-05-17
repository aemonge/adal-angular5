import { Observable } from 'rxjs';
import { Adal5User } from './adal5-user';
/**
 *
 *
 * @export
 * @class Adal5Service
 */
export declare class Adal5Service {
    /**
     *
     *
     * @private
     * @type {adal.AuthenticationContext}
     * @memberOf Adal5Service
     */
    private adalContext;
    /**
     *
     *
     * @private
     * @type {Adal5User}
     * @memberOf Adal5Service
     */
    private adal5User;
    /**
     * Creates an instance of Adal5Service.
     *
     * @memberOf Adal5Service
     */
    constructor();
    /**
     *
     *
     * @param {adal.Config} configOptions
     *
     * @memberOf Adal5Service
     */
    init(configOptions: adal.Config): void;
    /**
     *
     *
     * @readonly
     * @type {adal.Config}
     * @memberOf Adal5Service
     */
    readonly config: adal.Config;
    /**
     *
     *
     * @readonly
     * @type {Adal5User}
     * @memberOf Adal5Service
     */
    readonly userInfo: Adal5User;
    /**
     *
     *
     *
     * @memberOf Adal5Service
     */
    login(): void;
    /**
     *
     *
     * @returns {boolean}
     *
     * @memberOf Adal5Service
     */
    loginInProgress(): boolean;
    /**
     *
     *
     *
     * @memberOf Adal5Service
     */
    logOut(): void;
    /**
     *
     *
     *
     * @memberOf Adal5Service
     */
    handleWindowCallback(): void;
    /**
     *
     *
     * @param {string} resource
     * @returns {string}
     *
     * @memberOf Adal5Service
     */
    getCachedToken(resource: string): string;
    /**
     *
     *
     * @param {string} resource
     * @returns
     *
     * @memberOf Adal5Service
     */
    acquireToken(resource: string): Observable<any>;
    /**
     *
     *
     * @returns {Observable<Adal5User>}
     *
     * @memberOf Adal5Service
     */
    getUser(): Observable<any>;
    /**
     *
     *
     *
     * @memberOf Adal5Service
     */
    clearCache(): void;
    /**
     *
     *
     * @param {string} resource
     *
     * @memberOf Adal5Service
     */
    clearCacheForResource(resource: string): void;
    /**
     *
     *
     * @param {string} message
     *
     * @memberOf Adal5Service
     */
    info(message: string): void;
    /**
     *
     *
     * @param {string} message
     *
     * @memberOf Adal5Service
     */
    verbose(message: string): void;
    /**
     *
     *
     * @param {string} url
     * @returns {string}
     *
     * @memberOf Adal5Service
     */
    GetResourceForEndpoint(url: string): string;
    /**
     *
     *
     *
     * @memberOf Adal5Service
     */
    refreshDataFromCache(): void;
    /**
     *
     *
     * @private
     * @param {string} resource
     *
     * @memberOf Adal5Service
     */
    private updateDataFromCache(resource);
}
