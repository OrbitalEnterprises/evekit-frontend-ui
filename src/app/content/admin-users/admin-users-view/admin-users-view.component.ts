import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountService, AdminService, AuthenticationService, EveKitUserAccount, EveKitUserAuthSource} from '../../../platform-service-api';
import {DialogsService} from '../../../platform/dialogs.service';
import {extractRemoteErrorMsg} from '../../../platform/utilities';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AdminUsersViewAccountsDialogComponent} from '../admin-users-view-accounts-dialog/admin-users-view-accounts-dialog.component';
import {formatDate} from '@angular/common';

class UserData {
  public admin: boolean;
  public active: boolean;
  public uid: string;
  public name: string;
  public signonDate: string;
  public loginSource: string;
  public joinDate: string;

  constructor(admin: boolean, active: boolean, uid: string, name: string, loginDate: string, loginSource: string, joinDate: string) {
    this.admin = admin;
    this.active = active;
    this.uid = uid;
    this.name = name;
    this.signonDate = loginDate;
    this.loginSource = loginSource;
    this.joinDate = joinDate;
  }
}

@Component({
  selector: 'app-admin-users-view',
  templateUrl: './admin-users-view.component.html',
  styleUrls: ['./admin-users-view.component.css']
})
export class AdminUsersViewComponent implements OnInit {
  displayedColumns: string[] = ['state', 'uid', 'name', 'signonDate', 'source', 'joinDate', 'options'];
  dataSource: UserData[] = [];
  userList: EveKitUserAccount[] = [];
  userSourceMap: Map<number, EveKitUserAuthSource> = new Map<number, EveKitUserAuthSource>();
  activeUserCount = 0;
  activeSyncAccountCount = 0;
  disabledAccounts: Map<number, number> = new Map<number, number>();
  usersDataSource = new MatTableDataSource<UserData>(this.dataSource);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private accountService: AccountService,
              private adminService: AdminService,
              private authService: AuthenticationService,
              private dialog: MatDialog,
              private dialogService: DialogsService) {
    this.loadUsers();
  }

  ngOnInit() {
    this.usersDataSource.sort = this.sort;
    this.usersDataSource.paginator = this.paginator;
  }

  makeItem(acct: EveKitUserAccount): UserData {
    const ld = this.loginDate(acct.uid) > -1 ? formatDate(this.loginDate(acct.uid),
      'yyyy-MM-dd HH:mm:ss', 'en-us', 'UTC') : '1970-01-01 00:00:00';
    const jd = acct.created > -1 ? formatDate(acct.created,
      'yyyy-MM-dd HH:mm:ss', 'en-us', 'UTC') : '1970-01-01 00:00:00';
    return new UserData(acct.admin, acct.active, acct.uid,
      this.loginName(acct.uid),
      ld,
      this.loginSource(acct.uid),
      jd
    );
  }

  refreshDataSource(): void {
    this.dataSource = [];
    for (const el of this.userList) {
      this.dataSource.push(this.makeItem(el));
    }
    this.usersDataSource.data = this.dataSource;
  }

  updateDisplayedUser(acct: EveKitUserAccount) {
    const newItem = this.makeItem(acct);
    for (let i = 0; i < this.dataSource.length; i++) {
      if (this.dataSource[i].uid === acct.uid) {
        this.dataSource[i] = newItem;
        this.usersDataSource.data = this.dataSource;
        return;
      }
    }
    this.refreshDataSource();
  }

  loadUsers(): void {
    this.dataSource = [];
    this.activeUserCount = 0;
    this.activeSyncAccountCount = 0;
    this.refreshDisabledAccounts();
    this.accountService.listUsers()
      .subscribe(
        ul => {
          this.userList = ul;
          this.refreshDataSource();
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
                    this.updateDisplayedUser(next);
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

  removeUser(user: EveKitUserAccount) {
    const uid = parseInt(user.uid, 10);
    this.dialogService.makeConfirmDialog('Verify Removal',
      `Really remove UID ${uid}?`)
      .afterClosed()
      .subscribe(
        result => {
          if (result) {
            this.authService.removeUser(uid).subscribe(
              () => {
                this.loadUsers();
              },
              err => {
                this.dialogService.makeWarnDialog('Remove User Failed',
                  `Remove user failed with error message: ${extractRemoteErrorMsg(err)}`);
              }
            );
          }
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
      });
  }

}
