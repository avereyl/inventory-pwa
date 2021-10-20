import {
  createTheme,
  Theme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { useMemo } from "react";
import { useGlobalContext } from "../context/global/GlobalStore";
import { ThemeMode } from "../types/Themes";

const buildTheme = (themeMode: ThemeMode): Theme => {
  return createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
    },
  });
};

const ThemeProvider: React.FC = ({ children }) => {
  const { state } = useGlobalContext();
  // Retrieve the theme object by theme mode
  const theme = useMemo(
    () => buildTheme(state.userSettings.theme),
    [state.userSettings.theme]
  );

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
