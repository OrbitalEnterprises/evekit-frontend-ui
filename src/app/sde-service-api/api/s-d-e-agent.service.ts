/**
 * EveKit SDE API Server
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 2.0.0.20180713
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

import { AgtAgent } from '../model/agtAgent';
import { AgtAgentType } from '../model/agtAgentType';
import { AgtResearchAgent } from '../model/agtResearchAgent';
import { ServiceError } from '../model/serviceError';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class SDEAgentService {

    protected basePath = 'https://evekit-sde.orbital.enterprises/20180713/api/ws/v20180713';
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
     * Get agent types
     * 
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param agentTypeID Agent type ID selector
     * @param agentType Agent type name selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAgentTypes(contid?: number, maxresults?: number, agentTypeID?: string, agentType?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<AgtAgentType>>;
    public getAgentTypes(contid?: number, maxresults?: number, agentTypeID?: string, agentType?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AgtAgentType>>>;
    public getAgentTypes(contid?: number, maxresults?: number, agentTypeID?: string, agentType?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AgtAgentType>>>;
    public getAgentTypes(contid?: number, maxresults?: number, agentTypeID?: string, agentType?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (agentTypeID !== undefined) {
            queryParameters = queryParameters.set('agentTypeID', <any>agentTypeID);
        }
        if (agentType !== undefined) {
            queryParameters = queryParameters.set('agentType', <any>agentType);
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

        return this.httpClient.get<Array<AgtAgentType>>(`${this.basePath}/agt/agentType`,
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
     * Get agents
     * 
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param agentID Agent ID selector
     * @param agentTypeID Agent type ID selector
     * @param corporationID Corporation ID selector
     * @param divisionID Division ID selector
     * @param isLocator Locator indicator selector
     * @param level Level selector
     * @param locationID Location ID selector
     * @param quality Quality selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAgents(contid?: number, maxresults?: number, agentID?: string, agentTypeID?: string, corporationID?: string, divisionID?: string, isLocator?: string, level?: string, locationID?: string, quality?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<AgtAgent>>;
    public getAgents(contid?: number, maxresults?: number, agentID?: string, agentTypeID?: string, corporationID?: string, divisionID?: string, isLocator?: string, level?: string, locationID?: string, quality?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AgtAgent>>>;
    public getAgents(contid?: number, maxresults?: number, agentID?: string, agentTypeID?: string, corporationID?: string, divisionID?: string, isLocator?: string, level?: string, locationID?: string, quality?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AgtAgent>>>;
    public getAgents(contid?: number, maxresults?: number, agentID?: string, agentTypeID?: string, corporationID?: string, divisionID?: string, isLocator?: string, level?: string, locationID?: string, quality?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (agentID !== undefined) {
            queryParameters = queryParameters.set('agentID', <any>agentID);
        }
        if (agentTypeID !== undefined) {
            queryParameters = queryParameters.set('agentTypeID', <any>agentTypeID);
        }
        if (corporationID !== undefined) {
            queryParameters = queryParameters.set('corporationID', <any>corporationID);
        }
        if (divisionID !== undefined) {
            queryParameters = queryParameters.set('divisionID', <any>divisionID);
        }
        if (isLocator !== undefined) {
            queryParameters = queryParameters.set('isLocator', <any>isLocator);
        }
        if (level !== undefined) {
            queryParameters = queryParameters.set('level', <any>level);
        }
        if (locationID !== undefined) {
            queryParameters = queryParameters.set('locationID', <any>locationID);
        }
        if (quality !== undefined) {
            queryParameters = queryParameters.set('quality', <any>quality);
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

        return this.httpClient.get<Array<AgtAgent>>(`${this.basePath}/agt/agent`,
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
     * Get research agents
     * 
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param agentID Agent ID selector
     * @param typeID Research type ID selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getResearchAgents(contid?: number, maxresults?: number, agentID?: string, typeID?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<AgtResearchAgent>>;
    public getResearchAgents(contid?: number, maxresults?: number, agentID?: string, typeID?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AgtResearchAgent>>>;
    public getResearchAgents(contid?: number, maxresults?: number, agentID?: string, typeID?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AgtResearchAgent>>>;
    public getResearchAgents(contid?: number, maxresults?: number, agentID?: string, typeID?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (agentID !== undefined) {
            queryParameters = queryParameters.set('agentID', <any>agentID);
        }
        if (typeID !== undefined) {
            queryParameters = queryParameters.set('typeID', <any>typeID);
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

        return this.httpClient.get<Array<AgtResearchAgent>>(`${this.basePath}/agt/researchAgent`,
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
