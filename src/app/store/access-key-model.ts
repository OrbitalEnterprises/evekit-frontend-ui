import {SynchronizedAccountAccessKey, SynchronizedEveAccount} from '../platform-service-api';
import {Action} from '@ngrx/store';

/**
 * Synchronized account access key list.
 */
export interface SyncAccountAccessKeyInfo {
  accessKeys: Array<SynchronizedAccountAccessKey>;
}

// Default state
const defaultState: SyncAccountAccessKeyInfo = {
  accessKeys: []
};

// Action configuration
export const SYNC_SET_KEYS = 'SYNC_SET_KEYS';
export const SYNC_CLEAR_KEYS = 'SYNC_CLEAR_KEYS';

export class SetSyncKeys implements Action {
  readonly type = SYNC_SET_KEYS;

  constructor(public payload: SynchronizedAccountAccessKey[]) {
  }
}

export class ClearSyncKeys implements Action {
  readonly type = SYNC_CLEAR_KEYS;

  constructor() {
  }
}

export type SyncKeyActions = SetSyncKeys | ClearSyncKeys;

// Reducer
export function syncAccountAccessKeyReducer(state: SyncAccountAccessKeyInfo = defaultState, action: SyncKeyActions) {
  switch (action.type) {
    case SYNC_SET_KEYS:
      return {
        accessKeys: action.payload
      };

    case SYNC_CLEAR_KEYS:
      return defaultState;

    default:
      return state;
  }
}
