import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ProgressStatus } from "../../../types/Progress";
import { Supply } from "../../../types/Supply";

export type InventoryLineProps = {
  status: ProgressStatus;
  supply: Supply;
  checked: boolean;
  keyPrefix: string;
  level?: number;
  onClick: () => void;
};

const InventoryLine = (props: InventoryLineProps) => {
  const { supply, level, keyPrefix, onClick, status, checked } = props;
  const actualLevel = level || 1;
  const key = `${keyPrefix}_sl${actualLevel}_${supply.key}`;
  const textDecoration = checked ? "line-through" : "none";
  return (
    <ListItemButton
      key={key}
      onClick={() => {
        if (status === ProgressStatus.IN_PROGRESS) {
          onClick();
        }
      }}
      divider={true}
    >
      <ListItemText
        sx={{ textDecoration: textDecoration }}
        primary={supply.name}
        id={key}
      />
      <ListItemIcon sx={{ justifyContent: "flex-end" }}>
        <Typography sx={{ margin: "auto", textDecoration: textDecoration }}>
          {supply.quantity}
        </Typography>
        {status === ProgressStatus.IN_PROGRESS && (
          <Checkbox
            edge="end"
            tabIndex={-1}
            checked={checked}
            disableRipple
            inputProps={{ "aria-labelledby": key }}
          />
        )}
      </ListItemIcon>
    </ListItemButton>
  );
};

export default InventoryLine;
