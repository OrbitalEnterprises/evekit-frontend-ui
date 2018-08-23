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

import { ESIEndpointSyncTracker } from '../model/eSIEndpointSyncTracker';
import { ESIRefEndpointSyncTracker } from '../model/eSIRefEndpointSyncTracker';
import { ServiceError } from '../model/serviceError';
import { SyncEndpointStats } from '../model/syncEndpointStats';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class AccountV2Service {

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
     * Force a ref tracker to be marked finished if it&#39;s not finished already
     * Forces a ref tracker into the finished state whether it&#39;s been finished or not
     * @param tid Ref Sync Tracker ID
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public requestFinishRefTracker(tid: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public requestFinishRefTracker(tid: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public requestFinishRefTracker(tid: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public requestFinishRefTracker(tid: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (tid === null || tid === undefined) {
            throw new Error('Required parameter tid was null or undefined when calling requestFinishRefTracker.');
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
        ];

        return this.httpClient.get<any>(`${this.basePath}/ws/v2/tracker/finish_ref_tracker/${encodeURIComponent(String(tid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Force a tracker to be marked finished if it&#39;s not finished already
     * Forces a tracker into the finished state whether it&#39;s been finished or not
     * @param uid EveKit User Account ID
     * @param aid Sync Account ID
     * @param tid Sync Tracker ID
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public requestFinishTracker(uid: number, aid: number, tid: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public requestFinishTracker(uid: number, aid: number, tid: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public requestFinishTracker(uid: number, aid: number, tid: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public requestFinishTracker(uid: number, aid: number, tid: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling requestFinishTracker.');
        }
        if (aid === null || aid === undefined) {
            throw new Error('Required parameter aid was null or undefined when calling requestFinishTracker.');
        }
        if (tid === null || tid === undefined) {
            throw new Error('Required parameter tid was null or undefined when calling requestFinishTracker.');
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
        ];

        return this.httpClient.get<any>(`${this.basePath}/ws/v2/tracker/finish_tracker/${encodeURIComponent(String(uid))}/${encodeURIComponent(String(aid))}/${encodeURIComponent(String(tid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieve the next scheduled synchronization trackers for an account
     * Retrieves the next scheduled synchronization trackers for an account, in increasing order by schedule time.
     * @param aid Sync Account ID
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public requestNextSync(aid: number, observe?: 'body', reportProgress?: boolean): Observable<Array<ESIEndpointSyncTracker>>;
    public requestNextSync(aid: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ESIEndpointSyncTracker>>>;
    public requestNextSync(aid: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ESIEndpointSyncTracker>>>;
    public requestNextSync(aid: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (aid === null || aid === undefined) {
            throw new Error('Required parameter aid was null or undefined when calling requestNextSync.');
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
        ];

        return this.httpClient.get<Array<ESIEndpointSyncTracker>>(`${this.basePath}/ws/v2/tracker/next_sync/${encodeURIComponent(String(aid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieve synchronization history for reference data
     * Retrieves reference data synchronization history ordered in descending order by sync start time
     * @param contid Optional sync start time before which results will be returned
     * @param maxresults Maximum number of results to return
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public requestRefSyncHistory(contid?: number, maxresults?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<ESIRefEndpointSyncTracker>>;
    public requestRefSyncHistory(contid?: number, maxresults?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ESIRefEndpointSyncTracker>>>;
    public requestRefSyncHistory(contid?: number, maxresults?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ESIRefEndpointSyncTracker>>>;
    public requestRefSyncHistory(contid?: number, maxresults?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
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
        ];

        return this.httpClient.get<Array<ESIRefEndpointSyncTracker>>(`${this.basePath}/ws/v2/tracker/ref_sync_history`,
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
     * Retrieve all started but unfinished ref data synchronization trackers
     * Retrieves ref data synchronization trackers which have started but are not yet finished
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public requestStartedRefSync(observe?: 'body', reportProgress?: boolean): Observable<Array<ESIRefEndpointSyncTracker>>;
    public requestStartedRefSync(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ESIRefEndpointSyncTracker>>>;
    public requestStartedRefSync(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ESIRefEndpointSyncTracker>>>;
    public requestStartedRefSync(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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
        ];

        return this.httpClient.get<Array<ESIRefEndpointSyncTracker>>(`${this.basePath}/ws/v2/tracker/ref_sync_started`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieve all started but unfinished synchronization trackers
     * Retrieves synchronization trackers which are started but not yet finished
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public requestStartedSync(observe?: 'body', reportProgress?: boolean): Observable<Array<ESIEndpointSyncTracker>>;
    public requestStartedSync(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ESIEndpointSyncTracker>>>;
    public requestStartedSync(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ESIEndpointSyncTracker>>>;
    public requestStartedSync(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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
        ];

        return this.httpClient.get<Array<ESIEndpointSyncTracker>>(`${this.basePath}/ws/v2/tracker/sync_started`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieve synchronization history for an account
     * Retrieves synchronization history ordered in descending order by sync start time
     * @param aid Sync Account ID
     * @param contid Optional sync start time before which results will be returned
     * @param maxresults Maximum number of results to return
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public requestSyncHistory(aid: number, contid?: number, maxresults?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<ESIEndpointSyncTracker>>;
    public requestSyncHistory(aid: number, contid?: number, maxresults?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ESIEndpointSyncTracker>>>;
    public requestSyncHistory(aid: number, contid?: number, maxresults?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ESIEndpointSyncTracker>>>;
    public requestSyncHistory(aid: number, contid?: number, maxresults?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (aid === null || aid === undefined) {
            throw new Error('Required parameter aid was null or undefined when calling requestSyncHistory.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
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
        ];

        return this.httpClient.get<Array<ESIEndpointSyncTracker>>(`${this.basePath}/ws/v2/tracker/sync_history/${encodeURIComponent(String(aid))}`,
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
     * Retrieve all finished synchronization trackers for a given endpoint type since a given timestamp
     * Retrieves finished synchronization trackers for a given endpoint since a given timestamp
     * @param contid Optional sync start time before which results will be returned
     * @param maxresults Maximum number of results to return
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public requestSyncSiteHistory(contid?: number, maxresults?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<ESIEndpointSyncTracker>>;
    public requestSyncSiteHistory(contid?: number, maxresults?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ESIEndpointSyncTracker>>>;
    public requestSyncSiteHistory(contid?: number, maxresults?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ESIEndpointSyncTracker>>>;
    public requestSyncSiteHistory(contid?: number, maxresults?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
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
        ];

        return this.httpClient.get<Array<ESIEndpointSyncTracker>>(`${this.basePath}/ws/v2/tracker/sync_site_history`,
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
     * Retrieve endpoint synchronization stats (attemps and failures) since a given time
     * 
     * @param endpoint endpoint for which stats are requested
     * @param since timestamp from which stats should be calculated
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public requestSyncSiteStats(endpoint: string, since: number, observe?: 'body', reportProgress?: boolean): Observable<SyncEndpointStats>;
    public requestSyncSiteStats(endpoint: string, since: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SyncEndpointStats>>;
    public requestSyncSiteStats(endpoint: string, since: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SyncEndpointStats>>;
    public requestSyncSiteStats(endpoint: string, since: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (endpoint === null || endpoint === undefined) {
            throw new Error('Required parameter endpoint was null or undefined when calling requestSyncSiteStats.');
        }
        if (since === null || since === undefined) {
            throw new Error('Required parameter since was null or undefined when calling requestSyncSiteStats.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (endpoint !== undefined) {
            queryParameters = queryParameters.set('endpoint', <any>endpoint);
        }
        if (since !== undefined) {
            queryParameters = queryParameters.set('since', <any>since);
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
        ];

        return this.httpClient.get<SyncEndpointStats>(`${this.basePath}/ws/v2/tracker/sync_site_stats`,
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
