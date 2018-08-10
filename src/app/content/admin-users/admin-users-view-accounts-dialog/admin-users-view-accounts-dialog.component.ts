import {Component, Inject} from '@angular/core';
import {DialogsService} from '../../../platform/dialogs.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AccountService, AdminService, SynchronizedEveAccount} from '../../../platform-service-api';
import {extractRemoteErrorMsg} from '../../../platform/utilities';

@Component({
  selector: 'app-admin-users-view-accounts-dialog',
  templateUrl: './admin-users-view-accounts-dialog.component.html',
  styleUrls: ['./admin-users-view-accounts-dialog.component.css']
})
export class AdminUsersViewAccountsDialogComponent {
  uid = 0;
  name = null;
  disabledAccounts: Map<number, number> = new Map<number, number>();
  syncAccounts: SynchronizedEveAccount[] = [];
  displayedColumns: string[] = ['state', 'aid', 'name', 'type', 'lastSync', 'deleteTime', 'options'];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<AdminUsersViewAccountsDialogComponent>,
              private dialog: DialogsService,
              private adminService: AdminService,
              private acctService: AccountService) {
    this.uid = data['uid'];
    this.name = data['name'];
    this.loadAccounts();
    this.refreshDisabledAccounts();
  }

  loadAccounts(): void {
    this.syncAccounts = [];
    this.acctService.getSyncAccount(this.uid, -1)
      .subscribe(
        al => {
          this.syncAccounts = al;
        },
        err => {
          this.dialog.makeWarnDialog(
            'Failed to Load Sync Account List',
            `Failed to load sync account list for UID: ${this.uid} with error: ${extractRemoteErrorMsg(err)}.`
          );
        }
      );
  }

  refreshDisabledAccounts(): void {
    const regex = /^SyncAccount\.([0-9]+)\.([0-9]+)\.disabled/;
    this.disabledAccounts.clear();
    this.adminService.getSysProps()
      .subscribe(
        props => {
          for (const p of props) {
            if (regex.test(p.propertyName) && p.propertyValue === 'true') {
              const results = regex.exec(p.propertyName);
              const uid = parseInt(results[1], 10);
              const aid = parseInt(results[2], 10);
              this.disabledAccounts.set(uid, aid);
            }
          }
        }
      );
  }

  isDisabled(acct: SynchronizedEveAccount): boolean {
    return this.disabledAccounts.has(this.uid) && this.disabledAccounts.get(this.uid) === acct.aid;
  }

  ok(): void {
    this.dialogRef.close();
  }

  enable(acct: SynchronizedEveAccount): void {
    this.acctService.toggleAccountDisabled(this.uid, acct.aid, false)
      .subscribe(
        () => {
          this.loadAccounts();
          this.refreshDisabledAccounts();
        },
        err => {
          this.dialog.makeWarnDialog(
            'Failed to Enable Sync Account',
            `Failed to enable sync account AID: ${acct.aid} with error: ${extractRemoteErrorMsg(err)}.`
          );
        }
      );
  }

  disable(acct: SynchronizedEveAccount): void {
    this.acctService.toggleAccountDisabled(this.uid, acct.aid, true)
      .subscribe(
        () => {
          this.loadAccounts();
          this.refreshDisabledAccounts();
        },
        err => {
          this.dialog.makeWarnDialog(
            'Failed to Disable Sync Account',
            `Failed to disable sync account AID: ${acct.aid} with error: ${extractRemoteErrorMsg(err)}.`
          );
        }
      );
  }

}
