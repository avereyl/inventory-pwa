import { CheckCircle } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { Location } from "../../../types/Location";

export type InventorySuccessProps = {
  open: boolean;
  onClose: () => void;
  location?: Location;
};

const InventorySuccess = (props: InventorySuccessProps) => {
  const { open, onClose, location } = props;
  const { t } = useTranslation();
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Box
          sx={{ display: "flex", flexWrap: "nowrap", alignItems: "baseline" }}
        >
          <CheckCircle sx={{ color: "success.main" }} />
          <Typography variant="h4" sx={{ flex: "1", textAlign: "center" }}>
            {t("screens.inventory.labels.inventorySuccess")}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {t("screens.inventory.messages.success", {
          locationName: location?.name || "???",
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus variant="contained">
          {t("commons.labels.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InventorySuccess;
