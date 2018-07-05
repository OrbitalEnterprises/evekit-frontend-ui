import {ESIEndpointSyncTracker, ESIRefEndpointSyncTracker} from '../../../platform-service-api';
import EndpointEnum = ESIEndpointSyncTracker.EndpointEnum;
import StatusEnum = ESIEndpointSyncTracker.StatusEnum;
import {formatDate} from '@angular/common';

function translateEndpoint(ep: EndpointEnum): string {
  switch (ep) {
    case EndpointEnum.CORPASSETS:
    case EndpointEnum.CHARASSETS:
      return 'Assets';
    case EndpointEnum.CHARBOOKMARKS:
    case EndpointEnum.CORPBOOKMARKS:
      return 'Bookmarks';
    case EndpointEnum.CHARCONTRACTS:
    case EndpointEnum.CORPCONTRACTS:
      return 'Contracts';
    case EndpointEnum.CHARCONTACTS:
    case EndpointEnum.CORPCONTACTS:
      return 'Contacts';
    case EndpointEnum.CORPWALLETBALANCE:
    case EndpointEnum.CHARWALLETBALANCE:
      return 'Wallet Balance';
    case EndpointEnum.CORPWALLETJOURNAL:
    case EndpointEnum.CHARWALLETJOURNAL:
      return 'Wallet Journal';
    case EndpointEnum.CORPWALLETTRANSACTIONS:
    case EndpointEnum.CHARWALLETTRANSACTIONS:
      return 'Wallet Transactions';
    case EndpointEnum.CHARKILLMAIL:
    case EndpointEnum.CORPKILLMAIL:
      return 'Kill Mail';
    case EndpointEnum.CHARSTANDINGS:
    case EndpointEnum.CORPSTANDINGS:
      return 'Standings';
    case EndpointEnum.CHARBLUEPRINTS:
    case EndpointEnum.CORPBLUEPRINTS:
      return 'Blueprints';
    case EndpointEnum.CORPFACTIONWAR:
    case EndpointEnum.CHARFACTIONWAR:
      return 'Faction War';
    case EndpointEnum.CHARINDUSTRY:
    case EndpointEnum.CORPINDUSTRY:
      return 'Industry';
    case EndpointEnum.CHARMINING:
    case EndpointEnum.CORPMINING:
      return 'Mining';
    case EndpointEnum.CHARMARKET:
    case EndpointEnum.CORPMARKET:
      return 'Market Orders';
    case EndpointEnum.CHARCALENDAR:
      return 'Calendar';
    case EndpointEnum.CHARMEDALS:
      return 'Medals';
    case EndpointEnum.CHARAGENTS:
      return 'Research Agents';
    case EndpointEnum.CHARFATIGUE:
      return 'Fatigue';
    case EndpointEnum.CHARNOTIFICATIONS:
      return 'Notifications';
    case EndpointEnum.CHARCORPROLES:
      return 'Corporation Roles';
    case EndpointEnum.CHARTITLES:
      return 'Corporation Titles';
    case EndpointEnum.CHARCLONES:
      return 'Clones';
    case EndpointEnum.CHARIMPLANTS:
      return 'Implants';
    case EndpointEnum.CHARALLIANCECONTACTS:
      return 'Alliance Contacts';
    case EndpointEnum.CORPCONTAINERLOGS:
      return 'Container Logs';
    case EndpointEnum.CORPMEMBERSHIP:
      return 'Membership';
    case EndpointEnum.CORPDIVISIONS:
      return 'Divisions';
    case EndpointEnum.CORPFACILITIES:
      return 'Facilities';
    case EndpointEnum.CORPMEDALS:
      return 'Medals';
    case EndpointEnum.CORPSTARBASES:
      return 'Starbases';
    case EndpointEnum.CORPSTRUCTURES:
      return 'Structures';
    case EndpointEnum.CORPTITLES:
      return 'Titles';
    case EndpointEnum.CORPTRACKMEMBERS:
      return 'Member Tracking';
    case EndpointEnum.CHARFITTINGS:
      return 'Fittings';
    case EndpointEnum.CHARFLEETS:
      return 'Fleets';
    case EndpointEnum.CHARLOCATION:
      return 'Location';
    case EndpointEnum.CHARSHIPTYPE:
      return 'Ship Type';
    case EndpointEnum.CHARONLINE:
      return 'Online';
    case EndpointEnum.CHARLOYALTY:
      return 'Loyalty';
    case EndpointEnum.CHARMAIL:
      return 'Mail';
    case EndpointEnum.CHAROPPORTUNITIES:
      return 'Opportunities';
    case EndpointEnum.CHARPLANETS:
      return 'Planets';
    case EndpointEnum.CORPCUSTOMS:
      return 'Customs Offices';
    case EndpointEnum.CHARSKILLQUEUE:
      return 'Skill Queue';
    case EndpointEnum.CHARSKILLS:
      return 'Skills';
    case EndpointEnum.CORPSHAREHOLDERS:
      return 'Shareholders';
    case EndpointEnum.CHARSHEET:
      return 'Character Sheet';
    case EndpointEnum.CORPSHEET:
      return 'Corporation Sheet';
    default:
      return 'Unknown';
  }
}

