import { expect } from "@storybook/jest";
import { Meta, Story } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import React from "react";

import { LiquidStaking } from "./LiquidStaking";

export default {
  title: "Modules/LiquidStaking",
  component: LiquidStaking,
} as Meta<typeof LiquidStaking>;

const Template: Story<typeof LiquidStaking> = () => <LiquidStaking />;

export const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.clear(canvas.getByRole("spinbutton"));
  await userEvent.type(canvas.getByRole("spinbutton"), "1234567890");
  expect(canvas.getByRole("spinbutton")).toHaveValue("1234567890");

  await userEvent.click(canvas.getByTestId("liquid-staking-accordion-action"));
  expect(canvas.getByTestId("liquid-staking-accordion-action")).toHaveAttribute(
    "aria-expanded",
    "true"
  );
};
