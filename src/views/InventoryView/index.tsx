import { List, ListSubheader, Typography } from "@mui/material";
import { Box } from "@mui/system";
import log from "loglevel";
import { useCallback, useState } from "react";
import { useParams } from "react-router";
import InventoryBar from "../../components/ui/InventoryBar";
import { useGlobalContext } from "../../context/global/GlobalStore";
import { GlobalActionType } from "../../context/global/types";
import LayoutDecorator from "../../decorator/LayoutDecorator";
import useInventories from "../../hooks/useInventories";
import Inventory from "../../types/Inventory";
import { LocationParams } from "../../types/Location";
import Progress, { ProgressStatus } from "../../types/Progress";
import InventoryLine from "./InventoryLine";
import InventorySuccess from "./InventorySuccess";

type LocationVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const buildVariant = (level: number): LocationVariant => {
  let val: number = level > 6 ? 6 : level;
  val = level < 1 ? 1 : level;
  return ("h" + val) as LocationVariant;
};

const InventoryView = () => {
  const { locationType } = useParams<LocationParams>();
  const { state, dispatch } = useGlobalContext();

  const { findInventoryByLocationType, countSuppliesByLocationType } =
    useInventories();

  const inventory: Inventory | undefined =
    findInventoryByLocationType(locationType);
  const progress: Progress | undefined = state.progresses.find(
    (p) => p.locationType === locationType
  );
  const location = inventory?.location;
  const progressStatus = progress?.status || ProgressStatus.UNKNOWN;
  const suppliesChecked = progress?.linesChecked || [];

  const [checked, setChecked] = useState<string[]>(suppliesChecked);
  const [status, setStatus] = useState<ProgressStatus>(progressStatus);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);

  const handleCloseSuccessSnack = useCallback(() => {
    setOpenSuccessSnack(false);
    //+ back to home ?
  }, []);

  const handleToggle = (value: string) => () => {
    log.debug("toogle supply with key: " + value);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    if (newChecked.length === progress?.nbOfLinesToCheck) {
      setStatus(ProgressStatus.COMPLETE);
      setOpenSuccessSnack(true);
      setChecked([]);
    }
    dispatch({
      type: GlobalActionType.PROGRESS_TOGGLE_LINE,
      payload: { locationType: locationType, supplyKey: value },
    });
  };

  const buildInventory = (
    inv: Inventory,
    keyPrefix: string,
    level?: number
  ) => {
    const actualLevel = level || 1;
    const key = `${keyPrefix}_inv_${actualLevel}`;
    return (
      <List key={key} dense={true}>
        <ListSubheader>
          <Typography
            variant={buildVariant(actualLevel + 2)}
            component={buildVariant(actualLevel + 1)}
            key={key}
          >
            {inv.location.name}
          </Typography>
        </ListSubheader>
        {inv.supplies &&
          inv.supplies.map((supply, idx) => (
            <InventoryLine
              key={`${key}_line_${idx}`}
              keyPrefix={key}
              supply={supply}
              level={actualLevel + 1}
              checked={checked.indexOf(supply.key) !== -1}
              status={status}
              onClick={handleToggle(supply.key)}
            />
          ))}
        {inv.children &&
          inv.children.map((child, idx) =>
            buildInventory(child, `${key}_${idx}`, actualLevel + 1)
          )}
      </List>
    );
  };

  const inventoryAppBar = (
    <InventoryBar
      inProgress={status === ProgressStatus.IN_PROGRESS}
      newInventory={() => {
        setChecked([]);
        setStatus(ProgressStatus.IN_PROGRESS);
        dispatch({
          type: GlobalActionType.PROGRESS_START,
          payload: {
            locationType: locationType,
            totalNumber: countSuppliesByLocationType(locationType),
          },
        });
      }}
      resetInventory={() => {
        setChecked([]);
        setStatus(ProgressStatus.IN_PROGRESS);
        dispatch({
          type: GlobalActionType.PROGRESS_RESET,
          payload: locationType,
        });
      }}
      deleteInventory={() => {
        setChecked([]);
        setStatus(ProgressStatus.UNKNOWN);
        dispatch({
          type: GlobalActionType.PROGRESS_DELETE,
          payload: locationType,
        });
      }}
    />
  );

  return (
    <LayoutDecorator customAppBar={inventoryAppBar}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          maxWidth: "500px",
          width: 1,
          margin: "1rem 1rem 0 1rem",
        }}
      >
        {inventory && buildInventory(inventory, "")}
      </Box>
      {/* {progress && (
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={getCheckingProgress(progress)}
        />
      )} */}
      <InventorySuccess
        open={openSuccessSnack}
        onClose={handleCloseSuccessSnack}
        location={location}
      />
    </LayoutDecorator>
  );
};

export default InventoryView;
