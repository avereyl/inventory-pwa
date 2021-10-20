import { ComponentMeta, ComponentStory } from "@storybook/react";
import ConfirmationDialog, { ConfirmationDialogProps } from ".";

export default {
  title: "inventory-app/ConfirmationDialog",
  component: ConfirmationDialog,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ConfirmationDialog>;

const Template: ComponentStory<typeof ConfirmationDialog> = (
  props: ConfirmationDialogProps
) => <ConfirmationDialog {...props} />;

export const DeletionDialog = Template.bind({});
DeletionDialog.args = {
  confirmation: "Are you sure you wanna delete everything ?",
  title: "Deletion",
  labelOK: "Delete",
  open: true,
};
