import {AccountService, EveKitUserAccount} from '../../platform-service-api';
import {ClearSyncAccounts, SetSyncAccounts} from '../../store/account-model';
import {AppState} from '../../store/store-model';
import {Store} from '@ngrx/store';


export function refreshSyncAccounts(account: EveKitUserAccount, acctService: AccountService, store: Store<AppState>) {
  if (account !== null) {
    const uid = parseInt(account.uid, 10);
    const cb = acctService.getSyncAccount(uid, -1).subscribe(
      s => {
        store.dispatch(new SetSyncAccounts(s));
        cb.unsubscribe();
      },
      () => {
        store.dispatch(new ClearSyncAccounts());
        cb.unsubscribe();
      });
  } else {
    store.dispatch(new ClearSyncAccounts());
  }
}
