import { Meta, Story } from "@storybook/react";
import React from "react";

import { Avatar, AvatarProps } from "./Avatar";

export default {
  title: "Common/Avatar",
  component: Avatar,
} as Meta<typeof Avatar>;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "https://bit.ly/dan-abramov",
};

export const Small = Template.bind({});
Small.args = {
  src: "https://bit.ly/dan-abramov",
  size: "xs"
};

export const Fallback = Template.bind({});
Fallback.args = {
  name:"Oshigaki Kisame",
  src:"https://bit.ly/broken-link"
};