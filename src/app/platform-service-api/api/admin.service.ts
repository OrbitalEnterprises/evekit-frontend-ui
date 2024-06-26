/**
 * EveKit Frontend Server
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 2.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { PersistentProperty } from '../model/persistentProperty';
import { QuickStartRequestor } from '../model/quickStartRequestor';
import { QuickStartResponse } from '../model/quickStartResponse';
import { QuickStartSelection } from '../model/quickStartSelection';
import { ServiceError } from '../model/serviceError';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class AdminService {

    protected basePath = 'http://localhost:8888/api';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Remove a system property.  Fails silently if the given property can not be found.
     * 
     * @param key System property key
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteSysProp(key: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteSysProp(key: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteSysProp(key: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteSysProp(key: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (key === null || key === undefined) {
            throw new Error('Required parameter key was null or undefined when calling deleteSysProp.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/ws/v1/admin/sysprop/${encodeURIComponent(String(key))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Remove user property.
     * 
     * @param uid UID of user for which a property will be deleted
     * @param key System property key
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteUserProp(uid: number, key: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteUserProp(uid: number, key: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteUserProp(uid: number, key: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteUserProp(uid: number, key: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling deleteUserProp.');
        }
        if (key === null || key === undefined) {
            throw new Error('Required parameter key was null or undefined when calling deleteUserProp.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/ws/v1/admin/userprop/${encodeURIComponent(String(uid))}/${encodeURIComponent(String(key))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Return the requested configuration property.  These properties do not require admin privileges to view.
     * 
     * @param key Property key
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getConfigProperty(key: string, observe?: 'body', reportProgress?: boolean): Observable<PersistentProperty>;
    public getConfigProperty(key: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PersistentProperty>>;
    public getConfigProperty(key: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PersistentProperty>>;
    public getConfigProperty(key: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (key === null || key === undefined) {
            throw new Error('Required parameter key was null or undefined when calling getConfigProperty.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<PersistentProperty>(`${this.basePath}/ws/v1/admin/configprop/${encodeURIComponent(String(key))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Return list of all configuration properties
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getConfigProps(observe?: 'body', reportProgress?: boolean): Observable<Array<PersistentProperty>>;
    public getConfigProps(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PersistentProperty>>>;
    public getConfigProps(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PersistentProperty>>>;
    public getConfigProps(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<PersistentProperty>>(`${this.basePath}/ws/v1/admin/configprop`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Return list of all system properties
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getSysProps(observe?: 'body', reportProgress?: boolean): Observable<Array<PersistentProperty>>;
    public getSysProps(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PersistentProperty>>>;
    public getSysProps(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PersistentProperty>>>;
    public getSysProps(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<PersistentProperty>>(`${this.basePath}/ws/v1/admin/sysprop`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Return system property for the given uid
     * 
     * @param uid UID of user for which property will be returned
     * @param key System property key
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUserProp(uid: number, key: string, observe?: 'body', reportProgress?: boolean): Observable<PersistentProperty>;
    public getUserProp(uid: number, key: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PersistentProperty>>;
    public getUserProp(uid: number, key: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PersistentProperty>>;
    public getUserProp(uid: number, key: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling getUserProp.');
        }
        if (key === null || key === undefined) {
            throw new Error('Required parameter key was null or undefined when calling getUserProp.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<PersistentProperty>(`${this.basePath}/ws/v1/admin/userprop/${encodeURIComponent(String(uid))}/${encodeURIComponent(String(key))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Return system properties for the given uid
     * 
     * @param uid UID of user for which properties will be returned
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUserProps(uid: number, observe?: 'body', reportProgress?: boolean): Observable<Array<PersistentProperty>>;
    public getUserProps(uid: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PersistentProperty>>>;
    public getUserProps(uid: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PersistentProperty>>>;
    public getUserProps(uid: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling getUserProps.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<PersistentProperty>>(`${this.basePath}/ws/v1/admin/userprop/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the name of the requestor for a given qs request ID.
     * 
     * @param sid Quickstart request ID
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public quickStartSelectionRequestor(sid: number, observe?: 'body', reportProgress?: boolean): Observable<QuickStartRequestor>;
    public quickStartSelectionRequestor(sid: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<QuickStartRequestor>>;
    public quickStartSelectionRequestor(sid: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<QuickStartRequestor>>;
    public quickStartSelectionRequestor(sid: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (sid === null || sid === undefined) {
            throw new Error('Required parameter sid was null or undefined when calling quickStartSelectionRequestor.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<QuickStartRequestor>(`${this.basePath}/ws/v1/admin/qs_get_requestor/${encodeURIComponent(String(sid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieve a quickstart access key selection
     * 
     * @param token Quickstart retrieval token
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public retrieveQuickStartSelection(token: string, observe?: 'body', reportProgress?: boolean): Observable<QuickStartSelection>;
    public retrieveQuickStartSelection(token: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<QuickStartSelection>>;
    public retrieveQuickStartSelection(token: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<QuickStartSelection>>;
    public retrieveQuickStartSelection(token: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (token === null || token === undefined) {
            throw new Error('Required parameter token was null or undefined when calling retrieveQuickStartSelection.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<QuickStartSelection>(`${this.basePath}/ws/v1/admin/qs_retrieve_selection/${encodeURIComponent(String(token))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Store system property
     * 
     * @param key System property key
     * @param value System property value
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public setSysProp(key: string, value: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public setSysProp(key: string, value: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public setSysProp(key: string, value: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public setSysProp(key: string, value: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (key === null || key === undefined) {
            throw new Error('Required parameter key was null or undefined when calling setSysProp.');
        }
        if (value === null || value === undefined) {
            throw new Error('Required parameter value was null or undefined when calling setSysProp.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/ws/v1/admin/sysprop/${encodeURIComponent(String(key))}`,
            value,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Set user system property
     * 
     * @param uid UID of user for which a property will be set
     * @param key System property key
     * @param value System property value
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public setUserProp(uid: number, key: string, value: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public setUserProp(uid: number, key: string, value: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public setUserProp(uid: number, key: string, value: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public setUserProp(uid: number, key: string, value: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling setUserProp.');
        }
        if (key === null || key === undefined) {
            throw new Error('Required parameter key was null or undefined when calling setUserProp.');
        }
        if (value === null || value === undefined) {
            throw new Error('Required parameter value was null or undefined when calling setUserProp.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/ws/v1/admin/userprop/${encodeURIComponent(String(uid))}/${encodeURIComponent(String(key))}`,
            value,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Request a quickstart access key selection
     * 
     * @param requestor Access key requestor
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public startQuickStartRequest(requestor: string, observe?: 'body', reportProgress?: boolean): Observable<QuickStartResponse>;
    public startQuickStartRequest(requestor: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<QuickStartResponse>>;
    public startQuickStartRequest(requestor: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<QuickStartResponse>>;
    public startQuickStartRequest(requestor: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (requestor === null || requestor === undefined) {
            throw new Error('Required parameter requestor was null or undefined when calling startQuickStartRequest.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (requestor !== undefined) {
            queryParameters = queryParameters.set('requestor', <any>requestor);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<QuickStartResponse>(`${this.basePath}/ws/v1/admin/qs_request`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Request a quickstart access key selection
     * 
     * @param sid Quickstart request ID
     * @param accessKey Selected access key ID
     * @param accessHash Selected access key hash
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public storeQuickStartSelection(sid: number, accessKey: number, accessHash: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public storeQuickStartSelection(sid: number, accessKey: number, accessHash: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public storeQuickStartSelection(sid: number, accessKey: number, accessHash: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public storeQuickStartSelection(sid: number, accessKey: number, accessHash: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (sid === null || sid === undefined) {
            throw new Error('Required parameter sid was null or undefined when calling storeQuickStartSelection.');
        }
        if (accessKey === null || accessKey === undefined) {
            throw new Error('Required parameter accessKey was null or undefined when calling storeQuickStartSelection.');
        }
        if (accessHash === null || accessHash === undefined) {
            throw new Error('Required parameter accessHash was null or undefined when calling storeQuickStartSelection.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (accessKey !== undefined) {
            queryParameters = queryParameters.set('accessKey', <any>accessKey);
        }
        if (accessHash !== undefined) {
            queryParameters = queryParameters.set('accessHash', <any>accessHash);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.put<any>(`${this.basePath}/ws/v1/admin/qs_store_selection/${encodeURIComponent(String(sid))}`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
