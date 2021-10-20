import { ComponentMeta, ComponentStory } from "@storybook/react";
import ThemeModeSwitcher from ".";

export default {
  title: "inventory-app/ThemeModeSwitcher",
  component: ThemeModeSwitcher,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ThemeModeSwitcher>;

const Template: ComponentStory<typeof ThemeModeSwitcher> = (props) => (
  <ThemeModeSwitcher {...props} />
);

export const Default = Template.bind({});
Default.args = {};

export const DarkModeEnabled = Template.bind({});
DarkModeEnabled.args = {
  darkMode: true,
};
export const LightModeEnabled = Template.bind({});
LightModeEnabled.args = {
  darkMode: false,
};
