import { HelpOutline, Home, MoreHoriz, MoreVert } from "@mui/icons-material";
import { AppBar as MuiAppBar, IconButton, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import inventories from "../../../data/inventories.json";
import Inventory from "../../../types/Inventory";
import { LocationType } from "../../../types/Location";
import MedipackFilled from "../icons/MedipackFilled";
import VSAVFilled from "../icons/VSAVFilled";
import MainMenu from "../MainMenu";

const iconMap: Map<LocationType, ReactNode> = new Map([
  [LocationType.MEDIPACK, <MedipackFilled />],
  [LocationType.VSAV, <VSAVFilled />],
]);

const AppBar = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const navigateTo = (path: string) => {
    history.push(path);
  };

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const mainMenuOpen = Boolean(menuAnchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const buildIconButton = (inventory: Inventory) => {
    const type = inventory.location.type
      ? inventory.location.type.toString()
      : "";
    return (
      <IconButton
        color="inherit"
        key={`button_${inventory.location.type}`}
        onClick={() => navigateTo("/check/" + type)}
        aria-label={t("actions.navigation.gotoInventory", {
          locationName: inventory.location.name,
        })}
      >
        {(inventory.location.type && iconMap.get(inventory.location.type)) || (
          <HelpOutline />
        )}
      </IconButton>
    );
  };

  return (
    <>
      <MuiAppBar
        position="sticky"
        color="primary"
        sx={{ top: "auto", bottom: 0 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => navigateTo("/")}
            aria-label={t("actions.navigation.gotoHome")}
          >
            <Home />
          </IconButton>

          {(inventories as Inventory[]).map((inv) => buildIconButton(inv))}

          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            aria-label="open menu"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={mainMenuOpen}
            onClick={handleMenuOpen}
          >
            {mainMenuOpen ? <MoreVert /> : <MoreHoriz />}
          </IconButton>
        </Toolbar>
      </MuiAppBar>
      <MainMenu
        anchorEl={menuAnchorEl}
        handleClose={handleMenuClose}
        open={mainMenuOpen}
      />
    </>
  );
};

export default AppBar;
