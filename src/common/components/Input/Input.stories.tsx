import { Meta, Story } from "@storybook/react";
import React from "react";

import { CustomInputProps, Input } from "./Input";

export default {
  title: "Common/Input",
  component: Input,
} as Meta<typeof Input>;

const Template: Story<CustomInputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});

export const Error = Template.bind({});

Error.args = {
  isInvalid: true,
  errorText: "hello world",
};
