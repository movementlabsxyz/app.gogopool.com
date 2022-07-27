import { Meta, Story } from "@storybook/react";
import React from "react";

import { MetamaskConnect } from "./MetamaskConnect";

export default {
  title: "Common/MetamaskConnect",
  component: MetamaskConnect,
} as Meta<typeof MetamaskConnect>;

const Template: Story = (args) => <MetamaskConnect {...args}/>;

export const Default = Template.bind({});
