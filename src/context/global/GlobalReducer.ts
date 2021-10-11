import log from "loglevel";
import { GlobalAction, GlobalActionType, GlobalState } from "./types";
import { initialState } from "./GlobalStore";
import {
  newStateWithClearedProgress,
  newStateWithCOCheckLinedBehavior,
  newStateWithDarkThemeMode,
  newStateWithHideCheckLinedBehavior,
  newStateWithLightThemeMode,
  newStateWithSavedProgress,
  newStateWithSetCheckLinedBehavior,
  newStateWithSetThemeMode,
  newStateWithSwitchedCheckLinedBehavior,
  newStateWithSwitchedThemeMode,
} from "./services";


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

    case GlobalActionType.SAVE_PROGRESS_SUCCESS:
      return newStateWithSavedProgress(state, action.payload);
    case GlobalActionType.CLEAR_PROGRESS_SUCCESS:
      return newStateWithClearedProgress(state, action.payload);
    
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
