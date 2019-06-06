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

import { ServiceError } from '../model/serviceError';
import { StaOperation } from '../model/staOperation';
import { StaOperationService } from '../model/staOperationService';
import { StaService } from '../model/staService';
import { StaStation } from '../model/staStation';
import { StaStationType } from '../model/staStationType';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class SDEStationService {

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
     * Get operation services
     * 
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param operationID Operation ID selector
     * @param serviceID Service ID selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getOperationServices(contid?: number, maxresults?: number, operationID?: string, serviceID?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<StaOperationService>>;
    public getOperationServices(contid?: number, maxresults?: number, operationID?: string, serviceID?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<StaOperationService>>>;
    public getOperationServices(contid?: number, maxresults?: number, operationID?: string, serviceID?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<StaOperationService>>>;
    public getOperationServices(contid?: number, maxresults?: number, operationID?: string, serviceID?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (operationID !== undefined) {
            queryParameters = queryParameters.set('operationID', <any>operationID);
        }
        if (serviceID !== undefined) {
            queryParameters = queryParameters.set('serviceID', <any>serviceID);
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

        return this.httpClient.get<Array<StaOperationService>>(`${this.basePath}/sta/operation_service`,
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
     * Get operations
     * 
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param operationID Operation ID selector
     * @param activityID Activity ID selector
     * @param amarrStationTypeID Amarr station type ID selector
     * @param border Border flag selector
     * @param caldariStationTypeID Caldari station type ID selector
     * @param corridor Corridor flag selector
     * @param description Description text selector
     * @param fringe Fringe flag selector
     * @param gallenteStationTypeID Gallente station type ID selector
     * @param hub Hub flag selector
     * @param joveStationTypeID Jove station type ID selector
     * @param minmatarStationTypeID Minmatar station type ID selector
     * @param operationName Operation name selector
     * @param ratio Ratio selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getOperations(contid?: number, maxresults?: number, operationID?: string, activityID?: string, amarrStationTypeID?: string, border?: string, caldariStationTypeID?: string, corridor?: string, description?: string, fringe?: string, gallenteStationTypeID?: string, hub?: string, joveStationTypeID?: string, minmatarStationTypeID?: string, operationName?: string, ratio?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<StaOperation>>;
    public getOperations(contid?: number, maxresults?: number, operationID?: string, activityID?: string, amarrStationTypeID?: string, border?: string, caldariStationTypeID?: string, corridor?: string, description?: string, fringe?: string, gallenteStationTypeID?: string, hub?: string, joveStationTypeID?: string, minmatarStationTypeID?: string, operationName?: string, ratio?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<StaOperation>>>;
    public getOperations(contid?: number, maxresults?: number, operationID?: string, activityID?: string, amarrStationTypeID?: string, border?: string, caldariStationTypeID?: string, corridor?: string, description?: string, fringe?: string, gallenteStationTypeID?: string, hub?: string, joveStationTypeID?: string, minmatarStationTypeID?: string, operationName?: string, ratio?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<StaOperation>>>;
    public getOperations(contid?: number, maxresults?: number, operationID?: string, activityID?: string, amarrStationTypeID?: string, border?: string, caldariStationTypeID?: string, corridor?: string, description?: string, fringe?: string, gallenteStationTypeID?: string, hub?: string, joveStationTypeID?: string, minmatarStationTypeID?: string, operationName?: string, ratio?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (operationID !== undefined) {
            queryParameters = queryParameters.set('operationID', <any>operationID);
        }
        if (activityID !== undefined) {
            queryParameters = queryParameters.set('activityID', <any>activityID);
        }
        if (amarrStationTypeID !== undefined) {
            queryParameters = queryParameters.set('amarrStationTypeID', <any>amarrStationTypeID);
        }
        if (border !== undefined) {
            queryParameters = queryParameters.set('border', <any>border);
        }
        if (caldariStationTypeID !== undefined) {
            queryParameters = queryParameters.set('caldariStationTypeID', <any>caldariStationTypeID);
        }
        if (corridor !== undefined) {
            queryParameters = queryParameters.set('corridor', <any>corridor);
        }
        if (description !== undefined) {
            queryParameters = queryParameters.set('description', <any>description);
        }
        if (fringe !== undefined) {
            queryParameters = queryParameters.set('fringe', <any>fringe);
        }
        if (gallenteStationTypeID !== undefined) {
            queryParameters = queryParameters.set('gallenteStationTypeID', <any>gallenteStationTypeID);
        }
        if (hub !== undefined) {
            queryParameters = queryParameters.set('hub', <any>hub);
        }
        if (joveStationTypeID !== undefined) {
            queryParameters = queryParameters.set('joveStationTypeID', <any>joveStationTypeID);
        }
        if (minmatarStationTypeID !== undefined) {
            queryParameters = queryParameters.set('minmatarStationTypeID', <any>minmatarStationTypeID);
        }
        if (operationName !== undefined) {
            queryParameters = queryParameters.set('operationName', <any>operationName);
        }
        if (ratio !== undefined) {
            queryParameters = queryParameters.set('ratio', <any>ratio);
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

        return this.httpClient.get<Array<StaOperation>>(`${this.basePath}/sta/operation`,
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
     * Get services
     * 
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param serviceID Service ID selector
     * @param description Description text selector
     * @param serviceName Service name selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getServices(contid?: number, maxresults?: number, serviceID?: string, description?: string, serviceName?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<StaService>>;
    public getServices(contid?: number, maxresults?: number, serviceID?: string, description?: string, serviceName?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<StaService>>>;
    public getServices(contid?: number, maxresults?: number, serviceID?: string, description?: string, serviceName?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<StaService>>>;
    public getServices(contid?: number, maxresults?: number, serviceID?: string, description?: string, serviceName?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (serviceID !== undefined) {
            queryParameters = queryParameters.set('serviceID', <any>serviceID);
        }
        if (description !== undefined) {
            queryParameters = queryParameters.set('description', <any>description);
        }
        if (serviceName !== undefined) {
            queryParameters = queryParameters.set('serviceName', <any>serviceName);
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

        return this.httpClient.get<Array<StaService>>(`${this.basePath}/sta/service`,
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
     * Get station types
     * 
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param stationTypeID Station type ID selector
     * @param conquerable Conquerable flag selector
     * @param dockEntryX Dock entry X position selector
     * @param dockEntryY Dock entry Y position selector
     * @param dockEntryZ Dock entry Z position selector
     * @param dockOrientationX Dock orientation X position selector
     * @param dockOrientationY Dock orientation Y position selector
     * @param dockOrientationZ Dock orientation Z position selector
     * @param officeSlots Office slots selector
     * @param operationID Operation ID selector
     * @param reprocessingEfficiency Reprocessing efficiency selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getStationTypes(contid?: number, maxresults?: number, stationTypeID?: string, conquerable?: string, dockEntryX?: string, dockEntryY?: string, dockEntryZ?: string, dockOrientationX?: string, dockOrientationY?: string, dockOrientationZ?: string, officeSlots?: string, operationID?: string, reprocessingEfficiency?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<StaStationType>>;
    public getStationTypes(contid?: number, maxresults?: number, stationTypeID?: string, conquerable?: string, dockEntryX?: string, dockEntryY?: string, dockEntryZ?: string, dockOrientationX?: string, dockOrientationY?: string, dockOrientationZ?: string, officeSlots?: string, operationID?: string, reprocessingEfficiency?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<StaStationType>>>;
    public getStationTypes(contid?: number, maxresults?: number, stationTypeID?: string, conquerable?: string, dockEntryX?: string, dockEntryY?: string, dockEntryZ?: string, dockOrientationX?: string, dockOrientationY?: string, dockOrientationZ?: string, officeSlots?: string, operationID?: string, reprocessingEfficiency?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<StaStationType>>>;
    public getStationTypes(contid?: number, maxresults?: number, stationTypeID?: string, conquerable?: string, dockEntryX?: string, dockEntryY?: string, dockEntryZ?: string, dockOrientationX?: string, dockOrientationY?: string, dockOrientationZ?: string, officeSlots?: string, operationID?: string, reprocessingEfficiency?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (stationTypeID !== undefined) {
            queryParameters = queryParameters.set('stationTypeID', <any>stationTypeID);
        }
        if (conquerable !== undefined) {
            queryParameters = queryParameters.set('conquerable', <any>conquerable);
        }
        if (dockEntryX !== undefined) {
            queryParameters = queryParameters.set('dockEntryX', <any>dockEntryX);
        }
        if (dockEntryY !== undefined) {
            queryParameters = queryParameters.set('dockEntryY', <any>dockEntryY);
        }
        if (dockEntryZ !== undefined) {
            queryParameters = queryParameters.set('dockEntryZ', <any>dockEntryZ);
        }
        if (dockOrientationX !== undefined) {
            queryParameters = queryParameters.set('dockOrientationX', <any>dockOrientationX);
        }
        if (dockOrientationY !== undefined) {
            queryParameters = queryParameters.set('dockOrientationY', <any>dockOrientationY);
        }
        if (dockOrientationZ !== undefined) {
            queryParameters = queryParameters.set('dockOrientationZ', <any>dockOrientationZ);
        }
        if (officeSlots !== undefined) {
            queryParameters = queryParameters.set('officeSlots', <any>officeSlots);
        }
        if (operationID !== undefined) {
            queryParameters = queryParameters.set('operationID', <any>operationID);
        }
        if (reprocessingEfficiency !== undefined) {
            queryParameters = queryParameters.set('reprocessingEfficiency', <any>reprocessingEfficiency);
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

        return this.httpClient.get<Array<StaStationType>>(`${this.basePath}/sta/station_type`,
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
     * Get stations
     * 
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param stationID Station ID selector
     * @param constellationID Constellation ID selector
     * @param corporationID Corporation ID selector
     * @param dockingCostPerVolume Docking cost per volume selector
     * @param maxShipVolumeDockable Max ship volume dockable selector
     * @param officeRentalCost Office rental cost selector
     * @param operationID Operation ID selector
     * @param regionID Region ID selector
     * @param reprocessingEfficiency Reprocessing efficiency selector
     * @param reprocessingHangarFlag Reprocessing hangar flag selector
     * @param reprocessingStationsTake Reprocessing stations take selector
     * @param security Security selector
     * @param solarSystemID Solar system ID selector
     * @param stationName Station name selector
     * @param stationTypeID Station type ID selector
     * @param x X position selector
     * @param y Y position selector
     * @param z Z position selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getStations(contid?: number, maxresults?: number, stationID?: string, constellationID?: string, corporationID?: string, dockingCostPerVolume?: string, maxShipVolumeDockable?: string, officeRentalCost?: string, operationID?: string, regionID?: string, reprocessingEfficiency?: string, reprocessingHangarFlag?: string, reprocessingStationsTake?: string, security?: string, solarSystemID?: string, stationName?: string, stationTypeID?: string, x?: string, y?: string, z?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<StaStation>>;
    public getStations(contid?: number, maxresults?: number, stationID?: string, constellationID?: string, corporationID?: string, dockingCostPerVolume?: string, maxShipVolumeDockable?: string, officeRentalCost?: string, operationID?: string, regionID?: string, reprocessingEfficiency?: string, reprocessingHangarFlag?: string, reprocessingStationsTake?: string, security?: string, solarSystemID?: string, stationName?: string, stationTypeID?: string, x?: string, y?: string, z?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<StaStation>>>;
    public getStations(contid?: number, maxresults?: number, stationID?: string, constellationID?: string, corporationID?: string, dockingCostPerVolume?: string, maxShipVolumeDockable?: string, officeRentalCost?: string, operationID?: string, regionID?: string, reprocessingEfficiency?: string, reprocessingHangarFlag?: string, reprocessingStationsTake?: string, security?: string, solarSystemID?: string, stationName?: string, stationTypeID?: string, x?: string, y?: string, z?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<StaStation>>>;
    public getStations(contid?: number, maxresults?: number, stationID?: string, constellationID?: string, corporationID?: string, dockingCostPerVolume?: string, maxShipVolumeDockable?: string, officeRentalCost?: string, operationID?: string, regionID?: string, reprocessingEfficiency?: string, reprocessingHangarFlag?: string, reprocessingStationsTake?: string, security?: string, solarSystemID?: string, stationName?: string, stationTypeID?: string, x?: string, y?: string, z?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (stationID !== undefined) {
            queryParameters = queryParameters.set('stationID', <any>stationID);
        }
        if (constellationID !== undefined) {
            queryParameters = queryParameters.set('constellationID', <any>constellationID);
        }
        if (corporationID !== undefined) {
            queryParameters = queryParameters.set('corporationID', <any>corporationID);
        }
        if (dockingCostPerVolume !== undefined) {
            queryParameters = queryParameters.set('dockingCostPerVolume', <any>dockingCostPerVolume);
        }
        if (maxShipVolumeDockable !== undefined) {
            queryParameters = queryParameters.set('maxShipVolumeDockable', <any>maxShipVolumeDockable);
        }
        if (officeRentalCost !== undefined) {
            queryParameters = queryParameters.set('officeRentalCost', <any>officeRentalCost);
        }
        if (operationID !== undefined) {
            queryParameters = queryParameters.set('operationID', <any>operationID);
        }
        if (regionID !== undefined) {
            queryParameters = queryParameters.set('regionID', <any>regionID);
        }
        if (reprocessingEfficiency !== undefined) {
            queryParameters = queryParameters.set('reprocessingEfficiency', <any>reprocessingEfficiency);
        }
        if (reprocessingHangarFlag !== undefined) {
            queryParameters = queryParameters.set('reprocessingHangarFlag', <any>reprocessingHangarFlag);
        }
        if (reprocessingStationsTake !== undefined) {
            queryParameters = queryParameters.set('reprocessingStationsTake', <any>reprocessingStationsTake);
        }
        if (security !== undefined) {
            queryParameters = queryParameters.set('security', <any>security);
        }
        if (solarSystemID !== undefined) {
            queryParameters = queryParameters.set('solarSystemID', <any>solarSystemID);
        }
        if (stationName !== undefined) {
            queryParameters = queryParameters.set('stationName', <any>stationName);
        }
        if (stationTypeID !== undefined) {
            queryParameters = queryParameters.set('stationTypeID', <any>stationTypeID);
        }
        if (x !== undefined) {
            queryParameters = queryParameters.set('x', <any>x);
        }
        if (y !== undefined) {
            queryParameters = queryParameters.set('y', <any>y);
        }
        if (z !== undefined) {
            queryParameters = queryParameters.set('z', <any>z);
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

        return this.httpClient.get<Array<StaStation>>(`${this.basePath}/sta/station`,
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