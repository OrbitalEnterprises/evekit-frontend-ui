import {Action} from '@ngrx/store';

/**
 * EveKit version info state.
 */
export interface VersionInfo {
  version: string;
  buildDate: string;
}

// Default state
const defaultState: VersionInfo = {
  version: null,
  buildDate: null
};

// Action configuration
export const VERSION_SET_VERSION = 'VERSION_SET_VERSION';
export const VERSION_SET_BUILD = 'VERSION_SET_BUILD';

export class SetVersion implements Action {
  readonly type = VERSION_SET_VERSION;

  constructor(public payload: string) {}
}

export class SetBuild implements Action {
  readonly type = VERSION_SET_BUILD;

  constructor(public payload: string) {}
}

export type VersionActions = SetVersion | SetBuild;

// Reducer
export function versionReducer(state: VersionInfo = defaultState, action: VersionActions) {
  switch (action.type) {
    case VERSION_SET_VERSION:
      return {
        version: action.payload,
        buildDate: state.buildDate
      };

    case VERSION_SET_BUILD:
      return {
        version: state.version,
        buildDate: action.payload
      };

    default:
      return state;
  }
}
