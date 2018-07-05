/**
 * EveKit SDE API Server
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 2.0.0.20180529
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {CustomHttpUrlEncodingCodec} from '../encoder';

import {Observable} from 'rxjs';

import {DgmAttributeCategory} from '../model/dgmAttributeCategory';
import {DgmAttributeType} from '../model/dgmAttributeType';
import {DgmEffect} from '../model/dgmEffect';
import {DgmExpression} from '../model/dgmExpression';
import {DgmTypeAttribute} from '../model/dgmTypeAttribute';
import {DgmTypeEffect} from '../model/dgmTypeEffect';

import {SDE_BASE_PATH} from '../variables';
import {Configuration} from '../configuration';


@Injectable()
export class DogmaService {

    protected basePath = 'http://localhost:8080/evekit-sde/api/ws/v20180529';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(SDE_BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
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
     * Get attribute categories
     *
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param categoryID Category ID selector
     * @param categoryDescription Category description selector
     * @param categoryName Category name selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAttributeCategories(contid?: number, maxresults?: number, categoryID?: string, categoryDescription?: string, categoryName?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<DgmAttributeCategory>>;
    public getAttributeCategories(contid?: number, maxresults?: number, categoryID?: string, categoryDescription?: string, categoryName?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DgmAttributeCategory>>>;
    public getAttributeCategories(contid?: number, maxresults?: number, categoryID?: string, categoryDescription?: string, categoryName?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DgmAttributeCategory>>>;
    public getAttributeCategories(contid?: number, maxresults?: number, categoryID?: string, categoryDescription?: string, categoryName?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (categoryID !== undefined) {
            queryParameters = queryParameters.set('categoryID', <any>categoryID);
        }
        if (categoryDescription !== undefined) {
            queryParameters = queryParameters.set('categoryDescription', <any>categoryDescription);
        }
        if (categoryName !== undefined) {
            queryParameters = queryParameters.set('categoryName', <any>categoryName);
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

        return this.httpClient.get<Array<DgmAttributeCategory>>(`${this.basePath}/dgm/attribute_category`,
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
     * Get attribute types
     *
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param attributeID Attribute ID selector
     * @param attributeName Attribute name selector
     * @param categoryID Category ID selector
     * @param defaultValue Default value selector
     * @param description Description text selector
     * @param displayName Display name selector
     * @param highIsGood High Is Good flag selector
     * @param iconID Icon ID selector
     * @param published Published flag selector
     * @param stackable Stackable flag selector
     * @param unitID Unit ID selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAttributeTypes(contid?: number, maxresults?: number, attributeID?: string, attributeName?: string, categoryID?: string, defaultValue?: string, description?: string, displayName?: string, highIsGood?: string, iconID?: string, published?: string, stackable?: string, unitID?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<DgmAttributeType>>;
    public getAttributeTypes(contid?: number, maxresults?: number, attributeID?: string, attributeName?: string, categoryID?: string, defaultValue?: string, description?: string, displayName?: string, highIsGood?: string, iconID?: string, published?: string, stackable?: string, unitID?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DgmAttributeType>>>;
    public getAttributeTypes(contid?: number, maxresults?: number, attributeID?: string, attributeName?: string, categoryID?: string, defaultValue?: string, description?: string, displayName?: string, highIsGood?: string, iconID?: string, published?: string, stackable?: string, unitID?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DgmAttributeType>>>;
    public getAttributeTypes(contid?: number, maxresults?: number, attributeID?: string, attributeName?: string, categoryID?: string, defaultValue?: string, description?: string, displayName?: string, highIsGood?: string, iconID?: string, published?: string, stackable?: string, unitID?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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
        if (categoryID !== undefined) {
            queryParameters = queryParameters.set('categoryID', <any>categoryID);
        }
        if (defaultValue !== undefined) {
            queryParameters = queryParameters.set('defaultValue', <any>defaultValue);
        }
        if (description !== undefined) {
            queryParameters = queryParameters.set('description', <any>description);
        }
        if (displayName !== undefined) {
            queryParameters = queryParameters.set('displayName', <any>displayName);
        }
        if (highIsGood !== undefined) {
            queryParameters = queryParameters.set('highIsGood', <any>highIsGood);
        }
        if (iconID !== undefined) {
            queryParameters = queryParameters.set('iconID', <any>iconID);
        }
        if (published !== undefined) {
            queryParameters = queryParameters.set('published', <any>published);
        }
        if (stackable !== undefined) {
            queryParameters = queryParameters.set('stackable', <any>stackable);
        }
        if (unitID !== undefined) {
            queryParameters = queryParameters.set('unitID', <any>unitID);
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

        return this.httpClient.get<Array<DgmAttributeType>>(`${this.basePath}/dgm/attribute_type`,
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
     * Get effects
     *
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param effectID Effect ID selector
     * @param description Description text selector
     * @param disallowAutoRepeat Disallow auto repeat flag selector
     * @param dischargeAttributeID Discharge attribute ID selector
     * @param displayName Display name selector
     * @param distribution Distribution selector
     * @param durationAttributeID Duration attribute ID selector
     * @param effectCategory Effect category selector
     * @param effectName Effect name selector
     * @param electronicChance Electronic chance selector
     * @param falloffAttributeID Falloff attribute ID selector
     * @param fittingUsageChanceAttributeID Fitting usage chance attribute ID selector
     * @param guid GUID selector
     * @param iconID Icon ID selector
     * @param isAssistance Is Assistance flag selector
     * @param isOffensive Is Offensive flag selector
     * @param isWarpSafe Is Warp Safe flag selector
     * @param modifierInfo Modifier info selector
     * @param npcActivationChanceAttributeID NPC activation chance attribute ID selector
     * @param npcUsageChanceAttributeID NPC usage chance attribute ID selector
     * @param postExpression Post expression selector
     * @param preExpression Pre expression selector
     * @param propulsionChance Propulsion chance selector
     * @param published Published flag selector
     * @param rangeAttributeID Range attribute ID selector
     * @param rangeChance Range chance selector
     * @param sfxName SFX name selector
     * @param trackingSpeedAttributeID Tracking speed attribute ID selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getEffects(contid?: number, maxresults?: number, effectID?: string, description?: string, disallowAutoRepeat?: string, dischargeAttributeID?: string, displayName?: string, distribution?: string, durationAttributeID?: string, effectCategory?: string, effectName?: string, electronicChance?: string, falloffAttributeID?: string, fittingUsageChanceAttributeID?: string, guid?: string, iconID?: string, isAssistance?: string, isOffensive?: string, isWarpSafe?: string, modifierInfo?: string, npcActivationChanceAttributeID?: string, npcUsageChanceAttributeID?: string, postExpression?: string, preExpression?: string, propulsionChance?: string, published?: string, rangeAttributeID?: string, rangeChance?: string, sfxName?: string, trackingSpeedAttributeID?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<DgmEffect>>;
    public getEffects(contid?: number, maxresults?: number, effectID?: string, description?: string, disallowAutoRepeat?: string, dischargeAttributeID?: string, displayName?: string, distribution?: string, durationAttributeID?: string, effectCategory?: string, effectName?: string, electronicChance?: string, falloffAttributeID?: string, fittingUsageChanceAttributeID?: string, guid?: string, iconID?: string, isAssistance?: string, isOffensive?: string, isWarpSafe?: string, modifierInfo?: string, npcActivationChanceAttributeID?: string, npcUsageChanceAttributeID?: string, postExpression?: string, preExpression?: string, propulsionChance?: string, published?: string, rangeAttributeID?: string, rangeChance?: string, sfxName?: string, trackingSpeedAttributeID?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DgmEffect>>>;
    public getEffects(contid?: number, maxresults?: number, effectID?: string, description?: string, disallowAutoRepeat?: string, dischargeAttributeID?: string, displayName?: string, distribution?: string, durationAttributeID?: string, effectCategory?: string, effectName?: string, electronicChance?: string, falloffAttributeID?: string, fittingUsageChanceAttributeID?: string, guid?: string, iconID?: string, isAssistance?: string, isOffensive?: string, isWarpSafe?: string, modifierInfo?: string, npcActivationChanceAttributeID?: string, npcUsageChanceAttributeID?: string, postExpression?: string, preExpression?: string, propulsionChance?: string, published?: string, rangeAttributeID?: string, rangeChance?: string, sfxName?: string, trackingSpeedAttributeID?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DgmEffect>>>;
    public getEffects(contid?: number, maxresults?: number, effectID?: string, description?: string, disallowAutoRepeat?: string, dischargeAttributeID?: string, displayName?: string, distribution?: string, durationAttributeID?: string, effectCategory?: string, effectName?: string, electronicChance?: string, falloffAttributeID?: string, fittingUsageChanceAttributeID?: string, guid?: string, iconID?: string, isAssistance?: string, isOffensive?: string, isWarpSafe?: string, modifierInfo?: string, npcActivationChanceAttributeID?: string, npcUsageChanceAttributeID?: string, postExpression?: string, preExpression?: string, propulsionChance?: string, published?: string, rangeAttributeID?: string, rangeChance?: string, sfxName?: string, trackingSpeedAttributeID?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (effectID !== undefined) {
            queryParameters = queryParameters.set('effectID', <any>effectID);
        }
        if (description !== undefined) {
            queryParameters = queryParameters.set('description', <any>description);
        }
        if (disallowAutoRepeat !== undefined) {
            queryParameters = queryParameters.set('disallowAutoRepeat', <any>disallowAutoRepeat);
        }
        if (dischargeAttributeID !== undefined) {
            queryParameters = queryParameters.set('dischargeAttributeID', <any>dischargeAttributeID);
        }
        if (displayName !== undefined) {
            queryParameters = queryParameters.set('displayName', <any>displayName);
        }
        if (distribution !== undefined) {
            queryParameters = queryParameters.set('distribution', <any>distribution);
        }
        if (durationAttributeID !== undefined) {
            queryParameters = queryParameters.set('durationAttributeID', <any>durationAttributeID);
        }
        if (effectCategory !== undefined) {
            queryParameters = queryParameters.set('effectCategory', <any>effectCategory);
        }
        if (effectName !== undefined) {
            queryParameters = queryParameters.set('effectName', <any>effectName);
        }
        if (electronicChance !== undefined) {
            queryParameters = queryParameters.set('electronicChance', <any>electronicChance);
        }
        if (falloffAttributeID !== undefined) {
            queryParameters = queryParameters.set('falloffAttributeID', <any>falloffAttributeID);
        }
        if (fittingUsageChanceAttributeID !== undefined) {
            queryParameters = queryParameters.set('fittingUsageChanceAttributeID', <any>fittingUsageChanceAttributeID);
        }
        if (guid !== undefined) {
            queryParameters = queryParameters.set('guid', <any>guid);
        }
        if (iconID !== undefined) {
            queryParameters = queryParameters.set('iconID', <any>iconID);
        }
        if (isAssistance !== undefined) {
            queryParameters = queryParameters.set('isAssistance', <any>isAssistance);
        }
        if (isOffensive !== undefined) {
            queryParameters = queryParameters.set('isOffensive', <any>isOffensive);
        }
        if (isWarpSafe !== undefined) {
            queryParameters = queryParameters.set('isWarpSafe', <any>isWarpSafe);
        }
        if (modifierInfo !== undefined) {
            queryParameters = queryParameters.set('modifierInfo', <any>modifierInfo);
        }
        if (npcActivationChanceAttributeID !== undefined) {
            queryParameters = queryParameters.set('npcActivationChanceAttributeID', <any>npcActivationChanceAttributeID);
        }
        if (npcUsageChanceAttributeID !== undefined) {
            queryParameters = queryParameters.set('npcUsageChanceAttributeID', <any>npcUsageChanceAttributeID);
        }
        if (postExpression !== undefined) {
            queryParameters = queryParameters.set('postExpression', <any>postExpression);
        }
        if (preExpression !== undefined) {
            queryParameters = queryParameters.set('preExpression', <any>preExpression);
        }
        if (propulsionChance !== undefined) {
            queryParameters = queryParameters.set('propulsionChance', <any>propulsionChance);
        }
        if (published !== undefined) {
            queryParameters = queryParameters.set('published', <any>published);
        }
        if (rangeAttributeID !== undefined) {
            queryParameters = queryParameters.set('rangeAttributeID', <any>rangeAttributeID);
        }
        if (rangeChance !== undefined) {
            queryParameters = queryParameters.set('rangeChance', <any>rangeChance);
        }
        if (sfxName !== undefined) {
            queryParameters = queryParameters.set('sfxName', <any>sfxName);
        }
        if (trackingSpeedAttributeID !== undefined) {
            queryParameters = queryParameters.set('trackingSpeedAttributeID', <any>trackingSpeedAttributeID);
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

        return this.httpClient.get<Array<DgmEffect>>(`${this.basePath}/dgm/effect`,
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
     * Get expressions
     *
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param expressionID Expression ID selector
     * @param arg1 First argument selector
     * @param arg2 Second argument selector
     * @param description Description text selector
     * @param expressionAttributeID Expression attribute ID selector
     * @param expressionGroupID Expression group ID selector
     * @param expressionName Expression name selector
     * @param expressionTypeID Expression type ID selector
     * @param expressionValue Expression value selector
     * @param operandID Operand ID selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getExpressions(contid?: number, maxresults?: number, expressionID?: string, arg1?: string, arg2?: string, description?: string, expressionAttributeID?: string, expressionGroupID?: string, expressionName?: string, expressionTypeID?: string, expressionValue?: string, operandID?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<DgmExpression>>;
    public getExpressions(contid?: number, maxresults?: number, expressionID?: string, arg1?: string, arg2?: string, description?: string, expressionAttributeID?: string, expressionGroupID?: string, expressionName?: string, expressionTypeID?: string, expressionValue?: string, operandID?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DgmExpression>>>;
    public getExpressions(contid?: number, maxresults?: number, expressionID?: string, arg1?: string, arg2?: string, description?: string, expressionAttributeID?: string, expressionGroupID?: string, expressionName?: string, expressionTypeID?: string, expressionValue?: string, operandID?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DgmExpression>>>;
    public getExpressions(contid?: number, maxresults?: number, expressionID?: string, arg1?: string, arg2?: string, description?: string, expressionAttributeID?: string, expressionGroupID?: string, expressionName?: string, expressionTypeID?: string, expressionValue?: string, operandID?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (expressionID !== undefined) {
            queryParameters = queryParameters.set('expressionID', <any>expressionID);
        }
        if (arg1 !== undefined) {
            queryParameters = queryParameters.set('arg1', <any>arg1);
        }
        if (arg2 !== undefined) {
            queryParameters = queryParameters.set('arg2', <any>arg2);
        }
        if (description !== undefined) {
            queryParameters = queryParameters.set('description', <any>description);
        }
        if (expressionAttributeID !== undefined) {
            queryParameters = queryParameters.set('expressionAttributeID', <any>expressionAttributeID);
        }
        if (expressionGroupID !== undefined) {
            queryParameters = queryParameters.set('expressionGroupID', <any>expressionGroupID);
        }
        if (expressionName !== undefined) {
            queryParameters = queryParameters.set('expressionName', <any>expressionName);
        }
        if (expressionTypeID !== undefined) {
            queryParameters = queryParameters.set('expressionTypeID', <any>expressionTypeID);
        }
        if (expressionValue !== undefined) {
            queryParameters = queryParameters.set('expressionValue', <any>expressionValue);
        }
        if (operandID !== undefined) {
            queryParameters = queryParameters.set('operandID', <any>operandID);
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

        return this.httpClient.get<Array<DgmExpression>>(`${this.basePath}/dgm/expression`,
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
     * Get type attributes
     *
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param typeID Type ID selector
     * @param attributeID Attribute ID selector
     * @param valueFloat Float value selector
     * @param valueInt Integer value selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTypeAttributes(contid?: number, maxresults?: number, typeID?: string, attributeID?: string, valueFloat?: string, valueInt?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<DgmTypeAttribute>>;
    public getTypeAttributes(contid?: number, maxresults?: number, typeID?: string, attributeID?: string, valueFloat?: string, valueInt?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DgmTypeAttribute>>>;
    public getTypeAttributes(contid?: number, maxresults?: number, typeID?: string, attributeID?: string, valueFloat?: string, valueInt?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DgmTypeAttribute>>>;
    public getTypeAttributes(contid?: number, maxresults?: number, typeID?: string, attributeID?: string, valueFloat?: string, valueInt?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (typeID !== undefined) {
            queryParameters = queryParameters.set('typeID', <any>typeID);
        }
        if (attributeID !== undefined) {
            queryParameters = queryParameters.set('attributeID', <any>attributeID);
        }
        if (valueFloat !== undefined) {
            queryParameters = queryParameters.set('valueFloat', <any>valueFloat);
        }
        if (valueInt !== undefined) {
            queryParameters = queryParameters.set('valueInt', <any>valueInt);
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

        return this.httpClient.get<Array<DgmTypeAttribute>>(`${this.basePath}/dgm/type_attribute`,
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
     * Get type effects
     *
     * @param contid Continuation ID for paged results
     * @param maxresults Maximum number of results to retrieve
     * @param typeID Type ID selector
     * @param effectID Effect ID selector
     * @param isDefault Default boolean selector
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTypeEffects(contid?: number, maxresults?: number, typeID?: string, effectID?: string, isDefault?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<DgmTypeEffect>>;
    public getTypeEffects(contid?: number, maxresults?: number, typeID?: string, effectID?: string, isDefault?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<DgmTypeEffect>>>;
    public getTypeEffects(contid?: number, maxresults?: number, typeID?: string, effectID?: string, isDefault?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<DgmTypeEffect>>>;
    public getTypeEffects(contid?: number, maxresults?: number, typeID?: string, effectID?: string, isDefault?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (contid !== undefined) {
            queryParameters = queryParameters.set('contid', <any>contid);
        }
        if (maxresults !== undefined) {
            queryParameters = queryParameters.set('maxresults', <any>maxresults);
        }
        if (typeID !== undefined) {
            queryParameters = queryParameters.set('typeID', <any>typeID);
        }
        if (effectID !== undefined) {
            queryParameters = queryParameters.set('effectID', <any>effectID);
        }
        if (isDefault !== undefined) {
            queryParameters = queryParameters.set('isDefault', <any>isDefault);
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

        return this.httpClient.get<Array<DgmTypeEffect>>(`${this.basePath}/dgm/type_effect`,
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
