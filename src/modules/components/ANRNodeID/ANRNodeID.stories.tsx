import { Meta, Story } from "@storybook/react";

import ANRNodeID from "./ANRNodeID";

export default {
  title: "Modules/ANRNodeID",
  component: ANRNodeID,
} as Meta;

const Template: Story = () => {
  return <ANRNodeID />;
};

export const Default = Template.bind({});
