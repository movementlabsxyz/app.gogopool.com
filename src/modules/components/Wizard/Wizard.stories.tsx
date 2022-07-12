import { expect } from "@storybook/jest";
import { Meta, Story } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import React from "react";

import { Wizard } from "./Wizard";

export default {
  title: "Modules/Wizard",
  component: Wizard,
} as Meta<typeof Wizard>;

const Template: Story<typeof Wizard> = () => <Wizard />;

export const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByTestId("register-node")).toBeDisabled();
  await userEvent.type(
    canvas.getByPlaceholderText("Enter your Node ID"),
    "7afeoq35231nfbaeqo145103u95141akfasds"
  );
  await expect(canvas.getByPlaceholderText("Enter your Node ID")).toHaveValue(
    "7afeoq35231nfbaeqo145103u95141akfasds"
  );
  await expect(canvas.getByTestId("register-node")).not.toBeDisabled();

  await userEvent.click(canvas.getByTestId("register-node"));
  await expect(canvas.getByText("Approve and Stake your GGP")).toBeInTheDocument();

  await userEvent.click(canvas.getByTestId("stake-now"));
  await expect(canvas.getAllByText("Deposit AVAX")).toHaveLength(3);

  await userEvent.click(canvas.getByTestId("deposit-avax"));
  await expect(canvas.getAllByText("Success!")).toHaveLength(2);
};
