import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MemoryRouter } from "react-router";
import AppBar from ".";

export default {
  title: "inventory-app/AppBar",
  component: AppBar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AppBar>;

const Template: ComponentStory<typeof AppBar> = () => (
  <MemoryRouter>
    <AppBar />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};
