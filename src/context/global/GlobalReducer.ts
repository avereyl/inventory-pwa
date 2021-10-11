import log from "loglevel";
import { GlobalAction, GlobalActionType, GlobalState } from "./types";
import { initialState } from "./GlobalStore";
import {
  newStateWithCOCheckLinedBehavior,
  newStateWithDarkThemeMode,
  newStateWithHideCheckLinedBehavior,
  newStateWithLightThemeMode,
  newStateWithSetCheckLinedBehavior,
  newStateWithSetThemeMode,
  newStateWithSwitchedCheckLinedBehavior,
  newStateWithSwitchedThemeMode,
} from "./settingsServices";
import {
  newStateWithCompletedProgress,
  newStateWithResetProgress,
  newStateWithDeletedProgress,
  newStateWithStartedProgress,
  newStateWithToggledProgressLine,
  newStateWithSavedProgress,
} from "./progressServices";

const GlobalReducer = (state: GlobalState, action: GlobalAction): any => {
  log.debug(
    "ACTION CALLED: " + action.type + " with payload: " + action.payload
  );
  switch (action.type) {
    // settings related actions
    case GlobalActionType.SETTINGS_SET_DARK_THEME:
      return newStateWithDarkThemeMode(state);
    case GlobalActionType.SETTINGS_SET_LIGHT_THEME:
      return newStateWithLightThemeMode(state);
    case GlobalActionType.SETTINGS_TOGGLE_THEME_MODE:
      return newStateWithSwitchedThemeMode(state);
    case GlobalActionType.SETTINGS_SET_THEME:
      return newStateWithSetThemeMode(state, action.payload);
    case GlobalActionType.SETTINGS_CROSS_OUT_CHECKED_LINE:
      return newStateWithCOCheckLinedBehavior(state);
    case GlobalActionType.SETTINGS_HIDE_CHECKED_LINE:
      return newStateWithHideCheckLinedBehavior(state);
    case GlobalActionType.SETTINGS_SET_CHECKED_LINE_BEHAVIOR:
      return newStateWithSetCheckLinedBehavior(state, action.payload);
    case GlobalActionType.SETTINGS_TOGGLE_CHECKED_LINE_BEHAVIOR:
      return newStateWithSwitchedCheckLinedBehavior(state);
    // progress related actions
    case GlobalActionType.PROGRESS_START:
      return newStateWithStartedProgress(state, action.payload);
    case GlobalActionType.PROGRESS_COMPLETE:
      return newStateWithCompletedProgress(state, action.payload);
    case GlobalActionType.PROGRESS_RESET:
      return newStateWithResetProgress(state, action.payload);
    case GlobalActionType.PROGRESS_DELETE:
      return newStateWithDeletedProgress(state, action.payload);
    case GlobalActionType.PROGRESS_TOGGLE_LINE:
      return newStateWithToggledProgressLine(state, action.payload);
    case GlobalActionType.PROGRESS_SAVE:
      return newStateWithSavedProgress(state, action.payload);
    // state related actions

    case GlobalActionType.SET_PERSISTENCE:
      return {
        ...state,
        persistenceType: action.payload,
      };
    case GlobalActionType.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default GlobalReducer;
