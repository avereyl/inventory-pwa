import { LocationType } from "./Location";

export enum ProgressStatus {
  UNKNOWN,
  IN_PROGRESS,
  COMPLETE,
}

type Progress = {
  locationType : LocationType;
  nbOfLinesToCheck: number;
  linesChecked: string[];
  status: ProgressStatus;
  startDate?: Date;
  endDate?: Date;
}

export default Progress;
