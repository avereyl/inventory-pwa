import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MemoryRouter } from "react-router";
import InventoryBar from ".";

export default {
  title: "inventory-app/InventoryBar",
  component: InventoryBar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof InventoryBar>;

const Template: ComponentStory<typeof InventoryBar> = (props) => (
  <MemoryRouter>
    <InventoryBar {...props} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};

export const InventoryInProgress = Template.bind({});
InventoryInProgress.args = {
  inProgress: true,
};
