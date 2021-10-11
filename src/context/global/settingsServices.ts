import { ThemeMode } from "../../types/Themes";
import { CheckedLineBehavior, GlobalState } from "./types";

export const newStateWithDarkThemeMode = (state: GlobalState): GlobalState => {
  return {
    ...state,
    userSettings: { ...state.userSettings, theme: ThemeMode.DARK },
  };
};

export const newStateWithLightThemeMode = (state: GlobalState): GlobalState => {
  return {
    ...state,
    userSettings: { ...state.userSettings, theme: ThemeMode.DARK },
  };
};
export const newStateWithSwitchedThemeMode = (
  state: GlobalState
): GlobalState => {
  return {
    ...state,
    userSettings: {
      ...state.userSettings,
      theme:
        state.userSettings.theme === ThemeMode.DARK
          ? ThemeMode.LIGHT
          : ThemeMode.DARK,
    },
  };
};
export const newStateWithSetThemeMode = (
  state: GlobalState,
  theme: ThemeMode
): GlobalState => {
  return {
    ...state,
    userSettings: { ...state.userSettings, theme: theme },
  };
};

export const newStateWithCOCheckLinedBehavior = (
  state: GlobalState
): GlobalState => {
  return {
    ...state,
    userSettings: {
      ...state.userSettings,
      checkedLineBehavior: CheckedLineBehavior.CROSS_OUT,
    },
  };
};
export const newStateWithHideCheckLinedBehavior = (
  state: GlobalState
): GlobalState => {
  return {
    ...state,
    userSettings: {
      ...state.userSettings,
      checkedLineBehavior: CheckedLineBehavior.HIDE,
    },
  };
};

export const newStateWithSetCheckLinedBehavior = (
  state: GlobalState,
  behavior: CheckedLineBehavior
): GlobalState => {
  return {
    ...state,
    userSettings: {
      ...state.userSettings,
      checkedLineBehavior: behavior,
    },
  };
};
export const newStateWithSwitchedCheckLinedBehavior = (
  state: GlobalState
): GlobalState => {
  return {
    ...state,
    userSettings: {
      ...state.userSettings,
      checkedLineBehavior:
        state.userSettings.checkedLineBehavior === CheckedLineBehavior.CROSS_OUT
          ? CheckedLineBehavior.HIDE
          : CheckedLineBehavior.CROSS_OUT,
    },
  };
};
