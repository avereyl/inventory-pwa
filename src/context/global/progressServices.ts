import Progress, {
  ProgressStatus,
} from "../../types/Progress";
import { LocationType } from "../../types/Location";
import { GlobalState } from "./types";

/**
 * Add progress for location type if none exists already in the state
 * @param state the current state
 * @param param Object containing type of location and number of lines to check
 * @returns the new state
 */
export const newStateWithStartedProgress = (
  state: GlobalState,
  {
    locationType,
    totalNumber,
  }: { locationType: LocationType; totalNumber: number }
): GlobalState => {
  return !state.progresses.find((p) => p.locationType === locationType)
    ? {
        ...state,
        progresses: [...state.progresses, create(locationType, totalNumber)],
      }
    : state;
};

/**
 * Delete progress for given location type
 * @param state the current state
 * @param locationType The type of location
 * @returns the new state
 */
export const newStateWithDeletedProgress = (
  state: GlobalState,
  locationType: LocationType
): GlobalState => {
  return {
    ...state,
    progresses: [...state.progresses].filter(
      (p) => p.locationType !== locationType
    ),
  };
};

/**
 * Reset progress for given location type
 * @param state the current state
 * @param locationType The type of location
 * @returns the new state
 */
export const newStateWithResetProgress = (
  state: GlobalState,
  locationType: LocationType
): GlobalState => {
  return {
    ...state,
    progresses: state.progresses.map((p) =>
      p.locationType === locationType ? reset(p) : p
    ),
  };
};
/**
 * Complete progress for given location type
 * @param state the current state
 * @param locationType The type of location
 * @returns the new state
 */
export const newStateWithCompletedProgress = (
  state: GlobalState,
  locationType: LocationType
): GlobalState => {
  return {
    ...state,
    progresses: state.progresses.map((p) =>
      p.locationType === locationType ? complete(p) : p
    ),
  };
};
/**
 * Toggle supply checkbox for given location type
 * @param state the current state
 * @param locationType The type of location
 * @returns the new state
 */
export const newStateWithToggledProgressLine = (
  state: GlobalState,
  { locationType, supplyKey }: { locationType: LocationType; supplyKey: string }
): GlobalState => {
  return {
    ...state,
    progresses: state.progresses.map((p) =>
      p.locationType === locationType ? toggle(p, supplyKey) : p
    ),
  };
};
export const newStateWithSavedProgress = (
  state: GlobalState,
  {
    locationType,
    checkedSupplies,
  }: { locationType: LocationType; checkedSupplies: string[] }
): GlobalState => {
  return {
    ...state,
    progresses: state.progresses.map((p) =>
      p.locationType === locationType ? setChecked(p, checkedSupplies) : p
    ),
  };
};

export const getProgressValue = (progress: Progress): number => {
  return progress.nbOfLinesToCheck === 0
    ? 100
    : Math.floor(
        (progress.linesChecked.length / progress.nbOfLinesToCheck) * 100
      );
};

const create = (
  locationType: LocationType,
  nbOfLinesToCheck: number
): Progress => {
  return {
    locationType: locationType,
    nbOfLinesToCheck: nbOfLinesToCheck,
    linesChecked: [],
    status: ProgressStatus.IN_PROGRESS,
    startDate: new Date(),
  };
};

const complete = (progress: Progress): Progress => {
  if (progress.status === ProgressStatus.IN_PROGRESS) {
    progress.linesChecked = [];
    progress.status = ProgressStatus.COMPLETE;
    progress.endDate = new Date();
  }
  return progress;
};

const reset = (progress: Progress): Progress => {
  if (progress.status === ProgressStatus.IN_PROGRESS) {
    progress.linesChecked = [];
  }
  return progress;
};

const toggle = (progress: Progress, key: string) => {
  if (progress.status === ProgressStatus.IN_PROGRESS) {
    const idx: number = progress.linesChecked.indexOf(key);
    if (idx === -1) {
      progress.linesChecked.push(key);
      if (progress.linesChecked.length === progress.nbOfLinesToCheck) {
        complete(progress);
      }
    } else {
      progress.linesChecked.splice(idx, 1);
    }
  }
  return progress;
};
const setChecked = (progress: Progress, keys: string[]) => {
  if (progress.status === ProgressStatus.IN_PROGRESS) {
    progress.linesChecked = keys;
  }
  return progress;
};
