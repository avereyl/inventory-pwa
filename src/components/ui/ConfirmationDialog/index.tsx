import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ReactNode } from "react";

export type ConfirmationDialogProps = {
  title: string;
  icon?: ReactNode;
  confirmation: string;
  labelOK: string;
  labelCancel: string;

  onOK: () => void;
  onCancel: () => void;

  open: boolean;
  onClose: () => void;
};

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const {
    confirmation,
    open,
    onClose,
    onOK,
    onCancel,
    labelOK,
    labelCancel,
    title,
    icon,
  } = props;
  const handleClose = () => onClose();
  const handleCancel = () => onCancel();
  const handleOK = () => onOK();

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        {icon}
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{confirmation}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          {labelCancel}
        </Button>
        <Button onClick={handleOK}>{labelOK}</Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.defaultProps = {
  labelOK: "OK",
  labelCancel: "Cancel",
};

export default ConfirmationDialog;
