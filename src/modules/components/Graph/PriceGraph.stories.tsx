import { Meta, Story } from "@storybook/react";

import PriceGraph from "./PriceGraph";

export default {
  title: "Modules/PriceGraph",
  component: PriceGraph,
} as Meta;

const Template: Story = (args) => {
  return <PriceGraph {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  currencyID: "avalanche-2",
  height: 500,
  width: 500,
  title: "AVAX Price",
};
