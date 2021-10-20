import { Help, Info, Settings } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export type HelpMenuProps = {
  open: boolean;
  handleDrawerClose: () => void;
  handleNavigation: (route: string) => void;
  selectedPath?: string;
};

const HelpMenu = (props: HelpMenuProps) => {
  const { t } = useTranslation();
  const { open, handleDrawerClose, handleNavigation, selectedPath } = props;

  return (
    <Drawer
      sx={{ flexShrink: 0 }}
      anchor="bottom"
      open={open}
      onClose={handleDrawerClose}
    >
      <List>
        <ListItemButton
          onClick={() => handleNavigation("/help")}
          selected={selectedPath === "/help"}
        >
          <ListItemIcon>
            <Help color={selectedPath === "/help" ? "primary" : "inherit"} />
          </ListItemIcon>
          <ListItemText>{t("menu.help")}</ListItemText>
        </ListItemButton>
        <Divider variant="inset" component="li" />
        <ListItemButton
          onClick={() => handleNavigation("/about")}
          selected={selectedPath === "/about"}
        >
          <ListItemIcon>
            <Info color={selectedPath === "/about" ? "primary" : "inherit"} />
          </ListItemIcon>
          <ListItemText>{t("menu.about")}</ListItemText>
        </ListItemButton>
        <Divider variant="inset" component="li" />
        <ListItemButton
          onClick={() => handleNavigation("/settings")}
          selected={selectedPath === "/settings"}
        >
          <ListItemIcon>
            <Settings
              color={selectedPath === "/settings" ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText>{t("menu.settings")}</ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default HelpMenu;
