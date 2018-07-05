import {Component} from '@angular/core';
import {AppState} from '../../../store/store-model';
import {Store} from '@ngrx/store';
import {AccountService, EveKitUserAccount, EveKitUserAuthSource} from '../../../platform-service-api';
import {ClearUser, SetLastSource, SetSources, SetUser} from '../../../store/auth-model';
import {Observable} from 'rxjs';
import {selectUserAccount, selectUserSource} from '../../selectors';
import {ClearSyncAccounts, SetSyncAccounts} from '../../../store/account-model';
import {refreshSyncAccounts} from '../../version/account-tools';

const REFRESH_INTERVAL_MIN = 2;

@Component({
  selector: 'app-toolbar-auth',
  templateUrl: './toolbar-auth.component.html',
  styleUrls: ['./toolbar-auth.component.css']
})
export class ToolbarAuthComponent {
  user$: Observable<EveKitUserAccount>;
  source$: Observable<EveKitUserAuthSource>;
  loggedIn: boolean;

  constructor(private store: Store<AppState>, private acctService: AccountService) {
    // Observe changes to user and source
    this.user$ = store.select(selectUserAccount);
    this.source$ = store.select(selectUserSource);

    // Maintain loggedIn variable to control display
    this.user$.subscribe(
      u => {
        this.loggedIn = u != null;
        this.refreshLastSource(u);
        this.refreshAuthSources(u);
        this.updateSyncAccounts(u);
      },
      () => {
        this.loggedIn = false;
      }
    );

    // Perform initial credential refresh
    this.refreshCredentials();

    // Refresh our credentials every few minutes
    setInterval(() => {
      this.refreshCredentials();
    }, REFRESH_INTERVAL_MIN * 60000);
  }

  private refreshCredentials() {
    const cb = this.acctService.getUser().subscribe(
      u => {
        if (u == null) {
          this.store.dispatch(new ClearUser());
        } else {
          this.store.dispatch(new SetUser(u));
        }
        cb.unsubscribe();
      },
      () => {
        this.store.dispatch(new ClearUser());
        cb.unsubscribe();
      }
    );
  }

  private refreshLastSource(account: EveKitUserAccount) {
    if (account !== null) {
      const uid = parseInt(account.uid, 10);
      const cb = this.acctService.getUserLastSource(uid).subscribe(
        s => {
          this.store.dispatch(new SetLastSource(s));
          cb.unsubscribe();
        },
        () => {
          this.store.dispatch(new ClearUser());
          cb.unsubscribe();
        });
    }
  }

  private refreshAuthSources(account: EveKitUserAccount) {
    if (account !== null) {
      const uid = parseInt(account.uid, 10);
      const cb = this.acctService.getUserSources(uid).subscribe(
        s => {
          this.store.dispatch(new SetSources(s));
          cb.unsubscribe();
        },
        () => {
          this.store.dispatch(new ClearUser());
          cb.unsubscribe();
        });
    }
  }

  private updateSyncAccounts(account: EveKitUserAccount) {
    refreshSyncAccounts(account, this.acctService, this.store);
  }

}
