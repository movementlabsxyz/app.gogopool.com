import { Meta, Story } from "@storybook/react";

import ConnectButton from "./ConnectButton";

export default {
  title: "Common/ConnectButton",
  component: ConnectButton,
} as Meta<typeof ConnectButton>;

const Template: Story = (args) => <ConnectButton {...args} />;

export const Default = Template.bind({});
