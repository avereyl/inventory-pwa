import { ColorLens, Delete, StrikethroughS } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../../context/global/GlobalStore";
import {
  CheckedLineBehavior,
  GlobalActionType,
} from "../../context/global/types";
import LayoutDecorator from "../../decorator/LayoutDecorator";
import ThemeModeSwitcher from "../../theme/ThemeModeSwitcher";
import { ThemeMode } from "../../types/Themes";

const SettingsView = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useGlobalContext();
  const handleThemeModeSwitch = () => {
    dispatch({ type: GlobalActionType.SETTINGS_TOGGLE_THEME_MODE });
  };
  const handleCheckedLineBehavior = () => {
    dispatch({ type: GlobalActionType.SETTINGS_TOGGLE_CHECKED_LINE_BEHAVIOR });
  };
  const handleReset = () => {
    dispatch({ type: GlobalActionType.RESET_STATE });
  };

  return (
    <LayoutDecorator>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          maxWidth: "700px",
          width: 1,
          margin: "1rem 1rem 0 1rem",
        }}
      >
        <Typography variant="h4" component="h2" mb={1}>
          {t("screens.settings.title")}
        </Typography>

        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ColorLens />
              </Avatar>
            </ListItemAvatar>

            <Box>
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                {t("screens.settings.labels.themeMode")}
              </Typography>

              <ThemeModeSwitcher
                darkMode={state.userSettings.theme === ThemeMode.DARK}
                onChange={handleThemeModeSwitch}
                darkModeLabel={t("commons.themeMode.dark")}
                lightModeLabel={t("commons.themeMode.light")}
              />
            </Box>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <StrikethroughS />
              </Avatar>
            </ListItemAvatar>
            <Box>
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                {t("screens.settings.labels.display")}
              </Typography>

              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        state.userSettings.checkedLineBehavior ===
                        CheckedLineBehavior.HIDE
                      }
                      onChange={handleCheckedLineBehavior}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label={t("actions.settings.hideCheckedLines")}
                />
              </FormGroup>
            </Box>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Delete />
              </Avatar>
            </ListItemAvatar>
            <Box>
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                {t("screens.settings.labels.reset")}
              </Typography>

              <>
                <Typography>{t("actions.settings.deleteData")}</Typography>
                <Button variant="contained" color="error" onClick={handleReset}>
                  {t("commons.labels.erase")}
                </Button>
              </>
            </Box>
          </ListItem>
        </List>
      </Box>
    </LayoutDecorator>
  );
};

export default SettingsView;
