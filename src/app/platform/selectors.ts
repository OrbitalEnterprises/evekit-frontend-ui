import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserAuthInfo} from '../store/auth-model';
import {SyncAccountInfo} from '../store/account-model';

// ngrx state selectors

export const selectUserAuthInfo = createFeatureSelector<UserAuthInfo>('userAuth');

export const selectSyncAccountInfo = createFeatureSelector<SyncAccountInfo>('syncAccounts');

export const selectUserAccount = createSelector(
  selectUserAuthInfo,
  (state: UserAuthInfo) => state.account
);

export const selectUserSource = createSelector(
  selectUserAuthInfo,
  (state: UserAuthInfo) => state.source
);

export const selectAuthSources = createSelector(
  selectUserAuthInfo,
  (state: UserAuthInfo) => state.sourceList
);

export const selectSyncAccounts = createSelector(
  selectSyncAccountInfo,
  (state: SyncAccountInfo) => state.syncAccounts
);
