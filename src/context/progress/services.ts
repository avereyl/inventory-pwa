import { LocationType } from "../../types/Location";
import Progress, { ProgressStatus } from "../../types/Progress";
import { PersistenceType } from "../global/types";
import { ProgressState } from "./types";

/**
 * Add progress for location type if none exists already in the state
 * @param state the current state
 * @param param Object containing type of location and number of lines to check
 * @returns the new state
 */
 export const newStateWithStartedProgress = (
    state: ProgressState,
    {
      locationType,
      nbOfLinesToCheck,
    }: { locationType: LocationType; nbOfLinesToCheck: number }
  ): ProgressState => {

    return !state.progresses.find((p) => p.locationType === locationType)
      ? {
          ...state,
          progresses: [...state.progresses, createProgress(locationType, nbOfLinesToCheck)],
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
    state: ProgressState,
    locationType: LocationType
  ): ProgressState => {
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
    state: ProgressState,
    locationType: LocationType
  ): ProgressState => {
    return {
      ...state,
      progresses: state.progresses.map((p) =>
        p.locationType === locationType ? resetProgress(p) : p
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
    state: ProgressState,
    locationType: LocationType
  ): ProgressState => {
    return {
      ...state,
      progresses: state.progresses.map((p) =>
        p.locationType === locationType ? completeProgress(p) : p
      ),
    };
  };
  /**
   * Toggle checkbox for given location type
   * @param state the current state
   * @param locationType The type of location
   * @returns the new state
   */
  export const newStateWithToggledProgressLine = (
    state: ProgressState,
    { locationType, supplyKey }: { locationType: LocationType; supplyKey: string }
  ): ProgressState => {
    return {
      ...state,
      progresses: state.progresses.map((p) =>
        p.locationType === locationType ? toggleLine(p, supplyKey) : p
      ),
    };
  };
  /**
   * Saved the state
   * @param state the current state
   * @returns the new state
   */
  export const newStateWithSavedProgress = (
    state: ProgressState,
    persistenceType: PersistenceType
  ): ProgressState => {
      //TODO save progress
    return {
      ...state
    };
  };
  /**
   * Load the state
   * @param state the current state
   * @returns the new state
   */
  export const newStateWithLoadedProgress = (
    state: ProgressState,
    persistenceType: PersistenceType
  ): ProgressState => {
      //TODO load progress
    return {
      ...state
    };
  };
  
  export const getProgressValue = (progress: Progress): number => {
    console.log(progress);
    return progress.nbOfLinesToCheck === 0
      ? 100
      : Math.floor(
          (progress.linesChecked.length / progress.nbOfLinesToCheck) * 100
        );
  };
  



  const createProgress = (
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

  const completeProgress = (progress: Progress): Progress => {
    if (progress.status === ProgressStatus.IN_PROGRESS) {
      progress.linesChecked = [];
      progress.status = ProgressStatus.COMPLETE;
      progress.endDate = new Date();
    }
    return progress;
  };
  
  const resetProgress = (progress: Progress): Progress => {
    if (progress.status === ProgressStatus.IN_PROGRESS) {
      progress.linesChecked = [];
    }
    return progress;
  };
  
  const toggleLine = (progress: Progress, key: string) => {
    if (progress.status === ProgressStatus.IN_PROGRESS) {
      const idx: number = progress.linesChecked.indexOf(key);
      if (idx === -1) {
        progress.linesChecked.push(key);
        if (progress.linesChecked.length === progress.nbOfLinesToCheck) {
          completeProgress(progress);
        }
      } else {
        progress.linesChecked.splice(idx, 1);
      }
    }
    return progress;
  };

  const setCheckedLines = (progress: Progress, keys: string[]) => {
    if (progress.status === ProgressStatus.IN_PROGRESS) {
      progress.linesChecked = keys;
    }
    return progress;
  };
  