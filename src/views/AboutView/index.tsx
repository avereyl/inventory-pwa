import { GitHub, PhoneAndroid } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import LayoutDecorator from "../../decorator/LayoutDecorator";

const AboutView = () => {
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
          {t("screens.about.title")}
        </Typography>

        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PhoneAndroid />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t("screens.about.labels.app")}
              secondary={process.env.REACT_APP_NAME}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PhoneAndroid />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t("screens.about.labels.version")}
              secondary={process.env.REACT_APP_VERSION}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <GitHub />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t("screens.about.labels.code")}
              secondary={
                <Link href="https://github.com/avereyl/inventory-pwa">
                  https://github.com/avereyl/inventory-pwa
                </Link>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="SDIS 85" src="./assets/sdis85.webp">
                <GitHub />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t("screens.about.labels.datasource")}
              secondary={
                <Link href="https://agora.sdis-vendee.fr/">
                  https://agora.sdis-vendee.fr/
                </Link>
              }
            />
          </ListItem>
        </List>
      </Box>
    </LayoutDecorator>
  );
};

export default AboutView;