function translateStatus(status: StatusEnum): string {
  switch (status) {
    case StatusEnum.NOTPROCESSED:
      return 'status-notprocessed';
    case StatusEnum.FINISHED:
      return 'status-ok';
    case StatusEnum.ERROR:
      return 'status-fail';
    case StatusEnum.WARNING:
    default:
      return 'status-warning';
  }
}

export function getCharTypes(): EndpointEnum[] {
  return [
    EndpointEnum.CHARCALENDAR,
    EndpointEnum.CHARMEDALS,
    EndpointEnum.CHARAGENTS,
    EndpointEnum.CHARFATIGUE,
    EndpointEnum.CHARNOTIFICATIONS,
    EndpointEnum.CHARCORPROLES,
    EndpointEnum.CHARTITLES,
    EndpointEnum.CHARCLONES,
    EndpointEnum.CHARIMPLANTS,
    EndpointEnum.CHARALLIANCECONTACTS,
    EndpointEnum.CHARFITTINGS,
    EndpointEnum.CHARFLEETS,
    EndpointEnum.CHARLOCATION,
    EndpointEnum.CHARSHIPTYPE,
    EndpointEnum.CHARONLINE,
    EndpointEnum.CHARLOYALTY,
    EndpointEnum.CHARMAIL,
    EndpointEnum.CHAROPPORTUNITIES,
    EndpointEnum.CHARPLANETS,
    EndpointEnum.CHARSKILLQUEUE,
    EndpointEnum.CHARSKILLS,
    EndpointEnum.CHARSHEET,
    EndpointEnum.CORPSHEET,
    EndpointEnum.CHARASSETS,
    EndpointEnum.CHARBOOKMARKS,
    EndpointEnum.CHARCONTRACTS,
    EndpointEnum.CHARCONTACTS,
    EndpointEnum.CHARWALLETBALANCE,
    EndpointEnum.CHARWALLETJOURNAL,
    EndpointEnum.CHARWALLETTRANSACTIONS,
    EndpointEnum.CHARKILLMAIL,
    EndpointEnum.CHARSTANDINGS,
    EndpointEnum.CHARBLUEPRINTS,
    EndpointEnum.CHARFACTIONWAR,
    EndpointEnum.CHARINDUSTRY,
    EndpointEnum.CHARMINING,
    EndpointEnum.CHARMARKET];
}

export function getCorpTypes(): EndpointEnum[] {
  return [
    EndpointEnum.CORPCONTAINERLOGS,
    EndpointEnum.CORPMEMBERSHIP,
    EndpointEnum.CORPDIVISIONS,
    EndpointEnum.CORPFACILITIES,
    EndpointEnum.CORPMEDALS,
    EndpointEnum.CORPSTARBASES,
    EndpointEnum.CORPSTRUCTURES,
    EndpointEnum.CORPTITLES,
    EndpointEnum.CORPTRACKMEMBERS,
    EndpointEnum.CORPCUSTOMS,
    EndpointEnum.CORPSHAREHOLDERS,
    EndpointEnum.CHARSHEET,
    EndpointEnum.CORPSHEET,
    EndpointEnum.CORPASSETS,
    EndpointEnum.CORPBOOKMARKS,
    EndpointEnum.CORPCONTRACTS,
    EndpointEnum.CORPCONTACTS,
    EndpointEnum.CORPWALLETBALANCE,
    EndpointEnum.CORPWALLETJOURNAL,
    EndpointEnum.CORPWALLETTRANSACTIONS,
    EndpointEnum.CORPKILLMAIL,
    EndpointEnum.CORPSTANDINGS,
    EndpointEnum.CORPBLUEPRINTS,
    EndpointEnum.CORPFACTIONWAR,
    EndpointEnum.CORPINDUSTRY,
    EndpointEnum.CORPMINING,
    EndpointEnum.CORPMARKET];
}

