import { List, ListSubheader, Typography } from "@mui/material";
import Inventory from "../../../types/Inventory";
import Progress, { ProgressStatus } from "../../../types/Progress";
import InventoryLine from "../InventoryLine";
import { CheckedLineBehavior } from "../../../context/global/types";

type LocationVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const buildVariant = (level: number): LocationVariant => {
  let val: number = level > 6 ? 6 : level;
  val = level < 1 ? 1 : level;
  return ("h" + val) as LocationVariant;
};

export type InventoryProps = {
  inventory: Inventory;
  keyPrefix: string;
  onCheckboxToggle: (value: string) => () => void;
  progress?: Progress;
  level?: number;
  lineBehavior?: CheckedLineBehavior;
};

const InventoryComponent = (props: InventoryProps) => {
  const {
    inventory,
    progress,
    level,
    keyPrefix,
    lineBehavior,
    onCheckboxToggle,
  } = props;
  const actualLevel = level || 1;
  const key = `${keyPrefix}_inv_${actualLevel}`;
  const handleToggle = onCheckboxToggle;
  const checkLineBehavior = lineBehavior || CheckedLineBehavior.CROSS_OUT;
  return (
    // padding to 0 ??
    <List key={key} dense={true} sx={{ paddingTop: 0, paddingBottom: 0 }}>
      <ListSubheader sx={{ height: (theme) => theme.spacing(7) }}>
        <Typography
          variant={buildVariant(actualLevel + 2)}
          component={buildVariant(actualLevel + 1)}
          key={key}
        >
          {inventory.location.name}
        </Typography>
      </ListSubheader>
      {inventory.supplies &&
        inventory.supplies.map((supply, idx) => (
          <InventoryLine
            key={`${key}_line_${idx}`}
            keyPrefix={key}
            supply={supply}
            level={actualLevel + 1}
            checked={Boolean(
              progress && progress.linesChecked.indexOf(supply.key) !== -1
            )}
            lineBehavior={checkLineBehavior}
            status={progress?.status || ProgressStatus.UNKNOWN}
            onClick={handleToggle(supply.key)}
          />
        ))}
      {inventory.children &&
        inventory.children.map((child, idx) => (
          <InventoryComponent
            inventory={child}
            keyPrefix={`${key}_${idx}`}
            level={actualLevel + 1}
            progress={progress}
            lineBehavior={checkLineBehavior}
            onCheckboxToggle={onCheckboxToggle}
          />
        ))}
    </List>
  );
};

export default InventoryComponent;
