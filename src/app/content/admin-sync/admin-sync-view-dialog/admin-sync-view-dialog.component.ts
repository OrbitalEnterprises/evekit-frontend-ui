import {Component, Inject} from '@angular/core';
import {DialogsService} from '../../../platform/dialogs.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AccountService, AccountV2Service, ESIEndpointSyncTracker} from '../../../platform-service-api';
import EndpointEnum = ESIEndpointSyncTracker.EndpointEnum;
import {extractRemoteErrorMsg} from '../../../platform/utilities';

@Component({
  selector: 'app-admin-sync-view-dialog',
  templateUrl: './admin-sync-view-dialog.component.html',
  styleUrls: ['./admin-sync-view-dialog.component.css']
})
export class AdminSyncViewDialogComponent {
  displayedColumns: string[] = ['start', 'elapsed', 'uid', 'userName', 'aid', 'accountName', 'tid', 'actions'];
  endpoint: EndpointEnum;
  endpointName: string;
  trackerList: ESIEndpointSyncTracker[] = [];
  userNameMap: Map<string, string> = new Map<string, string>();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<AdminSyncViewDialogComponent>,
              private dialog: DialogsService,
              private otherAccountServer: AccountService,
              private accountService: AccountV2Service) {
    this.endpoint = data['endpoint'];
    this.endpointName = data['endpointName'];
    this.updateTrackers();
  }

  updateTrackers(): void {
    this.trackerList = [];
    this.accountService.requestStartedSync()
      .subscribe(
        sl => {
          const tl: ESIEndpointSyncTracker[] = [];
          for (const tr of sl) {
            if (tr.endpoint === this.endpoint) {
              tl.push(tr);
              this.resolveUser(tr.account.userAccount.uid);
            }
          }
          this.trackerList = tl;
        },
        err => {
          this.dialog.makeWarnDialog(
            'Failed to Load Trackers',
            `Failed to load trackers for endpoint ${this.endpointName}, please close this dialog and try again.` +
            `  Error: ${extractRemoteErrorMsg(err)}.`
          );
        }
      );
  }

  finishTracker(tracker: ESIEndpointSyncTracker): void {
    const uid = parseInt(tracker.account.userAccount.uid, 10);
    const aid = tracker.account.aid;
    const tid = tracker.tid;
    this.accountService.requestFinishTracker(uid, aid, tid)
      .subscribe(
        () => {
          this.updateTrackers();
        },
        err => {
          this.dialog.makeWarnDialog(
            'Failed to Finish Tracker',
            `Failed to finish tracker for UID: ${uid} AID: ${aid} TID: ${tid} with error: ${extractRemoteErrorMsg(err)}.`
          );
        }
      );
  }

  resolveUser(uid: string): void {
    if (this.userNameMap.has(uid)) {
      return;
    }
    this.otherAccountServer.getUserLastSource(parseInt(uid, 10))
      .subscribe(
        us => {
          this.userNameMap.set(uid, us.screenName);
        }
      );
  }

  computeElapsed(el: ESIEndpointSyncTracker): string {
    let elapsed = (Date.now() - el.syncStart) / 1000;
    let unit = 'sec';
    if (elapsed > 60) {
      elapsed /= 60;
      unit = 'min';
    }
    if (elapsed > 60) {
      elapsed /= 60;
      unit = 'hr';
    }
    return String(new Intl.NumberFormat('en-us',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(elapsed)) + ' ' + unit;
  }

  getUserName(el: ESIEndpointSyncTracker): string {
    if (this.userNameMap.has(el.account.userAccount.uid)) {
      return this.userNameMap.get(el.account.userAccount.uid);
    } else {
      return 'TBD';
    }
  }

  ok(): void {
    this.dialogRef.close();
  }

}
