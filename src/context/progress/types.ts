import { Dispatch } from "react";
import Progress from "../../types/Progress";


// as this object may be serialized as a string with JSON.stringify, do not includes methods but only data
export interface ProgressState {
  progresses: Progress[];
}

export enum ProgressActionType {
  PROGRESS_START = "START",
  PROGRESS_COMPLETE = "COMPLETE",
  PROGRESS_RESET = "RESET",
  PROGRESS_DELETE = "DELETE",
  PROGRESS_TOGGLE_LINE = "TOGGLE_LINE",
  PROGRESS_SAVE = "SAVE",
  PROGRESS_LOAD = "LOAD"
}

export type ProgressAction = {
  type: ProgressActionType;
  payload?: any;
};

export type ProgressContextType = {
  state: ProgressState;
  dispatch: Dispatch<ProgressAction>;
};
