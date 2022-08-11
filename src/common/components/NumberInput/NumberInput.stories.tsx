import { Meta, Story } from "@storybook/react";
import React from "react";

import { InputProps, NI as NumberInput } from "./NumberInput";

export default {
  title: "Common/NumberInput",
  component: NumberInput,
} as Meta<typeof NumberInput>;

const Template: Story<InputProps> = (args) => <NumberInput {...args} />;

export const Default = Template.bind({});

export const Restriction = Template.bind({});

Restriction.args = {
  min: 2,
  max: 52,
  step: 2,
  defaultValue: 2,
};

export const WithWidthRestriction = Template.bind({});

WithWidthRestriction.args = {
  minWidth: "100px",
  maxWidth: "100px",
};
