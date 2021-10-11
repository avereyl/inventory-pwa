import { ComponentMeta, ComponentStory } from "@storybook/react";
import InventorySuccess from ".";
import { LocationType } from "../../../types/Location";

export default {
  title: "inventory-app/InventorySuccess",
  component: InventorySuccess,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof InventorySuccess>;

const Template: ComponentStory<typeof InventorySuccess> = (args) => (
  <InventorySuccess {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  location: { type: LocationType.MEDIPACK, name: "Médipack" },
};
