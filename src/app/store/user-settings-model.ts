import {Action} from '@ngrx/store';

/**
 * Settings for current logged in user.
 */
export interface UserSettings {
  [key: string]: string;
}

// Default state
const defaultState: UserSettings = {};

// Action configuration
export const USER_SETTINGS_SET = 'USER_SETTINGS_SET';
export const USER_SETTINGS_CLEAR = 'USER_SETTINGS_CLEAR';

export class SetUserSetting implements Action {
  readonly type = USER_SETTINGS_SET;

  constructor(public key: string, public value: string) {
  }
}

export class ClearUserSetting implements Action {
  readonly type = USER_SETTINGS_CLEAR;

  constructor() {
  }
}

export type UserSettingsActions = SetUserSetting | ClearUserSetting;

// Reducer
export function userSettingsReducer(state: UserSettings = defaultState, action: UserSettingsActions) {
  switch (action.type) {
    case USER_SETTINGS_SET:
      const newObj = {...state};
      newObj[action.key] = (<SetUserSetting>action).value;
      return newObj;

    case USER_SETTINGS_CLEAR:
      return defaultState;

    default:
      return state;
  }
}
