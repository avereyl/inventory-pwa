import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
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
        {t("screens.inventory.labels.inventorySuccess")}
      </DialogTitle>
      <DialogContent dividers>
        {t("screens.inventory.messages.success", {
          locationName: location?.name || "???",
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          {t("commons.labels.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InventorySuccess;
