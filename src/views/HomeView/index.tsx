import { Box } from "@mui/system";
import { format } from "date-fns";
import { useHistory } from "react-router";
import { useGlobalContext } from "../../context/global/GlobalStore";
import { useProgressContext } from "../../context/progress/ProgressContext";
import LayoutDecorator from "../../decorator/LayoutDecorator";
import useInventories from "../../hooks/useInventories";
import { LocationType } from "../../types/Location";
import LocationCard from "./LocationCard";

const HomeView = () => {
  const history = useHistory();
  const { findInventories } = useInventories();
  const { state } = useProgressContext();
  const { state: globalState } = useGlobalContext();

  const displayCard = (type?: LocationType) => {
    type && history.push(`/check/${type}`);
  };

  return (
    <LayoutDecorator>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          maxWidth: "700px",
          justifyContent: "space-evenly",
        }}
      >
        {findInventories().map((inv) => (
          <LocationCard
            key={`card_${inv.location.type}`}
            location={inv.location}
            title={inv.location.name}
            version={
              inv.documentDate &&
              format(Date.parse(inv.documentDate), "dd/MM/yyyy")
            }
            handleClick={() => displayCard(inv.location.type)}
            progress={state.progresses.find(
              (p) => p.locationType === inv.location.type
            )}
            latestSuccessDate={
              globalState.successes.find(
                (s) => s.locationType === inv.location.type
              )?.valueDate
            }
          />
        ))}
      </Box>
    </LayoutDecorator>
  );
};

export default HomeView;
