import { Add, ArrowBack, Delete, RotateLeft } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

export type InventoryBarProps = {
  inProgress: boolean;
  newInventory: () => void;
  resetInventory: () => void;
  deleteInventory: () => void;
};

const InventoryBar = (props: InventoryBarProps) => {
  const { inProgress, newInventory, resetInventory, deleteInventory } = props;
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <AppBar position="sticky" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <IconButton
          onClick={() => history.push("/")}
          color="inherit"
          aria-label={t("actions.navigation.gotoHome")}
        >
          <ArrowBack />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        {!inProgress && (
          <IconButton
            onClick={newInventory}
            color="inherit"
            aria-label={t("actions.inventory.new")}
          >
            <Add />
          </IconButton>
        )}
        {inProgress && (
          <>
            <IconButton
              onClick={resetInventory}
              color="inherit"
              aria-label={t("actions.inventory.reset")}
            >
              <RotateLeft />
            </IconButton>
            <IconButton
              onClick={deleteInventory}
              color="inherit"
              aria-label={t("actions.inventory.delete")}
            >
              <Delete />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default InventoryBar;
