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

import { ChrAncestry } from '../model/chrAncestry';
import { ChrAttribute } from '../model/chrAttribute';
import { ChrBloodline } from '../model/chrBloodline';
import { ChrFaction } from '../model/chrFaction';
import { ChrRace } from '../model/chrRace';
import { ServiceError } from '../model/serviceError';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CharacterService {

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
     * Get ancestries
     * 
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param ancestryID Ancestry ID selector
     * @param ancestryName Ancestry name selector
     * @param bloodlineID Bloodline ID selector
     * @param charisma Charisma value selector
     * @param description Description text selector
     * @param iconID Icon ID selector
     * @param intelligence Intelligence value selector
     * @param memory Memory value selector
     * @param perception Perception value selector
     * @param shortDescription Short description text selector
     * @param willpower Willpower value selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAncestries(contid?: number, maxresults?: number, ancestryID?: string, ancestryName?: string, bloodlineID?: string, charisma?: string, description?: string, iconID?: string, intelligence?: string, memory?: string, perception?: string, shortDescription?: string, willpower?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ChrAncestry>>;
    public getAncestries(contid?: number, maxresults?: number, ancestryID?: string, ancestryName?: string, bloodlineID?: string, charisma?: string, description?: string, iconID?: string, intelligence?: string, memory?: string, perception?: string, shortDescription?: string, willpower?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ChrAncestry>>>;
    public getAncestries(contid?: number, maxresults?: number, ancestryID?: string, ancestryName?: string, bloodlineID?: string, charisma?: string, description?: string, iconID?: string, intelligence?: string, memory?: string, perception?: string, shortDescription?: string, willpower?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ChrAncestry>>>;
    public getAncestries(contid?: number, maxresults?: number, ancestryID?: string, ancestryName?: string, bloodlineID?: string, charisma?: string, description?: string, iconID?: string, intelligence?: string, memory?: string, perception?: string, shortDescription?: string, willpower?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (ancestryID !== undefined) {
            queryParameters = queryParameters.set('ancestryID', <any>ancestryID);
        }
        if (ancestryName !== undefined) {
            queryParameters = queryParameters.set('ancestryName', <any>ancestryName);
        }
        if (bloodlineID !== undefined) {
            queryParameters = queryParameters.set('bloodlineID', <any>bloodlineID);
        }
        if (charisma !== undefined) {
            queryParameters = queryParameters.set('charisma', <any>charisma);
        }
        if (description !== undefined) {
            queryParameters = queryParameters.set('description', <any>description);
        }
        if (iconID !== undefined) {
            queryParameters = queryParameters.set('iconID', <any>iconID);
        }
        if (intelligence !== undefined) {
            queryParameters = queryParameters.set('intelligence', <any>intelligence);
        }
        if (memory !== undefined) {
            queryParameters = queryParameters.set('memory', <any>memory);
        }
        if (perception !== undefined) {
            queryParameters = queryParameters.set('perception', <any>perception);
        }
        if (shortDescription !== undefined) {
            queryParameters = queryParameters.set('shortDescription', <any>shortDescription);
        }
        if (willpower !== undefined) {
            queryParameters = queryParameters.set('willpower', <any>willpower);
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

        return this.httpClient.get<Array<ChrAncestry>>(`${this.basePath}/chr/ancestry`,
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
     * Get attributes
     * 
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param attributeID Attribute ID selector
     * @param attributeName Attribute name selector
     * @param description Description text selector
     * @param iconID Icon ID selector
     * @param notes Notes text selector
     * @param shortDescription Short description text selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAttributes(contid?: number, maxresults?: number, attributeID?: string, attributeName?: string, description?: string, iconID?: string, notes?: string, shortDescription?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ChrAttribute>>;
    public getAttributes(contid?: number, maxresults?: number, attributeID?: string, attributeName?: string, description?: string, iconID?: string, notes?: string, shortDescription?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ChrAttribute>>>;
    public getAttributes(contid?: number, maxresults?: number, attributeID?: string, attributeName?: string, description?: string, iconID?: string, notes?: string, shortDescription?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ChrAttribute>>>;
    public getAttributes(contid?: number, maxresults?: number, attributeID?: string, attributeName?: string, description?: string, iconID?: string, notes?: string, shortDescription?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (attributeID !== undefined) {
            queryParameters = queryParameters.set('attributeID', <any>attributeID);
        }
        if (attributeName !== undefined) {
            queryParameters = queryParameters.set('attributeName', <any>attributeName);
        }
        if (description !== undefined) {
            queryParameters = queryParameters.set('description', <any>description);
        }
        if (iconID !== undefined) {
            queryParameters = queryParameters.set('iconID', <any>iconID);
        }
        if (notes !== undefined) {
            queryParameters = queryParameters.set('notes', <any>notes);
        }
        if (shortDescription !== undefined) {
            queryParameters = queryParameters.set('shortDescription', <any>shortDescription);
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

        return this.httpClient.get<Array<ChrAttribute>>(`${this.basePath}/chr/attribute`,
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
     * Get bloodlines
     * 
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param bloodlineID Bloodline ID selector
     * @param bloodlineName Bloodline name selector
     * @param charisma Charisma vlaue selector
     * @param corporationID Corporation ID selector
     * @param description Description text selector
     * @param femaleDescription Female description text selector
     * @param iconID Icon ID selector
     * @param intelligence Intelligence value selector
     * @param maleDescription Male description text selector
     * @param memory Memory value selector
     * @param perception Perception value selector
     * @param raceID Race ID selector
     * @param shipTypeID Ship type ID selector
     * @param shortDescription Short description text selector
     * @param shortFemaleDescription Short female description text selector
     * @param shortMaleDescription Short male description text selector
     * @param willpower Willpower value selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBloodlines(contid?: number, maxresults?: number, bloodlineID?: string, bloodlineName?: string, charisma?: string, corporationID?: string, description?: string, femaleDescription?: string, iconID?: string, intelligence?: string, maleDescription?: string, memory?: string, perception?: string, raceID?: string, shipTypeID?: string, shortDescription?: string, shortFemaleDescription?: string, shortMaleDescription?: string, willpower?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ChrBloodline>>;
    public getBloodlines(contid?: number, maxresults?: number, bloodlineID?: string, bloodlineName?: string, charisma?: string, corporationID?: string, description?: string, femaleDescription?: string, iconID?: string, intelligence?: string, maleDescription?: string, memory?: string, perception?: string, raceID?: string, shipTypeID?: string, shortDescription?: string, shortFemaleDescription?: string, shortMaleDescription?: string, willpower?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ChrBloodline>>>;
    public getBloodlines(contid?: number, maxresults?: number, bloodlineID?: string, bloodlineName?: string, charisma?: string, corporationID?: string, description?: string, femaleDescription?: string, iconID?: string, intelligence?: string, maleDescription?: string, memory?: string, perception?: string, raceID?: string, shipTypeID?: string, shortDescription?: string, shortFemaleDescription?: string, shortMaleDescription?: string, willpower?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ChrBloodline>>>;
    public getBloodlines(contid?: number, maxresults?: number, bloodlineID?: string, bloodlineName?: string, charisma?: string, corporationID?: string, description?: string, femaleDescription?: string, iconID?: string, intelligence?: string, maleDescription?: string, memory?: string, perception?: string, raceID?: string, shipTypeID?: string, shortDescription?: string, shortFemaleDescription?: string, shortMaleDescription?: string, willpower?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (bloodlineID !== undefined) {
            queryParameters = queryParameters.set('bloodlineID', <any>bloodlineID);
        }
        if (bloodlineName !== undefined) {
            queryParameters = queryParameters.set('bloodlineName', <any>bloodlineName);
        }
        if (charisma !== undefined) {
            queryParameters = queryParameters.set('charisma', <any>charisma);
        }
        if (corporationID !== undefined) {
            queryParameters = queryParameters.set('corporationID', <any>corporationID);
        }
        if (description !== undefined) {
            queryParameters = queryParameters.set('description', <any>description);
        }
        if (femaleDescription !== undefined) {
            queryParameters = queryParameters.set('femaleDescription', <any>femaleDescription);
        }
        if (iconID !== undefined) {
            queryParameters = queryParameters.set('iconID', <any>iconID);
        }
        if (intelligence !== undefined) {
            queryParameters = queryParameters.set('intelligence', <any>intelligence);
        }
        if (maleDescription !== undefined) {
            queryParameters = queryParameters.set('maleDescription', <any>maleDescription);
        }
        if (memory !== undefined) {
            queryParameters = queryParameters.set('memory', <any>memory);
        }
        if (perception !== undefined) {
            queryParameters = queryParameters.set('perception', <any>perception);
        }
        if (raceID !== undefined) {
            queryParameters = queryParameters.set('raceID', <any>raceID);
        }
        if (shipTypeID !== undefined) {
            queryParameters = queryParameters.set('shipTypeID', <any>shipTypeID);
        }
        if (shortDescription !== undefined) {
            queryParameters = queryParameters.set('shortDescription', <any>shortDescription);
        }
        if (shortFemaleDescription !== undefined) {
            queryParameters = queryParameters.set('shortFemaleDescription', <any>shortFemaleDescription);
        }
        if (shortMaleDescription !== undefined) {
            queryParameters = queryParameters.set('shortMaleDescription', <any>shortMaleDescription);
        }
        if (willpower !== undefined) {
            queryParameters = queryParameters.set('willpower', <any>willpower);
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

        return this.httpClient.get<Array<ChrBloodline>>(`${this.basePath}/chr/bloodline`,
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
     * Get factions
     * 
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param factionID Agent ID selector
     * @param corporationID Agent ID selector
     * @param description Agent ID selector
     * @param factionName Agent ID selector
     * @param iconID Agent ID selector
     * @param militiaCorporationID Agent ID selector
     * @param raceIDs Agent ID selector
     * @param sizeFactor Agent ID selector
     * @param solarSystemID Agent ID selector
     * @param stationCount Agent ID selector
     * @param stationSystemCount Agent ID selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getFactions(contid?: number, maxresults?: number, factionID?: string, corporationID?: string, description?: string, factionName?: string, iconID?: string, militiaCorporationID?: string, raceIDs?: string, sizeFactor?: string, solarSystemID?: string, stationCount?: string, stationSystemCount?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ChrFaction>>;
    public getFactions(contid?: number, maxresults?: number, factionID?: string, corporationID?: string, description?: string, factionName?: string, iconID?: string, militiaCorporationID?: string, raceIDs?: string, sizeFactor?: string, solarSystemID?: string, stationCount?: string, stationSystemCount?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ChrFaction>>>;
    public getFactions(contid?: number, maxresults?: number, factionID?: string, corporationID?: string, description?: string, factionName?: string, iconID?: string, militiaCorporationID?: string, raceIDs?: string, sizeFactor?: string, solarSystemID?: string, stationCount?: string, stationSystemCount?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ChrFaction>>>;
    public getFactions(contid?: number, maxresults?: number, factionID?: string, corporationID?: string, description?: string, factionName?: string, iconID?: string, militiaCorporationID?: string, raceIDs?: string, sizeFactor?: string, solarSystemID?: string, stationCount?: string, stationSystemCount?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (factionID !== undefined) {
            queryParameters = queryParameters.set('factionID', <any>factionID);
        }
        if (corporationID !== undefined) {
            queryParameters = queryParameters.set('corporationID', <any>corporationID);
        }
        if (description !== undefined) {
            queryParameters = queryParameters.set('description', <any>description);
        }
        if (factionName !== undefined) {
            queryParameters = queryParameters.set('factionName', <any>factionName);
        }
        if (iconID !== undefined) {
            queryParameters = queryParameters.set('iconID', <any>iconID);
        }
        if (militiaCorporationID !== undefined) {
            queryParameters = queryParameters.set('militiaCorporationID', <any>militiaCorporationID);
        }
        if (raceIDs !== undefined) {
            queryParameters = queryParameters.set('raceIDs', <any>raceIDs);
        }
        if (sizeFactor !== undefined) {
            queryParameters = queryParameters.set('sizeFactor', <any>sizeFactor);
        }
        if (solarSystemID !== undefined) {
            queryParameters = queryParameters.set('solarSystemID', <any>solarSystemID);
        }
        if (stationCount !== undefined) {
            queryParameters = queryParameters.set('stationCount', <any>stationCount);
        }
        if (stationSystemCount !== undefined) {
            queryParameters = queryParameters.set('stationSystemCount', <any>stationSystemCount);
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

        return this.httpClient.get<Array<ChrFaction>>(`${this.basePath}/chr/faction`,
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
     * Get races
     * 
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param raceID Race ID selector
     * @param description Description text selector
     * @param iconID Icon ID selector
     * @param raceName Race name selector
     * @param shortDescription Short description text selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getRaces(contid?: number, maxresults?: number, raceID?: string, description?: string, iconID?: string, raceName?: string, shortDescription?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ChrRace>>;
    public getRaces(contid?: number, maxresults?: number, raceID?: string, description?: string, iconID?: string, raceName?: string, shortDescription?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ChrRace>>>;
    public getRaces(contid?: number, maxresults?: number, raceID?: string, description?: string, iconID?: string, raceName?: string, shortDescription?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ChrRace>>>;
    public getRaces(contid?: number, maxresults?: number, raceID?: string, description?: string, iconID?: string, raceName?: string, shortDescription?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (raceID !== undefined) {
            queryParameters = queryParameters.set('raceID', <any>raceID);
        }
        if (description !== undefined) {
            queryParameters = queryParameters.set('description', <any>description);
        }
        if (iconID !== undefined) {
            queryParameters = queryParameters.set('iconID', <any>iconID);
        }
        if (raceName !== undefined) {
            queryParameters = queryParameters.set('raceName', <any>raceName);
        }
        if (shortDescription !== undefined) {
            queryParameters = queryParameters.set('shortDescription', <any>shortDescription);
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

        return this.httpClient.get<Array<ChrRace>>(`${this.basePath}/chr/race`,
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
