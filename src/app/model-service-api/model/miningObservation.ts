/**
 * EveKit Model API Server
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 2.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


/**
 * Model data common properties
 */
export interface MiningObservation { 
    /**
     * Unique ID
     */
    cid?: number;
    /**
     * EveKit release version
     */
    eveKitVersion?: number;
    /**
     * Model lifeline start (milliseconds UTC)
     */
    lifeStart?: number;
    /**
     * Model lifeline end (milliseconds UTC), MAX_LONG for live data
     */
    lifeEnd?: number;
    observerID?: number;
    characterID?: number;
    typeID?: number;
    recordedCorporationID?: number;
    quantity?: number;
    lastUpdated?: number;
    /**
     * lifeStart Date
     */
    lifeStartDate?: Date;
    /**
     * lifeEnd Date
     */
    lifeEndDate?: Date;
    /**
     * lastUpdated Date
     */
    lastUpdatedDate?: Date;
}
