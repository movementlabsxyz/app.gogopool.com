import { Meta, Story } from "@storybook/react";

import WagmiDecorator from "../../../stories/decorators/wagmi";
import ConnectButton from "./ConnectButton";

export default {
  title: "Common/ConnectButton",
  component: ConnectButton,
  decorators: [
    (Story) => (
      <WagmiDecorator>
        <Story />
      </WagmiDecorator>
    ),
  ],
} as Meta<typeof ConnectButton>;

const Template: Story = (args) => <ConnectButton {...args} />;

export const Default = Template.bind({});
