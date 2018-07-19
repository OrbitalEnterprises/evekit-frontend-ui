import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AppState} from '../../store/store-model';
import {Store} from '@ngrx/store';
import {selectSyncAccounts, selectUserAccount, selectUserSource} from '../../platform/selectors';
import {MatDialog, MatVerticalStepper} from '@angular/material';
import {
  AccountService,
  EveKitUserAccount,
  EveKitUserAuthSource,
  SynchronizedAccountAccessKey,
  SynchronizedEveAccount
} from '../../platform-service-api';
import {deleteCookie, getCookie, QS_MAIN_COOKIE_NAME, setCookie} from '../../platform/cookies';
import {Router} from '@angular/router';
import {CreateSyncAccountComponent} from '../../platform/menu/create-sync-account/create-sync-account.component';

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
              private dialog: MatDialog) {
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

  selectAccount(acct: SynchronizedEveAccount): void {
    const changed = acct !== this.selectedAccount;
    this.selectedAccount = acct;
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

    // TODO: handle errors
    this.accountService.getAccessKey(-1, this.selectedAccount.aid, -1)
      .subscribe(keys => {
        this.accessKeys = keys;
      });
  }

  startAuth(tp: string): void {
    window.location.assign('/api/ws/v1/auth/login/' + tp);
  }

  logout(): void {
    window.location.assign('/api/ws/v1/auth/logout');
  }

  createSyncAccount(): void {
    // TODO: handle error result
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

}
