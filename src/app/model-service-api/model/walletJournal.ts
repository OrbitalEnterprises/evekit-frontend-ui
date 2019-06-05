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
export interface WalletJournal { 
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
    division?: number;
    refID?: number;
    date?: number;
    refType?: string;
    firstPartyID?: number;
    secondPartyID?: number;
    argName1?: string;
    argID1?: number;
    amount?: number;
    balance?: number;
    reason?: string;
    taxReceiverID?: number;
    taxAmount?: number;
    contextID?: number;
    contextType?: string;
    description?: string;
    /**
     * lifeStart Date
     */
    lifeStartDate?: Date;
    /**
     * lifeEnd Date
     */
    lifeEndDate?: Date;
    /**
     * date Date
     */
    dateDate?: Date;
    /**
     * *DEPRECATED* accountKey
     */
    accountKey?: number;
    /**
     * *DEPRECATED* ownerID1
     */
    ownerID1?: number;
    /**
     * *DEPRECATED* ownerID2
     */
    ownerID2?: number;
}
