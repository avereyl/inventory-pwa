import { Box } from "@mui/system";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";
import { useGlobalContext } from "../../context/global/GlobalStore";
import { GlobalActionType } from "../../context/global/types";
import { useProgressContext } from "../../context/progress/ProgressContext";
import { ProgressActionType } from "../../context/progress/types";
import LayoutDecorator from "../../decorator/LayoutDecorator";
import useInventories from "../../hooks/useInventories";
import Inventory from "../../types/Inventory";
import { LocationParams } from "../../types/Location";
import Progress, { ProgressStatus } from "../../types/Progress";
import InventoryComponent from "./Inventory";
import InventoryBar from "./InventoryBar";
import InventorySuccess from "./InventorySuccess";

const InventoryView = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { locationType } = useParams<LocationParams>();
  const { state, dispatch } = useProgressContext();
  const { dispatch: globalDispatch, state: globalState } = useGlobalContext();
  const [isDeleteConfirmationDialogOpen, setIsDeleteConfirmationDialogOpen] =
    useState<boolean>(false);

  const handleOpenDeleteConfirmation = () => {
    setIsDeleteConfirmationDialogOpen(true);
  };
  const handleCloseDeleteConfirmation = () => {
    setIsDeleteConfirmationDialogOpen(false);
  };

  const handleDeleteProgress = () => {
    dispatch({
      type: ProgressActionType.PROGRESS_DELETE,
      payload: locationType,
    });
    handleCloseDeleteConfirmation();
  };

  const { findInventoryByLocationType, countSuppliesByLocationType } =
    useInventories();

  const inventory: Inventory | undefined =
    findInventoryByLocationType(locationType);

  const progress: Progress | undefined = state.progresses.find(
    (p) => p.locationType === locationType
  );

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
    // back to home
    history.push("/");
  }, []);

  const handleToggle = (value: string) => () => {
    dispatch({
      type: ProgressActionType.PROGRESS_TOGGLE_LINE,
      payload: { locationType: locationType, supplyKey: value },
    });
  };

  const inventoryAppBar = (
    <InventoryBar
      inProgress={progress?.status === ProgressStatus.IN_PROGRESS}
      onNewProgress={() => {
        dispatch({
          type: ProgressActionType.PROGRESS_START,
          payload: {
            locationType: locationType,
            nbOfLinesToCheck: countSuppliesByLocationType(locationType),
          },
        });
      }}
      onResetProgress={() => {
        dispatch({
          type: ProgressActionType.PROGRESS_RESET,
          payload: locationType,
        });
      }}
      onDeleteProgress={handleOpenDeleteConfirmation}
      nbOfLinesChecked={progress?.linesChecked.length}
      nbOfLinesToCheck={progress?.nbOfLinesToCheck}
    />
  );

  return (
    <LayoutDecorator customAppBar={inventoryAppBar}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          maxWidth: "700px",
          width: 1,
          margin: "1rem 1rem 0 1rem",
        }}
      >
        {inventory && (
          <InventoryComponent
            inventory={inventory}
            keyPrefix={""}
            onCheckboxToggle={handleToggle}
            lineBehavior={globalState.userSettings.checkedLineBehavior}
            progress={progress}
          />
        )}
      </Box>
      <InventorySuccess
        open={Boolean(progress && progress?.status === ProgressStatus.COMPLETE)}
        onClose={handleCloseSuccessSnack}
        location={inventory?.location}
      />
      <ConfirmationDialog
        open={isDeleteConfirmationDialogOpen}
        title={t("screens.inventory.messages.deleteConfirmationTitle")}
        confirmation={t(
          "screens.inventory.messages.deleteConfirmationDescription"
        )}
        onClose={handleCloseDeleteConfirmation}
        onCancel={handleCloseDeleteConfirmation}
        onOK={handleDeleteProgress}
        labelOK={t("commons.labels.delete")}
        labelCancel={t("commons.labels.cancel")}
      />
    </LayoutDecorator>
  );
};

export default InventoryView;
