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


/**
 * User account
 */
export interface EveKitUserAccount {
    id?: number;
    disabled?: boolean;
    joinTime?: Date;
    lastSignOn?: Date;
    /**
     * Unique user ID
     */
    uid?: string;
    /**
     * True if user is active, false otherwise
     */
    active?: boolean;
    /**
     * Date (milliseconds UTC) when account was created
     */
    created?: number;
    /**
     * True if user is an admin, false otherwise
     */
    admin?: boolean;
    /**
     * Last time (milliseconds UTC) user logged in
     */
    last?: number;
}
