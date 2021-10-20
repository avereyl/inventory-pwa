import { Add, ArrowBack, Delete, RotateLeft } from "@mui/icons-material";
import { AppBar, Fab, IconButton, Toolbar, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

export type InventoryBarProps = {
  inProgress: boolean;
  nbOfLinesChecked: number;
  nbOfLinesToCheck: number;
  onNewProgress: () => void;
  onResetProgress: () => void;
  onDeleteProgress: () => void;
};

const InventoryBar = (props: InventoryBarProps) => {
  const {
    inProgress,
    nbOfLinesChecked,
    nbOfLinesToCheck,
    onNewProgress,
    onResetProgress,
    onDeleteProgress,
  } = props;
  const history = useHistory();
  const { t } = useTranslation();

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  return (
    <AppBar
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
          onClick={() => history.push("/")}
          color="inherit"
          aria-label={t("actions.navigation.gotoHome")}
        >
          <ArrowBack />
        </IconButton>
        {!inProgress && (
          <StyledFab
            onClick={onNewProgress}
            color="primary"
            aria-label={t("actions.inventory.new")}
          >
            <Add />
          </StyledFab>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {inProgress && (
          <>
            <Typography>
              {`${nbOfLinesChecked} / ${nbOfLinesToCheck}`}
            </Typography>
            <IconButton
              onClick={onResetProgress}
              color="inherit"
              aria-label={t("actions.inventory.reset")}
            >
              <RotateLeft />
            </IconButton>
            <IconButton
              onClick={onDeleteProgress}
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

InventoryBar.defaultProps = {
  nbOfLinesChecked: 0,
  nbOfLinesToCheck: 0,
};

export default InventoryBar;
