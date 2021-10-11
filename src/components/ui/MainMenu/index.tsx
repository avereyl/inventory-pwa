import { Help, Info, Settings } from "@mui/icons-material";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

export type MainMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
};

const MainMenu = (props: MainMenuProps) => {
  const history = useHistory();

  const navigateTo = (path: string) => {
    history.push(path);
    open && handleClose();
  };

  const { t } = useTranslation();

  const { anchorEl, open, handleClose } = props;
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <MenuList>
        <MenuItem onClick={() => navigateTo("/help")}>
          <ListItemIcon>
            <Help fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("menu.help")}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigateTo("/about")}>
          <ListItemIcon>
            <Info fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("menu.about")}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigateTo("/settings")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("menu.settings")}</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MainMenu;
