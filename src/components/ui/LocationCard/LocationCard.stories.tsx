import { ComponentMeta, ComponentStory } from "@storybook/react";
import LocationCard from ".";
import { Location, LocationType } from "../../../types/Location";
import Progress, { ProgressStatus } from "../../../types/Progress";

export default {
  title: "inventory-app/LocationCard",
  component: LocationCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof LocationCard>;

const Template: ComponentStory<typeof LocationCard> = (args) => (
  <LocationCard {...args} />
);

const vsav: Location = {
  type: LocationType.VSAV,
  name: "VSAV",
};

const medipack: Location = {
  type: LocationType.MEDIPACK,
  name: "MEDIPACK",
};

export const Default = Template.bind({});
Default.args = {
  title: "VSAV",
  location: vsav,
};

const vsavProgress: Progress = {
  locationType: LocationType.VSAV,
  status: ProgressStatus.IN_PROGRESS,
  linesChecked: [],
  nbOfLinesToCheck: 10,
  startDate: new Date(),
};
export const VSAV_inProgress = Template.bind({});
VSAV_inProgress.args = {
  title: "VSAV",
  version: "2021-09-01",
  location: vsav,
  progress: vsavProgress,
};

const medipackProgress: Progress = {
  locationType: LocationType.MEDIPACK,
  status: ProgressStatus.COMPLETE,
  linesChecked: [],
  nbOfLinesToCheck: 10,
  startDate: new Date(),
  endDate: new Date(),
};
export const MedipackDone = Template.bind({});
MedipackDone.args = {
  title: "Médipack",
  version: "2021-09-01",
  location: medipack,
  mediaPath: "/assets/medipack.webp",
  progress: medipackProgress,
};
