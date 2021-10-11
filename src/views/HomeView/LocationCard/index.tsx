import { CheckCircle } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { getProgressValue } from "../../../context/progress/services";
import { Location, LocationType } from "../../../types/Location";
import Progress, { ProgressStatus } from "../../../types/Progress";

export type LocationCardProps = {
  title: string;
  version?: string;
  location: Location;
  mediaPath?: string;
  progress: Progress;
  latestSuccessDate?: Date;
  handleClick: () => void;
};

const defaultMediaPath = "/assets/VSAV.webp";
const mediaPathMap: Map<LocationType, string> = new Map([
  [LocationType.VSAV, "/assets/VSAV.webp"],
  [LocationType.MEDIPACK, "/assets/medipack.webp"],
]);

const LocationCard = (props: LocationCardProps) => {
  const {
    title,
    version,
    progress,
    latestSuccessDate,
    mediaPath,
    location,
    handleClick,
  } = props;
  const { t } = useTranslation();
  const media =
    mediaPath ||
    (location.type && mediaPathMap.get(location.type)) ||
    defaultMediaPath;
  return (
    <Card sx={{ margin: "1rem", maxWidth: "500px" }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia component="img" height="185" image={media} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          {version && (
            <Typography variant="body2" color="text.secondary">
              {t("screens.home.labels.inventoryVersion", { version: version })}
            </Typography>
          )}
          {progress.status === ProgressStatus.IN_PROGRESS && (
            <LinearProgress
              variant="determinate"
              value={getProgressValue(progress)}
            />
          )}
          {latestSuccessDate && (
            <>
              <Box
                flexDirection="row"
                display="flex"
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" color="text.secondary">
                  {t("screens.home.labels.checkedDate", {
                    date: new Date(latestSuccessDate).toLocaleDateString("fr"),
                  })}
                </Typography>
                <CheckCircle sx={{ color: "success.main" }} />
              </Box>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

LocationCard.defaultProps = {
  progress: {
    status: ProgressStatus.UNKNOWN,
    value: 0,
  },
};

export default LocationCard;
