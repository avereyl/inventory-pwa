import { Box } from "@mui/system";
import { format } from "date-fns";
import { useContext } from "react";
import { useHistory } from "react-router";
import LocationCard from "../../components/ui/LocationCard";
import { globalContext } from "../../context/global/GlobalStore";
import LayoutDecorator from "../../decorator/LayoutDecorator";
import useInventories from "../../hooks/useInventories";
import { LocationType } from "../../types/Location";

const HomeView = () => {
  const history = useHistory();
  const { findInventories } = useInventories();
  const { state } = useContext(globalContext);

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
          />
        ))}
      </Box>
    </LayoutDecorator>
  );
};

export default HomeView;
