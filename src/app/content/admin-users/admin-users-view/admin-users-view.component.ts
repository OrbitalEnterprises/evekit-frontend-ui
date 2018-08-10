import {Component} from '@angular/core';
import {AccountService, AdminService, AuthenticationService, EveKitUserAccount, EveKitUserAuthSource} from '../../../platform-service-api';
import {DialogsService} from '../../../platform/dialogs.service';
import {extractRemoteErrorMsg} from '../../../platform/utilities';
import {MatDialog} from '@angular/material';
import {AdminUsersViewAccountsDialogComponent} from '../admin-users-view-accounts-dialog/admin-users-view-accounts-dialog.component';

@Component({
  selector: 'app-admin-users-view',
  templateUrl: './admin-users-view.component.html',
  styleUrls: ['./admin-users-view.component.css']
})
export class AdminUsersViewComponent {
  displayedColumns: string[] = ['state', 'uid', 'name', 'signonDate', 'source', 'joinDate', 'options'];
  dataSource: EveKitUserAccount[] = [];
  userSourceMap: Map<number, EveKitUserAuthSource> = new Map<number, EveKitUserAuthSource>();
  activeUserCount = 0;
  activeSyncAccountCount = 0;
  disabledAccounts: Map<number, number> = new Map<number, number>();

  constructor(private accountService: AccountService,
              private adminService: AdminService,
              private authService: AuthenticationService,
              private dialog: MatDialog,
              private dialogService: DialogsService) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.dataSource = [];
    this.activeUserCount = 0;
    this.activeSyncAccountCount = 0;
    this.refreshDisabledAccounts();
    this.accountService.listUsers()
      .subscribe(
        ul => {
          this.dataSource = ul;
          for (const next of ul) {
            const uid = parseInt(next.uid, 10);
            if (next.active) {
              this.activeUserCount += 1;
            }
            this.accountService.getUserLastSource(uid)
              .subscribe(
                lastSource => {
                  if (lastSource !== null) {
                    this.userSourceMap.set(uid, lastSource);
                  }
                }
              );
            this.accountService.getSyncAccount(uid, -1)
              .subscribe(
                sl => {
                  for (const sa of sl) {
                    if (!this.disabledAccounts.has(uid) || this.disabledAccounts.get(uid) !== sa.aid) {
                      this.activeSyncAccountCount += 1;
                    }
                  }
                }
              );
          }
        },
        err => {
          this.dialogService.makeWarnDialog('Failed to Load User List',
            `Failed to load user list with error: ${err.errorMessage}.`);
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

  loginName(uid: string): string {
    const u = parseInt(uid, 10);
    if (this.userSourceMap.has(u)) {
      return this.userSourceMap.get(u).screenName;
    } else {
      return 'UKNOWN';
    }
  }

  loginSource(uid: string): string {
    const u = parseInt(uid, 10);
    if (this.userSourceMap.has(u)) {
      return this.userSourceMap.get(u).source;
    } else {
      return 'UKNOWN';
    }
  }

  loginDate(uid: string): number {
    const u = parseInt(uid, 10);
    if (this.userSourceMap.has(u)) {
      return this.userSourceMap.get(u).last;
    } else {
      return -1;
    }
  }

  deactivateUser(user: EveKitUserAccount) {
    const uid = parseInt(user.uid, 10);
    this.accountService.toggleActive(uid, false)
      .subscribe(
        () => {
          this.loadUsers();
        },
        err => {
          this.dialogService.makeWarnDialog('Deactivate User Failed',
            `Deactivate user failed with error message: ${extractRemoteErrorMsg(err)}`);
        }
      );
  }

  activateUser(user: EveKitUserAccount) {
    const uid = parseInt(user.uid, 10);
    this.accountService.toggleActive(uid, true)
      .subscribe(
        () => {
          this.loadUsers();
        },
        err => {
          this.dialogService.makeWarnDialog('Activate User Failed',
            `Activate user failed with error message: ${extractRemoteErrorMsg(err)}`);
        }
      );
  }

  becomeUser(user: EveKitUserAccount) {
    const uid = parseInt(user.uid, 10);
    this.authService.becomeUser(uid)
      .subscribe(
        () => {
          window.location.reload();
        },
        err => {
          this.dialogService.makeWarnDialog('Failed to Become User',
            `Failed to become UID: ${uid} with error message: ${extractRemoteErrorMsg(err)}`);
        }
      );
  }

  showSyncAccounts(user: EveKitUserAccount): void {
    const uid = parseInt(user.uid, 10);
    this.dialog.open(AdminUsersViewAccountsDialogComponent,
      {
        data: {
          'uid': uid,
          'name': this.loginName(user.uid)
        }
      }).afterClosed().subscribe(
      () => {
        this.loadUsers();
        this.refreshDisabledAccounts();
      }
    );
  }

}
