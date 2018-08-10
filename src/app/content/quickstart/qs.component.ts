import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AppState} from '../../store/store-model';
import {Store} from '@ngrx/store';
import {selectSyncAccounts, selectUserAccount, selectUserSource} from '../../platform/selectors';
import {MatDialog, MatVerticalStepper} from '@angular/material';
import {
  AccountService,
  CredentialService,
  EveKitUserAccount,
  EveKitUserAuthSource,
  SynchronizedAccountAccessKey,
  SynchronizedEveAccount
} from '../../platform-service-api';
import {deleteCookie, getCookie, QS_ACCOUNT_SELECTED, QS_MAIN_COOKIE_NAME, setCookie} from '../../platform/cookies';
import {Router} from '@angular/router';
import {CreateSyncAccountComponent} from '../../create-sync-account/create-sync-account/create-sync-account.component';
import {DialogsService} from '../../platform/dialogs.service';
import {EditEsiTokenDialogComponent} from '../../edit-esi-token/edit-esi-token-dialog/edit-esi-token-dialog.component';
import {EditAccessKeyDialogComponent} from '../../edit-access-key/edit-access-key-dialog/edit-access-key-dialog.component';

@Component({
  selector: 'app-qs',
  templateUrl: './qs.component.html',
  styleUrls: ['./qs.component.css',
    '../../platform/toolbar/auth/login/auth-buttons.css',
    '../../platform/toolbar/auth/login/toolbar-login.component.css']
})
export class QsComponent implements AfterViewInit {
  user: EveKitUserAccount = null;
  source: EveKitUserAuthSource = null;
  scopesAdded = false;
  @ViewChild(MatVerticalStepper)
  private stepperComponent: MatVerticalStepper;
  syncAccounts: SynchronizedEveAccount[] = [];
  selectedAccount: SynchronizedEveAccount = null;
  accessKeys: SynchronizedAccountAccessKey[] = [];
  selectedKey: SynchronizedAccountAccessKey = null;

