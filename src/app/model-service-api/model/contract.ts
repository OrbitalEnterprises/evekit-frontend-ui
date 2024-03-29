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
export interface Contract { 
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
    contractID?: number;
    issuerID?: number;
    issuerCorpID?: number;
    assigneeID?: number;
    acceptorID?: number;
    startStationID?: number;
    endStationID?: number;
    type?: string;
    status?: string;
    title?: string;
    forCorp?: boolean;
    availability?: string;
    dateIssued?: number;
    dateExpired?: number;
    dateAccepted?: number;
    numDays?: number;
    dateCompleted?: number;
    price?: number;
    reward?: number;
    collateral?: number;
    buyout?: number;
    volume?: number;
    /**
     * lifeStart Date
     */
    lifeStartDate?: Date;
    /**
     * lifeEnd Date
     */
    lifeEndDate?: Date;
    /**
     * dateIssued Date
     */
    dateIssuedDate?: Date;
    /**
     * dateExpired Date
     */
    dateExpiredDate?: Date;
    /**
     * dateAccepted Date
     */
    dateAcceptedDate?: Date;
    /**
     * dateCompleted Date
     */
    dateCompletedDate?: Date;
}
