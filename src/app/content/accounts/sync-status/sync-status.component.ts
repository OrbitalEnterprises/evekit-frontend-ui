import {Component, OnDestroy} from '@angular/core';
import {AccountV2Service, ESIEndpointSyncTracker, SynchronizedEveAccount} from '../../../platform-service-api';
import {Observable, Subscription} from 'rxjs';
import {AppState} from '../../../store/store-model';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {selectSyncAccounts} from '../../../platform/selectors';
import {map} from 'rxjs/operators';
import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {TrackerPair} from './tracker-pair';
import {getCharTypes, getCorpTypes, StatusElement} from './status-element';

@Component({
  selector: 'app-sync-status',
  templateUrl: './sync-status.component.html',
  styleUrls: ['./sync-status.component.css', '../accounts-view.component.css']
})
export class SyncStatusComponent implements OnDestroy {
  aid: Observable<number>;
  aidWatcher: Subscription = null;
  account: SynchronizedEveAccount = null;
  trackers: ESIEndpointSyncTracker[] = [];
  statusPairs: TrackerPair[] = [];
  lastSyncTracker: ESIEndpointSyncTracker = null;
  nextSyncTracker: ESIEndpointSyncTracker = null;

  // icons
  icSquare = faSquare;

  constructor(private routeInfo: ActivatedRoute,
              private store: Store<AppState>,
              private accountService: AccountV2Service) {

    // Setup tracking of account ID from params
    this.aid = this.routeInfo.paramMap.pipe(map(
      mm => {
        return parseInt(mm.get('aid'), 10);
      }
    ));

    // Watch the account when the aid changes, then reload everything
    // TODO: error handling
    this.aid.subscribe(
      aid => {
        if (this.account === null || aid !== this.account.aid) {
          // New aid, refresh everything.
          if (this.aidWatcher !== null) {
            this.aidWatcher.unsubscribe();
            this.aidWatcher = null;
          }
        }

        if (this.aidWatcher === null) {
          // Setup our aid watcher.  This subscription will observer every sync
          // account change and trigger reloads on appropriate actions.
          this.aidWatcher = this.store.select(selectSyncAccounts)
            .subscribe(
              acctList => {
                this.account = null;
                for (const acct of acctList) {
                  if (acct.aid === aid) {
                    this.account = acct;
                  }
                }
                if (this.account !== null) {
                  this.reloadInfo();
                }
              });
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.aidWatcher !== null) {
      this.aidWatcher.unsubscribe();
      this.aidWatcher = null;
    }
  }


  reloadInfo(): void {
    this.trackers = [];
    this.lastSyncTracker = null;
    this.nextSyncTracker = null;

    if (this.account !== null) {
      this.accountService.requestSyncHistory(this.account.aid, -1, 300)
        .subscribe(
          results => {
            this.trackers = results;
            this.assemblePairs();
          }
        );

      // Reload last and next sync tracker
      this.accountService.requestSyncHistory(this.account.aid, undefined, 1)
        .subscribe(
          trackers => {
            if (trackers.length > 0) {
              this.lastSyncTracker = trackers[0];
            } else {
              this.lastSyncTracker = null;
            }
          }
        );
      this.accountService.requestNextSync(this.account.aid)
        .subscribe(
          trackers => {
            if (trackers.length > 0) {
              this.nextSyncTracker = trackers[0];
            } else {
              this.nextSyncTracker = null;
            }
          }
        );

    }
  }

  assemblePairs(): void {
    this.statusPairs = [];

    // Map from endpoint name to status element
    const typeElements: Map<string, StatusElement> = new Map<string, StatusElement>();
    const sharedElements: Map<string, StatusElement> = new Map<string, StatusElement>();

    // Initialize to empty status for each endpoint
    const endpointList = this.account.characterType ? getCharTypes() : getCorpTypes();
    for (const endpoint of endpointList) {
      const tracker = {
        account: this.account,
        endpoint: endpoint,
        status: ESIEndpointSyncTracker.StatusEnum.NOTPROCESSED
      };
      const next = new StatusElement(tracker);
      const target = (next.isCharType() || next.isCorpType()) ? typeElements : sharedElements;
      target.set(next.name(), next);
    }

    // Allocate trackers to the appropriate time, preferring recent data over older data
    for (let i = this.trackers.length - 1; i >= 0; i--) {
      const next = new StatusElement(this.trackers[i]);
      if (next.isCharType() || next.isCorpType()) {
        typeElements.set(next.name(), next);
      } else {
        sharedElements.set(next.name(), next);
      }
    }

    // Sort endpoint names then create status pairs for rendering
    const typeKeys: string[] = [];
    const sharedKeys: string[] = [];
    typeElements.forEach((value, key) => {
      typeKeys.push(key);
    });
    sharedElements.forEach((value, key) => {
      sharedKeys.push(key);
    });
    typeKeys.sort();
    sharedKeys.sort();
    for (let a = 0, b = 0; a < typeKeys.length || b < sharedKeys.length; a++, b++) {
      const nextType = a < typeKeys.length ? typeElements.get(typeKeys[a]) : null;
      const nextShared = b < sharedKeys.length ? sharedElements.get(sharedKeys[b]) : null;
      this.statusPairs.push(new TrackerPair(nextType, nextShared));
    }
  }

}
