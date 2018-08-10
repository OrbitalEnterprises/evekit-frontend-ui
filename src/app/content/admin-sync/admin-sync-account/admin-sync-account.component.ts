import {Component, OnInit, ViewChild} from '@angular/core';
import {EndpointStatus} from './endpoint-status';
import {AccountV2Service, ESIEndpointSyncTracker, ESIRefEndpointSyncTracker} from '../../../platform-service-api';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {AdminSyncViewDialogComponent} from '../admin-sync-view-dialog/admin-sync-view-dialog.component';
import EndpointEnum = ESIEndpointSyncTracker.EndpointEnum;
import StatusEnum = ESIRefEndpointSyncTracker.StatusEnum;
import {DialogsService} from '../../../platform/dialogs.service';

const EndpointList = [
  EndpointEnum.CORPASSETS,
  EndpointEnum.CHARASSETS,
  EndpointEnum.CHARBOOKMARKS,
  EndpointEnum.CORPBOOKMARKS,
  EndpointEnum.CHARCONTRACTS,
  EndpointEnum.CORPCONTRACTS,
  EndpointEnum.CHARCONTACTS,
  EndpointEnum.CORPCONTACTS,
  EndpointEnum.CORPWALLETBALANCE,
  EndpointEnum.CHARWALLETBALANCE,
  EndpointEnum.CORPWALLETJOURNAL,
  EndpointEnum.CHARWALLETJOURNAL,
  EndpointEnum.CORPWALLETTRANSACTIONS,
  EndpointEnum.CHARWALLETTRANSACTIONS,
  EndpointEnum.CHARKILLMAIL,
  EndpointEnum.CORPKILLMAIL,
  EndpointEnum.CHARSTANDINGS,
  EndpointEnum.CORPSTANDINGS,
  EndpointEnum.CHARBLUEPRINTS,
  EndpointEnum.CORPBLUEPRINTS,
  EndpointEnum.CORPFACTIONWAR,
  EndpointEnum.CHARFACTIONWAR,
  EndpointEnum.CHARINDUSTRY,
  EndpointEnum.CORPINDUSTRY,
  EndpointEnum.CHARMINING,
  EndpointEnum.CORPMINING,
  EndpointEnum.CHARMARKET,
  EndpointEnum.CORPMARKET,
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
  EndpointEnum.CORPCONTAINERLOGS,
  EndpointEnum.CORPMEMBERSHIP,
  EndpointEnum.CORPDIVISIONS,
  EndpointEnum.CORPFACILITIES,
  EndpointEnum.CORPMEDALS,
  EndpointEnum.CORPSTARBASES,
  EndpointEnum.CORPSTRUCTURES,
  EndpointEnum.CORPTITLES,
  EndpointEnum.CORPTRACKMEMBERS,
  EndpointEnum.CHARFITTINGS,
  EndpointEnum.CHARFLEETS,
  EndpointEnum.CHARLOCATION,
  EndpointEnum.CHARSHIPTYPE,
  EndpointEnum.CHARONLINE,
  EndpointEnum.CHARLOYALTY,
  EndpointEnum.CHARMAIL,
  EndpointEnum.CHAROPPORTUNITIES,
  EndpointEnum.CHARPLANETS,
  EndpointEnum.CORPCUSTOMS,
  EndpointEnum.CHARSKILLQUEUE,
  EndpointEnum.CHARSKILLS,
  EndpointEnum.CORPSHAREHOLDERS,
  EndpointEnum.CHARSHEET,
  EndpointEnum.CORPSHEET
];

