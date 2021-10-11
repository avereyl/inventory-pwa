import { Dispatch } from "react";
import Progress from "../../types/Progress";
import { ThemeMode } from "../../types/Themes";

// as this object will be serialized as a string with JSON.stringify, do not includes methods but only data
export interface GlobalState {
  persistenceType: PersistenceType;
  userSettings: UserSettings;
  progresses: Progress[];
}

export type UserSettings = {
  theme: ThemeMode;
  checkedLineBehavior: CheckedLineBehavior;
};

export enum PersistenceType {
  SESSION_STORAGE = "sessionStorage",
  LOCAL_STORAGE = "localStorage",
  NONE = "none",
}

export enum CheckedLineBehavior {
  CROSS_OUT = "CROSS_OUT",
  HIDE = "HIDE",
}

export enum GlobalActionType {
  SETTINGS_SET_DARK_THEME = "SET_DARK_THEME",
  SETTINGS_SET_LIGHT_THEME = "SET_LIGHT_THEME",
  SETTINGS_TOGGLE_THEME_MODE = "TOGGLE_THEME_MODE",
  SETTINGS_SET_THEME = "SET_THEME",

  SETTINGS_CROSS_OUT_CHECKED_LINE = "CROSS_OUT_CHECKED_LINE",
  SETTINGS_HIDE_CHECKED_LINE = "HIDE_CHECKED_LINE",
  SETTINGS_SET_CHECKED_LINE_BEHAVIOR = "SET_CHECKED_LINE_BEHAVIOR",
  SETTINGS_TOGGLE_CHECKED_LINE_BEHAVIOR = "TOGGLE_CHECKED_LINE_BEHAVIOR",

  PROGRESS_START = "START",
  PROGRESS_COMPLETE = "COMPLETE",
  PROGRESS_RESET = "RESET",
  PROGRESS_DELETE = "DELETE",
  PROGRESS_TOGGLE_LINE = "TOGGLE_LINE",
  PROGRESS_SAVE = "SAVE",

  SET_PERSISTENCE = "SET_PERSISTENCE",
  RESET_STATE = "RESET_STATE",
}

export type GlobalAction = {
  type: GlobalActionType;
  payload?: any;
};

export type GlobalContextType = {
  state: GlobalState;
  dispatch: Dispatch<GlobalAction>;
};
