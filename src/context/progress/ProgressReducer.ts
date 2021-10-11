import log from "loglevel";
import {
  newStateWithCompletedProgress,
  newStateWithDeletedProgress,
  newStateWithLoadedProgress,
  newStateWithResetProgress,
  newStateWithSavedProgress,
  newStateWithStartedProgress,
  newStateWithToggledProgressLine,
} from "./services";
import { ProgressAction, ProgressActionType, ProgressState } from "./types";

const ProgressReducer = (
  state: ProgressState,
  action: ProgressAction
): ProgressState => {
  log.debug(
    "ACTION CALLED: " + action.type + " with payload: " + action.payload
  );
  switch (action.type) {
    case ProgressActionType.PROGRESS_START:
      return newStateWithStartedProgress(state, action.payload);
    case ProgressActionType.PROGRESS_RESET:
      return newStateWithResetProgress(state, action.payload);
    case ProgressActionType.PROGRESS_TOGGLE_LINE:
      return newStateWithToggledProgressLine(state, action.payload);
    case ProgressActionType.PROGRESS_DELETE:
      return newStateWithDeletedProgress(state, action.payload);
    case ProgressActionType.PROGRESS_COMPLETE://??
      return newStateWithCompletedProgress(state, action.payload);
    case ProgressActionType.PROGRESS_SAVE:
      return newStateWithSavedProgress(state, action.payload);
    case ProgressActionType.PROGRESS_LOAD:
      return newStateWithLoadedProgress(state, action.payload);
  }
};

export default ProgressReducer;