  constructor(private store: Store<AppState>,
              private accountService: AccountService,
              private router: Router,
              private dialog: MatDialog,
              private dialogService: DialogsService,
              private credsService: CredentialService,
              private platDialogs: DialogsService) {
    // Collect logged in user
    this.store.select(selectUserAccount).subscribe(
      u => {
        this.user = u;
      },
      () => {
        this.user = null;
      }
    );
    // Collect logged in user sources
    this.store.select(selectUserSource).subscribe(
      u => {
        this.source = u;
      },
      () => {
        this.source = null;
      }
    );
    // Collect synchronized accounts
    this.store.select(selectSyncAccounts).subscribe(
      u => {
        this.syncAccounts = u;
        // If we've already selected an account, then pull it out
        const aid = getCookie(QS_ACCOUNT_SELECTED);
        if (aid !== '') {
          for (const i of this.syncAccounts) {
            if (i.aid === parseInt(aid, 10)) {
              this.selectAccount(i);
            }
          }
        }
      },
      () => {
        this.syncAccounts = [];
      }
    );

  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateStep(), 0);
  }

  updateStep(): void {
    // If not set yet, indicate we're on the fast path
    if (getCookie(QS_MAIN_COOKIE_NAME) === '') {
      setCookie(QS_MAIN_COOKIE_NAME, 'true', 1);
    }

    // Move past login if already logged in
    if (this.user !== null && this.stepperComponent.selectedIndex < 1) {
      this.stepperComponent.selectedIndex = 1;
    }

    // Move past account selection if already selected
    if (this.selectedAccount !== null && this.stepperComponent.selectedIndex < 2) {
      this.stepperComponent.selectedIndex = 2;
    }

    // Move past ESI token setting if already selected
    if (this.scopesAdded && this.stepperComponent.selectedIndex < 3) {
      this.stepperComponent.selectedIndex = 3;
    }

    // Move past data access key if already selected
    if (this.selectedKey !== null && this.stepperComponent.selectedIndex < 4) {
      this.stepperComponent.selectedIndex = 4;
    }

  }

  accountsDifferent(a: SynchronizedEveAccount, b: SynchronizedEveAccount): boolean {
    if (a === b) {
      return false;
    }
    if (a === null || b === null) {
      return true;
    }
    return !(a.aid === b.aid &&
      a.name === b.name &&
      a.markedForDelete === b.markedForDelete &&
      a.scopes === b.scopes &&
      a.valid === b.valid);
  }

  selectAccount(acct: SynchronizedEveAccount): void {
    const changed = this.accountsDifferent(acct, this.selectedAccount);
    this.selectedAccount = acct;
    setCookie(QS_ACCOUNT_SELECTED, String(acct.aid), 1);
    if (changed) {
      this.scopesAdded = false;
      this.selectedKey = null;
      this.fetchAccessKeys();
    }
    setTimeout(() => this.updateStep(), 0);
  }

  selectKey(key: SynchronizedAccountAccessKey): void {
    this.selectedKey = key;
    setTimeout(() => this.updateStep(), 0);
  }

  cancel(): void {
    deleteCookie(QS_MAIN_COOKIE_NAME);
    deleteCookie(QS_ACCOUNT_SELECTED);
    this.router.navigate(['/']);
  }

  finish(): void {
    // TODO: for third party apps, store the resulting choices before routing away
    this.cancel();
  }

  skipChangeScopes(): void {
    this.scopesAdded = true;
    setTimeout(() => this.updateStep(), 0);
  }

  fetchAccessKeys(): void {
    this.accessKeys = [];

    this.accountService.getAccessKey(-1, this.selectedAccount.aid, -1)
      .subscribe(keys => {
          this.accessKeys = keys;
        },
        () => {
          this.displayError('Unable to Load Access Keys',
            'Failed to retrieve access key list');
        }
      );
  }

  startAuth(tp: string): void {
    window.location.assign('/api/ws/v1/auth/login/' + tp);
  }

  logout(): void {
    window.location.assign('/api/ws/v1/auth/logout');
  }

  createSyncAccount(): void {
    this.dialog.open(CreateSyncAccountComponent)
      .afterClosed()
      .subscribe(
        result => {
          if (result !== null) {
            this.selectAccount(result);
          } else {
            this.displayError('Unable to Create New Sync Account',
              'Failed to create new sync account');
          }
        }
      );
  }

  sourceType(sourceName: string): string {
    switch (sourceName) {
      case 'eve':
        return 'EVE Online';
      case 'google':
        return 'Google';
      case 'twitter':
        return 'Twitter';
      default:
        return 'Unknown';
    }
  }

  reauthorizeESIToken(): void {
    // UI should normally prevent this, but just in case...
    if (this.selectedAccount.scopes === null || this.selectedAccount.scopes.length === 0) {
      return;
    }

    this.credsService.setESICredential(this.selectedAccount.aid, this.selectedAccount.scopes)
      .subscribe(
        () => {
          // Scope re-authorized, continue
          this.skipChangeScopes();
        },
        () => {
          // Error
          this.platDialogs.makeWarnDialog(`Reauthorize ESI Token Failed`,
            'Failed to reauthorize ESI token.  Please try again.  If this problem persists, please contact the administrator.');
        }
      );
  }

  openAddESITokenDialog(): void {
    this.dialog.open(EditEsiTokenDialogComponent,
      {
        data: {
          'editMode': 'Add',
          'account': this.selectedAccount
        }
      });
  }

  openEditESITokenDialog(): void {
    this.dialog.open(EditEsiTokenDialogComponent,
      {
        data: {
          'editMode': 'Edit',
          'account': this.selectedAccount
        }
      });
  }

  openCreateKeyDialog(): void {
    this.dialog.open(EditAccessKeyDialogComponent,
      {
        data: {
          'editMode': 'Add',
          'account': this.selectedAccount,
          'accessKeys': this.accessKeys
        }
      }).afterClosed().subscribe(
      result => {
        if (result !== null) {
          this.fetchAccessKeys();
          this.selectKey(result);
        }
      }
    );
  }

}
