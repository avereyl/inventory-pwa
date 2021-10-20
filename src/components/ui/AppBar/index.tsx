import { HelpOutline, MoreHoriz, MoreVert } from "@mui/icons-material";
import { AppBar as MuiAppBar, IconButton, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import inventories from "../../../data/inventories.json";
import Inventory from "../../../types/Inventory";
import { LocationType } from "../../../types/Location";
import Home from "../icons/Home";
import MedipackFilled from "../icons/MedipackFilled";
import VSAVFilled from "../icons/VSAVFilled";
import HelpMenu from "./HelpMenu";

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

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(history.location.pathname);

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };
  const handleMenuClose = () => {
    setMenuOpen(false);
  };
  const handleNavigation = (route: string) => {
    setSelectedRoute(route);
    history.push(route);
    menuOpen && handleMenuClose();
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
        sx={{
          top: "auto",
          bottom: 0,
          backgroundColor: "background.default",
          color: "text.primary",
        }}
      >
        <Toolbar>
          <IconButton
            color={selectedRoute === "/" ? "primary" : "inherit"}
            onClick={() => navigateTo("/")}
            aria-label={t("actions.navigation.gotoHome")}
          >
            <Home />
          </IconButton>

          {(inventories as Inventory[]).map((inv) => buildIconButton(inv))}

          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color={
              ["/help", "/about", "/settings"].find((s) => s === selectedRoute)
                ? "primary"
                : "inherit"
            }
            aria-label="open menu"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            onClick={handleMenuOpen}
          >
            {menuOpen ? <MoreVert /> : <MoreHoriz />}
          </IconButton>
        </Toolbar>
      </MuiAppBar>
      <HelpMenu
        handleDrawerClose={handleMenuClose}
        open={menuOpen}
        selectedPath={selectedRoute}
        handleNavigation={handleNavigation}
      />
    </>
  );
};

export default AppBar;