function translateEndpoint(ep: EndpointEnum): string {
  switch (ep) {
    case EndpointEnum.CORPASSETS:
      return 'Assets (Corp)';
    case EndpointEnum.CHARASSETS:
      return 'Assets (Char)';
    case EndpointEnum.CHARBOOKMARKS:
      return 'Bookmarks (Char)';
    case EndpointEnum.CORPBOOKMARKS:
      return 'Bookmarks (Corp)';
    case EndpointEnum.CHARCONTRACTS:
      return 'Contracts (Char)';
    case EndpointEnum.CORPCONTRACTS:
      return 'Contracts (Corp)';
    case EndpointEnum.CHARCONTACTS:
      return 'Contacts (Char)';
    case EndpointEnum.CORPCONTACTS:
      return 'Contacts (Corp)';
    case EndpointEnum.CORPWALLETBALANCE:
      return 'Wallet Balance (Corp)';
    case EndpointEnum.CHARWALLETBALANCE:
      return 'Wallet Balance (Char)';
    case EndpointEnum.CORPWALLETJOURNAL:
      return 'Wallet Journal (Corp)';
    case EndpointEnum.CHARWALLETJOURNAL:
      return 'Wallet Journal (Char)';
    case EndpointEnum.CORPWALLETTRANSACTIONS:
      return 'Wallet Transactions (Corp)';
    case EndpointEnum.CHARWALLETTRANSACTIONS:
      return 'Wallet Transactions (Char)';
    case EndpointEnum.CHARKILLMAIL:
      return 'Kill Mail (Char)';
    case EndpointEnum.CORPKILLMAIL:
      return 'Kill Mail (Corp)';
    case EndpointEnum.CHARSTANDINGS:
      return 'Standings (Char)';
    case EndpointEnum.CORPSTANDINGS:
      return 'Standings (Corp)';
    case EndpointEnum.CHARBLUEPRINTS:
      return 'Blueprints (Char)';
    case EndpointEnum.CORPBLUEPRINTS:
      return 'Blueprints (Corp)';
    case EndpointEnum.CORPFACTIONWAR:
      return 'Faction War (Corp)';
    case EndpointEnum.CHARFACTIONWAR:
      return 'Faction War (Char)';
    case EndpointEnum.CHARINDUSTRY:
      return 'Industry (Char)';
    case EndpointEnum.CORPINDUSTRY:
      return 'Industry (Corp)';
    case EndpointEnum.CHARMINING:
      return 'Mining (Char)';
    case EndpointEnum.CORPMINING:
      return 'Mining (Corp)';
    case EndpointEnum.CHARMARKET:
      return 'Market Orders (Char)';
    case EndpointEnum.CORPMARKET:
      return 'Market Orders (Corp)';
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

@Component({
  selector: 'app-admin-sync-account',
  templateUrl: './admin-sync-account.component.html',
  styleUrls: ['./admin-sync-account.component.css']
})
export class AdminSyncAccountComponent implements OnInit {
  displayedColumns: string[] = ['endpoint', 'active', 'delay', 'attempts', 'failures', 'actions'];
  endpointStats: Map<EndpointEnum, EndpointStatus> = new Map<EndpointEnum, EndpointStatus>();
  endpointData: EndpointStatus[] = [];
  endpointDataSource = new MatTableDataSource<EndpointStatus>(this.endpointData);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private accountService: AccountV2Service,
              private dialogService: DialogsService,
              private dialog: MatDialog) {
    for (const ec of EndpointList) {
      this.endpointStats.set(ec, new EndpointStatus(ec, translateEndpoint(ec)));
    }
    this.createDataList();
    this.updateStats();
  }

  ngOnInit() {
    this.endpointDataSource.sort = this.sort;
  }

  createDataList(): void {
    this.endpointData = [];
    for (const ec of EndpointList) {
      this.endpointData.push(this.endpointStats.get(ec));
    }
    this.endpointDataSource.data = this.endpointData;
  }

  createStatsTracker(): Map<EndpointEnum, EndpointStatus> {
    return new Map<EndpointEnum, EndpointStatus>();
  }

  ensureStatsEntry(ep: EndpointEnum, mp: Map<EndpointEnum, EndpointStatus>): EndpointStatus {
    if (!mp.has(ep)) {
      mp.set(ep, new EndpointStatus(ep, translateEndpoint(ep)));
    }
    return mp.get(ep);
  }

  updateStats(): void {
    this.updateActiveStats();
    this.updateHistoricStats();
  }

  formatDelay(val: EndpointStatus): string {
    let delay = val.delay;
    let delayUnits = 'sec';
    if (delay > 60) {
      delay = delay / 60;
      delayUnits = 'min';
    }
    if (delay > 60) {
      delay = delay / 60;
      delayUnits = 'hr';
    }
    return String(new Intl.NumberFormat('en-us',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(delay)) + ' ' + delayUnits;
  }

  updateActiveStats(): void {
    const updates = this.createStatsTracker();
    const oldest: Map<EndpointEnum, number> = new Map<EndpointEnum, number>();
    for (const ec of EndpointList) {
      this.ensureStatsEntry(ec, updates).active = 0;
      this.ensureStatsEntry(ec, updates).delay = 0;
    }
    this.accountService.requestStartedSync()
      .subscribe(
        sl => {
          for (const tr of sl) {
            updates.get(tr.endpoint).active += 1;
            if (!oldest.has(tr.endpoint) || tr.syncStart < oldest.get(tr.endpoint)) {
              oldest.set(tr.endpoint, tr.syncStart);
            }
          }
          const vals = updates.values();
          let next = vals.next();
          while (!next.done) {
            const ep = next.value;
            const statToUpdate = this.endpointStats.get(ep.endpoint);
            statToUpdate.active = ep.active;
            statToUpdate.delay = oldest.has(ep.endpoint) ? (Date.now() - oldest.get(ep.endpoint)) / 1000 : 0;
            next = vals.next();
          }
          this.createDataList();
        },
        err => {
          this.dialogService.makeWarnDialog('Failed to Retrieve Sync List',
            `Failed to retrieve sync list with error: ${err.errorMessage}.`);
        }
      );
  }

  updateHistoricStats(): void {
    const terminalTime = Date.now() - 24 * 60 * 60 * 1000;
    const stats = this.createStatsTracker();
    for (const ec of EndpointList) {
      this.ensureStatsEntry(ec, stats).attempts = 0;
      this.ensureStatsEntry(ec, stats).failures = 0;
    }
    this.updateHistoricHelper(terminalTime, stats);
  }

  updateHistoricHelper(terminal: number, stats: Map<EndpointEnum, EndpointStatus>, contid = -1, maxresults = 1000): void {
    this.accountService.requestSyncSiteHistory(contid, maxresults)
      .subscribe(
        rl => {
          let done = false;
          for (const nt of rl) {
            contid = nt.syncStart;
            if (contid < terminal) {
              done = true;
              break;
            }
            stats.get(nt.endpoint).attempts += 1;
            if (nt.status !== StatusEnum.FINISHED) {
              stats.get(nt.endpoint).failures += 1;
            }
          }
          if (!done) {
            setTimeout(() => {
              this.updateHistoricHelper(terminal, stats, contid);
            }, 0);
          } else {
            const vals = stats.values();
            let next = vals.next();
            while (!next.done) {
              const ep = next.value;
              const statToUpdate = this.endpointStats.get(ep.endpoint);
              statToUpdate.attempts = ep.attempts;
              statToUpdate.failures = ep.failures;
              next = vals.next();
            }
            this.createDataList();
          }
        },
        err => {
          this.dialogService.makeWarnDialog('Failed to Retrieve Sync Site History',
            `Failed to retrieve sync site history with error: ${err.errorMessage}.`);
        }
      );
  }

  showTrackers(el: EndpointEnum): void {
    const elName = translateEndpoint(el);
    this.dialog.open(AdminSyncViewDialogComponent,
      {
        data: {
          'endpoint': el,
          'endpointName': elName
        }
      }).afterClosed().subscribe(
      () => {
        this.updateStats();
      }
    );
  }

}
