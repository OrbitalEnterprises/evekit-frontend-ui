import {StoreModule} from '@ngrx/store';
import {UserAuthInfo, userAuthReducer} from './auth-model';
import {VersionInfo, versionReducer} from './version-model';
import {UserSettings, userSettingsReducer} from './user-settings-model';
import {SyncAccountInfo, syncAccountReducer} from './account-model';
import {SyncAccountAccessKeyInfo, syncAccountAccessKeyReducer} from './access-key-model';

export interface AppState {
  userAuth: UserAuthInfo;
  version: VersionInfo;
  userSettings: UserSettings;
  syncAccounts: SyncAccountInfo;
  accessKeys: SyncAccountAccessKeyInfo;
}

/**
 * Produce default model reducers for store.
 */
export const appStoreModel = StoreModule.forRoot({
  userAuth: userAuthReducer,
  version: versionReducer,
  userSettings: userSettingsReducer,
  syncAccounts: syncAccountReducer,
  accessKeys: syncAccountAccessKeyReducer
});
