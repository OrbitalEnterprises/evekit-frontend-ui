import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AppState} from '../../store/store-model';
import {Store} from '@ngrx/store';
import {selectSyncAccounts, selectUserAccount, selectUserSource} from '../../platform/selectors';
import {MatDialog, MatVerticalStepper} from '@angular/material';
import {
  AccountService,
  AdminService,
  CredentialService,
  EveKitUserAccount,
  EveKitUserAuthSource,
  SynchronizedAccountAccessKey,
  SynchronizedEveAccount
} from '../../platform-service-api';
import {deleteCookie, getCookie, QS_ACCOUNT_SELECTED, QS_MAIN_COOKIE_NAME, QS_REQUEST_ID, setCookie} from '../../platform/cookies';
import {ActivatedRoute, Params, Router} from '@angular/router';
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
  requestID = -1;
  requestor: string = null;

  constructor(private store: Store<AppState>,
              private accountService: AccountService,
              private adminService: AdminService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private dialog: MatDialog,
              private dialogService: DialogsService,
              private credsService: CredentialService,
              private platDialogs: DialogsService) {
    // Check whether there is a request associated with this quickstart
    const existingReqID = getCookie(QS_REQUEST_ID);
    if (existingReqID !== '') {
      // Any cookie based request ID takes precendence
      this.requestID = parseInt(existingReqID, 10);
      this.retrieveRequestor();
    } else {
      // If no cookie set, then check for a param
      this.activeRoute.queryParams.subscribe((params: Params) => {
        const reqID = params['id'];
        if (undefined !== reqID) {
          this.requestID = parseInt(reqID, 10);
          setCookie(QS_REQUEST_ID, String(reqID), 1);
          this.retrieveRequestor();
        }
      });
    }
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

  retrieveRequestor(): void {
    this.adminService.quickStartSelectionRequestor(this.requestID).subscribe(
      name => {
        this.requestor = name.requestor;
      },
      msg => {
        console.log(msg);
        this.dialogService.makeWarnDialog('Quickstart Request Error',
          'Failed to retrieve name of quickstart requestor.  ' +
          'The third party application making this request may not be able to retrieve ' +
          'your selection. You may wish to cancel and restart from the third party application.');
        this.requestID = -1;
        deleteCookie(QS_REQUEST_ID);
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
    deleteCookie(QS_REQUEST_ID);
    this.router.navigate(['/']);
  }

  finish(): void {
    if (this.requestID > 0) {
      if (this.selectedKey === null) {
        const dialogRef = this.dialogService.makeConfirmDialog('Third Party Requesting Access Key',
          'A third party is expecting you to select a valid access key but it ' +
          'appears you have not done so.  If you continue without selecting a key, ' +
          'then the requesting third party application may experience an error. ' +
          'Do you wish to continue anyway?');
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.cancel();
          }
        });
      } else {
        // Save selected credentials.
        this.adminService.storeQuickStartSelection(this.requestID, this.selectedKey.accessKey, this.selectedKey.credential)
          .subscribe(
            () => {
              this.cancel();
            },
            () => {
              // Error
              this.platDialogs.makeWarnDialog(`Storing Key Selection Failed`,
                'Failed to store your access key selection.  This may cause the third party application awaiting your' +
                'selection to fail.  Please cancel and initiate the selection process again from your third party application. ' +
                'If this problem persists, please contact the administrator.');
            }
          );
      }
      // Let dialogs decide whether to really cancel.
      return;
    }
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
          this.dialogService.displayGenericUserError('Unable to Load Access Keys',
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
