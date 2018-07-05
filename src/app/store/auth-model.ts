import {EveKitUserAccount, EveKitUserAuthSource} from '../platform-service-api';
import {Action} from '@ngrx/store';

/**
 * User authentication info state.
 */
export interface UserAuthInfo {
  account: EveKitUserAccount;
  source: EveKitUserAuthSource;
  sourceList: Array<EveKitUserAuthSource>;
}

// Default state
const defaultState: UserAuthInfo = {
  account: null,
  source: null,
  sourceList: []
}

// Action configuration
export const AUTH_SET_USER = 'AUTH_SET_USER';
export const AUTH_SET_LAST_SOURCE = 'AUTH_SET_LAST_SOURCE';
export const AUTH_SET_SOURCES = 'AUTH_SET_SOURCES';
export const AUTH_CLEAR_USER = 'AUTH_CLEAR_USER';

export class SetUser implements Action {
  readonly type = AUTH_SET_USER;

  constructor(public payload: EveKitUserAccount) {}
}

export class SetLastSource implements Action {
  readonly type = AUTH_SET_LAST_SOURCE;

  constructor(public payload: EveKitUserAuthSource) {}
}

export class SetSources implements Action {
  readonly type = AUTH_SET_SOURCES;

  constructor(public payload: Array<EveKitUserAuthSource>) {}
}

export class ClearUser implements Action {
  readonly type = AUTH_CLEAR_USER;

  constructor() {}
}

export type UserAuthActions = SetUser | ClearUser | SetLastSource | SetSources;

// Reducer
export function userAuthReducer(state: UserAuthInfo = defaultState, action: UserAuthActions) {
  switch (action.type) {
    case AUTH_SET_USER:
      return {
        account: action.payload,
        source: state.source,
        sourceList: state.sourceList
      };

    case AUTH_SET_LAST_SOURCE:
      return {
        account: state.account,
        source: action.payload,
        sourceList: state.sourceList
      };

    case AUTH_SET_SOURCES:
      return {
        account: state.account,
        source: state.source,
        sourceList: action.payload
      };

    case AUTH_CLEAR_USER:
      return defaultState;

    default:
      return state;
  }
}
