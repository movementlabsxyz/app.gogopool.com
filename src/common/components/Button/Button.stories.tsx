import { Meta, Story } from "@storybook/react";
import React from "react";

import { Button, ButtonProps } from "./Button";

export default {
  title: "Common/Button",
  component: Button,
} as Meta<typeof Button>;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Button",
  variant: "primary",
};

export const SecondaryFilled = Template.bind({});
SecondaryFilled.args = {
  children: "Button",
  variant: "secondary-filled",
};

export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  children: "Button",
  variant: "secondary-outline",
};

export const DestructiveOutline = Template.bind({});
DestructiveOutline.args = {
  children: "Button",
  variant: "destructive-outline",
};
