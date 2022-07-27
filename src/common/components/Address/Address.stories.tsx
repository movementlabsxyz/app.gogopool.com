import { Meta, Story } from "@storybook/react";
import React from "react";

import { Address, AddressProps } from "./Address";

export default {
  title: "Common/Address",
  component: Address,
} as Meta<typeof Address>;

const Template: Story<AddressProps> = (args) => <Address {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "VeryLongAddressWithTruncate",
};

export const NoTruncate = Template.bind({});
NoTruncate.args = {
  children: "VeryLongAddressWithNoTruncate",
  truncate: false
};

export const Copyable = Template.bind({});
Copyable.args = {
  children: "VeryLongAddressWithNoTruncate",
  copyable: true
};