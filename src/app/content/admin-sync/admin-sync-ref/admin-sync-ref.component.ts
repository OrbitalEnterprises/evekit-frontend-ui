import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {AccountService, AccountV2Service, ESIRefEndpointSyncTracker} from '../../../platform-service-api';
import {RefEndpointStatus} from './ref-endpoint-status';
import {extractRemoteErrorMsg} from '../../../platform/utilities';
import {DialogsService} from '../../../platform/dialogs.service';
import EndpointEnum = ESIRefEndpointSyncTracker.EndpointEnum;
import StatusEnum = ESIRefEndpointSyncTracker.StatusEnum;

const EndpointList = [
  EndpointEnum.SERVERSTATUS,
  EndpointEnum.ALLIANCE,
  EndpointEnum.SOVMAP,
  EndpointEnum.SOVCAMPAIGN,
  EndpointEnum.SOVSTRUCTURE,
  EndpointEnum.FWWARS,
  EndpointEnum.FWSTATS,
  EndpointEnum.FWSYSTEMS,
  EndpointEnum.FWFACTIONLEADERBOARD,
  EndpointEnum.FWCORPLEADERBOARD,
  EndpointEnum.FWCHARLEADERBOARD,
];

function translateEndpoint(ep: EndpointEnum): string {
  switch (ep) {
    case EndpointEnum.SERVERSTATUS:
      return 'Server Status';
    case EndpointEnum.ALLIANCE:
      return 'Alliances';
    case EndpointEnum.SOVMAP:
      return 'Sov Map';
    case EndpointEnum.SOVCAMPAIGN:
      return 'Sov Campaigns';
    case EndpointEnum.SOVSTRUCTURE:
      return 'Sov Structures';
    case EndpointEnum.FWWARS:
      return 'Fac Wars';
    case EndpointEnum.FWSTATS:
      return 'Fac War Stats';
    case EndpointEnum.FWSYSTEMS:
      return 'Fac War Systems';
    case EndpointEnum.FWFACTIONLEADERBOARD:
      return 'Fac War Faction Lbd';
    case EndpointEnum.FWCORPLEADERBOARD:
      return 'Fac War Corp Lbd';
    case EndpointEnum.FWCHARLEADERBOARD:
      return 'Fac War Char Lbd';
    default:
      return 'Unknown';
  }
}

@Component({
  selector: 'app-admin-sync-ref',
  templateUrl: './admin-sync-ref.component.html',
  styleUrls: ['./admin-sync-ref.component.css']
})
export class AdminSyncRefComponent implements OnInit {
  displayedColumns: string[] = ['endpoint', 'start', 'delay', 'tid', 'attempts', 'failures', 'actions'];
  endpointStats: Map<EndpointEnum, RefEndpointStatus> = new Map<EndpointEnum, RefEndpointStatus>();
  endpointData: RefEndpointStatus[] = [];
  endpointDataSource = new MatTableDataSource<RefEndpointStatus>(this.endpointData);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private accountService: AccountV2Service,
              private otherAccountService: AccountService,
              private dialog: DialogsService) {
    for (const ec of EndpointList) {
      this.endpointStats.set(ec, new RefEndpointStatus(ec, translateEndpoint(ec)));
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

  createStatsTracker(): Map<EndpointEnum, RefEndpointStatus> {
    return new Map<EndpointEnum, RefEndpointStatus>();
  }

  ensureStatsEntry(ep: EndpointEnum, mp: Map<EndpointEnum, RefEndpointStatus>): RefEndpointStatus {
    if (!mp.has(ep)) {
      mp.set(ep, new RefEndpointStatus(ep, translateEndpoint(ep)));
    }
    return mp.get(ep);
  }

  updateStats(): void {
    this.updateActiveStats();
    this.updateHistoricStats();
  }

  formatDelay(delay: number): string {
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
    for (const ec of EndpointList) {
      this.ensureStatsEntry(ec, updates).tracker = null;
    }
    this.accountService.requestStartedRefSync()
      .subscribe(
        sl => {
          for (const tr of sl) {
            const delay = (Date.now() - tr.syncStart) / 1000;
            updates.get(tr.endpoint).tracker = tr;
            updates.get(tr.endpoint).delay = delay;
          }
          const vals = updates.values();
          let next = vals.next();
          while (!next.done) {
            const ep = next.value;
            const statToUpdate = this.endpointStats.get(ep.endpoint);
            statToUpdate.tracker = ep.tracker;
            statToUpdate.delay = ep.delay;
            next = vals.next();
          }
          this.createDataList();
        },
        err => {
          this.dialog.makeWarnDialog('Failed to Retrieve Started Ref Sync List',
            `Failed to retrieve started ref sync list with error: ${err.errorMessage}.`);
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

  updateHistoricHelper(terminal: number, stats: Map<EndpointEnum, RefEndpointStatus>, contid = -1, maxresults = 1000): void {
    this.accountService.requestRefSyncHistory(contid, maxresults)
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
          this.dialog.makeWarnDialog('Failed to Retrieve Ref Sync History',
            `Failed to retrieve ref sync history with error: ${err.errorMessage}.`);
        }
      );
  }

  finishTracker(tracker: ESIRefEndpointSyncTracker): void {
    const tid = tracker.tid;
    this.accountService.requestFinishRefTracker(tid)
      .subscribe(
        () => {
          this.updateStats();
        },
        err => {
          this.dialog.makeWarnDialog(
            'Failed to Finish Reference Tracker',
            `Failed to finish tracker for TID: ${tid} with error: ${extractRemoteErrorMsg(err)}.`
          );
        }
      );
  }

}
