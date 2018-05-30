/* Sync Endpoints */
var RefSyncTrackerEndpoints = [
    "REF_SERVER_STATUS",
    "REF_ALLIANCE",
    "REF_SOV_MAP",
    "REF_SOV_CAMPAIGN",
    "REF_SOV_STRUCTURE",
    "REF_FW_WARS",
    "REF_FW_STATS",
    "REF_FW_SYSTEMS",
    "REF_FW_FACTION_LEADERBOARD",
    "REF_FW_CORP_LEADERBOARD",
    "REF_FW_CHAR_LEADERBOARD"
];

var AccountSyncTrackerEndpoints = [
    "CHAR_ASSETS",
    "CORP_ASSETS",
    "CHAR_BLUEPRINTS",
    "CORP_BLUEPRINTS",
    "CHAR_BOOKMARKS",
    "CORP_BOOKMARKS",
    "CHAR_CONTACTS",
    "CORP_CONTACTS",
    "CHAR_CONTRACTS",
    "CORP_CONTRACTS",
    "CHAR_FACTION_WAR",
    "CORP_FACTION_WAR",
    "CHAR_INDUSTRY",
    "CORP_INDUSTRY",
    "CHAR_KILL_MAIL",
    "CORP_KILL_MAIL",
    "CHAR_MARKET",
    "CORP_MARKET",
    "CHAR_MINING",
    "CORP_MINING",
    "CHAR_SHEET",
    "CORP_SHEET",
    "CHAR_STANDINGS",
    "CORP_STANDINGS",
    "CHAR_WALLET_BALANCE",
    "CORP_WALLET_BALANCE",
    "CHAR_WALLET_JOURNAL",
    "CORP_WALLET_JOURNAL",
    "CHAR_WALLET_TRANSACTIONS",
    "CORP_WALLET_TRANSACTIONS",

    "CHAR_AGENTS",
    "CHAR_CALENDAR",
    "CHAR_CLONES",
    "CHAR_CORP_ROLES",
    "CHAR_FATIGUE",
    "CHAR_FITTINGS",
    "CHAR_FLEETS",
    "CHAR_IMPLANTS",
    "CHAR_LOCATION",
    "CHAR_LOYALTY",
    "CHAR_MAIL",
    "CHAR_MEDALS",
    "CHAR_NOTIFICATIONS",
    "CHAR_ONLINE",
    "CHAR_OPPORTUNITIES",
    "CHAR_PLANETS",
    "CHAR_SHIP_TYPE",
    "CHAR_SKILL_QUEUE",
    "CHAR_SKILLS",
    "CHAR_TITLES",

    "CORP_ALLIANCE_CONTACTS",
    "CORP_CONTAINER_LOGS",
    "CORP_CUSTOMS",
    "CORP_DIVISIONS",
    "CORP_FACILITIES",
    "CORP_MEDALS",
    "CORP_MEMBERSHIP",
    "CORP_SHAREHOLDERS",
    "CORP_STARBASES",
    "CORP_STRUCTURES",
    "CORP_TITLES",
    "CORP_TRACK_MEMBERS"
];

/* Sync Tracker Services */
(function() {
var trackerWS = angular.module('eveKitTrackerWS', ['eveKitRemoteServices']);

/**
 * Service to provide access to sync history
 */
trackerWS.factory('TrackerWSService', ['SwaggerService',
  function(SwaggerService) {
    return {
      'getAccountHistory' : function(aid, contid, maxresults) {
        return SwaggerService.getSwagger()
        .then(function (swg) {
          var args = {aid: aid};
          if (contid) args['contid'] = contid;
          if (maxresults) args['maxresults'] = maxresults;
          return swg.AccountV2.requestSyncHistory(args, {})
          .then(function(result) {
            return result.obj;
          }).catch(handleRemoteResponse);
        });
      },
      'getRefHistory' : function(contid, maxresults) {
        return SwaggerService.getSwagger()
        .then(function (swg) {
          var args = {};
          if (contid) args['contid'] = contid;
          if (maxresults) args['maxresults'] = maxresults;
          return swg.AccountV2.requestRefSyncHistory(args, {})
          .then(function(result) {
            return result.obj;
          }).catch(handleRemoteResponse);
        });
      },
      'getAccountStartedSync' : function() {
        return SwaggerService.getSwagger()
        .then(function (swg) {
          return swg.AccountV2.requestStartedSync({}, {})
          .then(function(result) {
            return result.obj;
          }).catch(handleRemoteResponse);
        });
      },
      'getRefStartedSync' : function() {
        return SwaggerService.getSwagger()
        .then(function (swg) {
          return swg.AccountV2.requestStartedRefSync({}, {})
          .then(function(result) {
            return result.obj;
          }).catch(handleRemoteResponse);
        });
      },
      'finishTracker' : function(uid, aid, tid) {
        return SwaggerService.getSwagger()
        .then(function (swg) {
          return swg.AccountV2.requestFinishTracker({uid: uid, aid: aid, tid: tid}, {})
          .then(function() {
            return true;
          }).catch(handleRemoteResponse);
        });
      },
      'finishRefTracker' : function(tid) {
        return SwaggerService.getSwagger()
        .then(function (swg) {
          return swg.AccountV2.requestFinishRefTracker({tid: tid}, {})
          .then(function() {
            return true;
          }).catch(handleRemoteResponse);
        });
      }
    };
 }]);


})();
