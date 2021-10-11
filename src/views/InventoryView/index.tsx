import { List, ListSubheader, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback } from "react";
import { useParams } from "react-router";
import { useGlobalContext } from "../../context/global/GlobalStore";
import { GlobalActionType } from "../../context/global/types";
import { useProgressContext } from "../../context/progress/ProgressContext";
import { ProgressActionType } from "../../context/progress/types";
import LayoutDecorator from "../../decorator/LayoutDecorator";
import useInventories from "../../hooks/useInventories";
import Inventory from "../../types/Inventory";
import { LocationParams } from "../../types/Location";
import Progress, { ProgressStatus } from "../../types/Progress";
import InventoryBar from "./InventoryBar";
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
  const { state, dispatch } = useProgressContext();
  const { dispatch: globalDispatch } = useGlobalContext();

  const { findInventoryByLocationType, countSuppliesByLocationType } =
    useInventories();

  const inventory: Inventory | undefined =
    findInventoryByLocationType(locationType);

  const progress: Progress | undefined = state.progresses.find(
    (p) => p.locationType === locationType
  );
  const location = inventory?.location;

  const handleCloseSuccessSnack = useCallback(() => {
    //clear progress
    dispatch({
      type: ProgressActionType.PROGRESS_DELETE,
      payload: locationType,
    });
    //save success
    globalDispatch({
      type: GlobalActionType.SAVE_PROGRESS_SUCCESS,
      payload: locationType,
    });
    //+ back to home ?
  }, []);

  const handleToggle = (value: string) => () => {
    dispatch({
      type: ProgressActionType.PROGRESS_TOGGLE_LINE,
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
              checked={Boolean(
                progress && progress.linesChecked.indexOf(supply.key) !== -1
              )}
              status={progress?.status || ProgressStatus.UNKNOWN}
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
      inProgress={progress?.status === ProgressStatus.IN_PROGRESS}
      newInventory={() => {
        dispatch({
          type: ProgressActionType.PROGRESS_START,
          payload: {
            locationType: locationType,
            nbOfLinesToCheck: countSuppliesByLocationType(locationType),
          },
        });
      }}
      resetInventory={() => {
        dispatch({
          type: ProgressActionType.PROGRESS_RESET,
          payload: locationType,
        });
      }}
      deleteInventory={() => {
        dispatch({
          type: ProgressActionType.PROGRESS_DELETE,
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
        open={Boolean(progress && progress?.status === ProgressStatus.COMPLETE)}
        onClose={handleCloseSuccessSnack}
        location={location}
      />
    </LayoutDecorator>
  );
};

export default InventoryView;
