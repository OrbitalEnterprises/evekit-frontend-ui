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


export interface DgmEffect {
    effectID?: number;
    effectName?: string;
    effectCategory?: number;
    preExpression?: number;
    postExpression?: number;
    description?: string;
    guid?: string;
    iconID?: number;
    durationAttributeID?: number;
    trackingSpeedAttributeID?: number;
    dischargeAttributeID?: number;
    rangeAttributeID?: number;
    falloffAttributeID?: number;
    disallowAutoRepeat?: boolean;
    published?: boolean;
    displayName?: string;
    rangeChance?: boolean;
    electronicChance?: boolean;
    propulsionChance?: boolean;
    distribution?: boolean;
    sfxName?: string;
    npcUsageChanceAttributeID?: number;
    npcActivationChanceAttributeID?: number;
    fittingUsageChanceAttributeID?: number;
    modifierInfo?: string;
    offensive?: boolean;
    assistance?: boolean;
    warpSafe?: boolean;
}
