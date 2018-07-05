import {SynchronizedEveAccount} from '../platform-service-api';
import {Action} from '@ngrx/store';

/**
 * Synchronized account list.
 */
export interface SyncAccountInfo {
  syncAccounts: Array<SynchronizedEveAccount>;
}

// Default state
const defaultState: SyncAccountInfo = {
  syncAccounts: []
};

// Action configuration
export const SYNC_SET_ACCOUNTS = 'SYNC_SET_ACCOUNTS';
export const SYNC_CLEAR_ACCOUNTS = 'SYNC_CLEAR_ACCOUNTS';

export class SetSyncAccounts implements Action {
  readonly type = SYNC_SET_ACCOUNTS;

  constructor(public payload: SynchronizedEveAccount[]) {
  }
}

export class ClearSyncAccounts implements Action {
  readonly type = SYNC_CLEAR_ACCOUNTS;

  constructor() {
  }
}

export type SyncAccountActions = SetSyncAccounts | ClearSyncAccounts;

// Reducer
export function syncAccountReducer(state: SyncAccountInfo = defaultState, action: SyncAccountActions) {
  switch (action.type) {
    case SYNC_SET_ACCOUNTS:
      return {
        syncAccounts: action.payload
      };

    case SYNC_CLEAR_ACCOUNTS:
      return defaultState;

    default:
      return state;
  }
}
