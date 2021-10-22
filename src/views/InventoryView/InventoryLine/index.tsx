import { BarChart, BatteryCharging60, Event } from "@mui/icons-material";
import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { CheckedLineBehavior } from "../../../context/global/types";
import { ProgressStatus } from "../../../types/Progress";
import { Supply, SupplyTag } from "../../../types/Supply";

export type InventoryLineProps = {
  status: ProgressStatus;
  supply: Supply;
  checked: boolean;
  lineBehavior: CheckedLineBehavior;
  keyPrefix: string;
  level?: number;
  onClick: () => void;
};

const buildTagIcon = (tag: SupplyTag, key: string, idx: number) => {
  const sx = { margin: (theme: Theme) => theme.spacing(0, 0.5) };
  switch (tag) {
    case SupplyTag.BATTERY:
      return (
        <BatteryCharging60
          key={key + idx}
          fontSize="small"
          sx={sx}
          color="primary"
        />
      );
    case SupplyTag.EXP_DATE:
      return <Event key={key + idx} fontSize="small" sx={sx} color="primary" />;
    case SupplyTag.LEVEL:
      return (
        <BarChart key={key + idx} fontSize="small" sx={sx} color="primary" />
      );
  }
};

const InventoryLine = (props: InventoryLineProps) => {
  const { supply, level, keyPrefix, onClick, status, checked, lineBehavior } =
    props;
  const actualLevel = level || 1;
  const key = `${keyPrefix}_sl${actualLevel}_${supply.key}`;
  const textDecoration = checked ? "line-through" : "none";
  const itemSx = {
    //paddingLeft: (theme: Theme) => theme.spacing(1),
    //paddingRight: (theme: Theme) => theme.spacing(1),
  };
  const itemBehaviorSx =
    lineBehavior === CheckedLineBehavior.HIDE
      ? { display: checked ? "none" : "flex" }
      : {};

  return useMemo(() => {
    return (
      <ListItemButton
        key={key}
        onClick={() => {
          if (status === ProgressStatus.IN_PROGRESS) {
            onClick();
          }
        }}
        divider={true}
        sx={{ ...itemSx, ...itemBehaviorSx }}
      >
        <ListItemText
          sx={{ textDecoration: textDecoration }}
          primary={
            <Typography sx={{ display: "inline-flex", alignItems: "center" }}>
              <span
                dangerouslySetInnerHTML={{
                  __html: `${supply.name}`,
                }}
              />
              {supply.tags.map((tag, idx) => buildTagIcon(tag, key, idx))}
            </Typography>
          }
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
  }, [supply, checked, status, lineBehavior]);
};

export default InventoryLine;
