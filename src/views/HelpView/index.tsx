import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import LayoutDecorator from "../../decorator/LayoutDecorator";

const HelpView = () => {
  const { t } = useTranslation();
  return (
    <LayoutDecorator>
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
        <Typography variant="h4" component="h2" mb={1}>
          {t("screens.help.title")}
        </Typography>
      </Box>
    </LayoutDecorator>
  );
};

export default HelpView;
