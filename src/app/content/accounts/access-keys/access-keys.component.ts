import {Component, OnDestroy} from '@angular/core';
import {AccountService, SynchronizedAccountAccessKey, SynchronizedEveAccount} from '../../../platform-service-api';
import {Observable, Subscription} from 'rxjs';
import {AppState} from '../../../store/store-model';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {selectSyncAccounts} from '../../../platform/selectors';
import {map} from 'rxjs/operators';
import {faCalendarAlt, faDoorOpen, faHistory, faKey, faShieldAlt, faUnlock} from '@fortawesome/free-solid-svg-icons';
import {SetSyncKeys} from '../../../store/access-key-model';
import {MatDialog} from '@angular/material';
import {EditAccessKeyDialogComponent} from './edit-access-key-dialog/edit-access-key-dialog.component';
import {refreshSyncAccounts} from '../../../platform/version/account-tools';
import {DialogsService} from '../../../platform/dialogs.service';
import {ViewPermissionsDialogComponent} from './view-permissions-dialog/view-permissions-dialog.component';

@Component({
  selector: 'app-access-keys',
  templateUrl: './access-keys.component.html',
  styleUrls: ['./access-keys.component.css', '../accounts-view.component.css']
})
export class AccessKeysComponent implements OnDestroy {
  aid: Observable<number>;
  aidWatcher: Subscription = null;
  account: SynchronizedEveAccount = null;
  accessKeys: SynchronizedAccountAccessKey[] = [];

  // icons
  icScopes = faShieldAlt;
  icExplore = faDoorOpen;
  icExpiry = faCalendarAlt;
  icLimit = faHistory;
  icKey = faKey;
  icCredential = faUnlock;

  constructor(private routeInfo: ActivatedRoute,
              private store: Store<AppState>,
              private accountService: AccountService,
              private dialog: MatDialog,
              private dialogService: DialogsService) {
    // Setup tracking of account ID from params
    this.aid = this.routeInfo.paramMap.pipe(map(
      mm => {
        return parseInt(mm.get('aid'), 10);
      }
    ));

    // Match the account when the aid changes, then reload everything
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
    this.accessKeys = [];

    this.accountService.getAccessKey(-1, this.account.aid, -1)
      .subscribe(keys => {
        this.accessKeys = keys;
        this.store.dispatch(new SetSyncKeys(keys));
      });
  }

  openCreateKeyDialog(): void {
    this.dialog.open(EditAccessKeyDialogComponent,
      {
        data: {
          'editMode': 'Add',
          'account': this.account,
          'accessKeys': this.accessKeys
        }
      });
  }

  openEditKeyDialog(key: SynchronizedAccountAccessKey): void {
    this.dialog.open(EditAccessKeyDialogComponent,
      {
        data: {
          'editMode': 'Edit',
          'account': this.account,
          'accessKeys': this.accessKeys,
          'currentKey': key
        }
      });
  }

  viewKeyDialog(key: SynchronizedAccountAccessKey): void {
    this.dialog.open(ViewPermissionsDialogComponent,
      {
        data: {
          'account': this.account,
          'key': key
        }
      });
  }

  removeKeyDialog(key: SynchronizedAccountAccessKey): void {
    // Confirm, then delete.
    const dialogRef = this.dialogService.makeConfirmDialog('Delete Access Key',
      `Are you sure you want to delete this access key?`);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountService.deleteAccessKey(-1, this.account.aid, key.kid)
          .subscribe(
            () => {
              // On success, force a reload of all sync accounts
              refreshSyncAccounts(this.account.userAccount, this.accountService, this.store);
            },
            () => {
              this.dialogService.makeWarnDialog('Delete Access Key Failed',
                'Failed to delete access key.  Please try again.  If this problem persists, please contact the administrator.')
                .afterClosed().subscribe();
            }
          );
      }
    });
  }

}