export class StatusElement {

  constructor(private tracker: ESIEndpointSyncTracker) {
  }

  name(): string {
    return translateEndpoint(this.tracker.endpoint);
  }

  status(): string {
    return translateStatus(this.tracker.status);
  }

  message(): string {
    if (this.tracker.status === ESIEndpointSyncTracker.StatusEnum.NOTPROCESSED) {
      return 'Not recently processed (ESI token missing scopes?)';
    }
    const dt = formatDate(this.tracker.syncEnd, 'yyyy-MM-dd HH:mm:ss', 'en', 'UTC');
    return this.tracker.detail + ' at ' + dt;
  }

  isCharType(): boolean {
    switch (this.tracker.endpoint) {
      case EndpointEnum.CHARCALENDAR:
      case EndpointEnum.CHARMEDALS:
      case EndpointEnum.CHARAGENTS:
      case EndpointEnum.CHARFATIGUE:
      case EndpointEnum.CHARNOTIFICATIONS:
      case EndpointEnum.CHARCORPROLES:
      case EndpointEnum.CHARTITLES:
      case EndpointEnum.CHARCLONES:
      case EndpointEnum.CHARIMPLANTS:
      case EndpointEnum.CHARALLIANCECONTACTS:
      case EndpointEnum.CHARFITTINGS:
      case EndpointEnum.CHARFLEETS:
      case EndpointEnum.CHARLOCATION:
      case EndpointEnum.CHARSHIPTYPE:
      case EndpointEnum.CHARONLINE:
      case EndpointEnum.CHARLOYALTY:
      case EndpointEnum.CHARMAIL:
      case EndpointEnum.CHAROPPORTUNITIES:
      case EndpointEnum.CHARPLANETS:
      case EndpointEnum.CHARSKILLQUEUE:
      case EndpointEnum.CHARSKILLS:
      case EndpointEnum.CHARSHEET:
      case EndpointEnum.CORPSHEET:
        return true;
      default:
        return false;
    }
  }

  isCorpType(): boolean {
    switch (this.tracker.endpoint) {
      case EndpointEnum.CORPCONTAINERLOGS:
      case EndpointEnum.CORPMEMBERSHIP:
      case EndpointEnum.CORPDIVISIONS:
      case EndpointEnum.CORPFACILITIES:
      case EndpointEnum.CORPMEDALS:
      case EndpointEnum.CORPSTARBASES:
      case EndpointEnum.CORPSTRUCTURES:
      case EndpointEnum.CORPTITLES:
      case EndpointEnum.CORPTRACKMEMBERS:
      case EndpointEnum.CORPCUSTOMS:
      case EndpointEnum.CORPSHAREHOLDERS:
      case EndpointEnum.CHARSHEET:
      case EndpointEnum.CORPSHEET:
        return true;
      default:
        return false;
    }
  }

  isCommon(): boolean {
    switch (this.tracker.endpoint) {
      case EndpointEnum.CORPASSETS:
      case EndpointEnum.CHARASSETS:
      case EndpointEnum.CHARBOOKMARKS:
      case EndpointEnum.CORPBOOKMARKS:
      case EndpointEnum.CHARCONTRACTS:
      case EndpointEnum.CORPCONTRACTS:
      case EndpointEnum.CHARCONTACTS:
      case EndpointEnum.CORPCONTACTS:
      case EndpointEnum.CORPWALLETBALANCE:
      case EndpointEnum.CHARWALLETBALANCE:
      case EndpointEnum.CORPWALLETJOURNAL:
      case EndpointEnum.CHARWALLETJOURNAL:
      case EndpointEnum.CORPWALLETTRANSACTIONS:
      case EndpointEnum.CHARWALLETTRANSACTIONS:
      case EndpointEnum.CHARKILLMAIL:
      case EndpointEnum.CORPKILLMAIL:
      case EndpointEnum.CHARSTANDINGS:
      case EndpointEnum.CORPSTANDINGS:
      case EndpointEnum.CHARBLUEPRINTS:
      case EndpointEnum.CORPBLUEPRINTS:
      case EndpointEnum.CORPFACTIONWAR:
      case EndpointEnum.CHARFACTIONWAR:
      case EndpointEnum.CHARINDUSTRY:
      case EndpointEnum.CORPINDUSTRY:
      case EndpointEnum.CHARMINING:
      case EndpointEnum.CORPMINING:
      case EndpointEnum.CHARMARKET:
      case EndpointEnum.CORPMARKET:
        return true;
      default:
        return false;
    }
  }
}
