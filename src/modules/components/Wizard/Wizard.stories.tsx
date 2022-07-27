import { configureStore, createSlice } from "@reduxjs/toolkit";
import { expect } from "@storybook/jest";
import { Meta, Story } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import React, { useState } from "react";
import { Provider } from "react-redux";

import { WalletState } from "@/types/wallet";

import { Wizard } from "./Wizard";
const initialState: WalletState = {
  account: "0x0000000000000000000000000000000000000000",
  chainId: 1,
  chainName: "localhost",
  error: undefined,
};

const store = configureStore({
  reducer: {
    wallet: createSlice({
      name: "wallet",
      initialState,
      reducers: {
        setAccount: (state, action) => {
          state.account = action.payload;
        },
      },
    }).reducer,
  },
});

export default {
  title: "Modules/Wizard",
  component: Wizard,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} as Meta<typeof Wizard>;

const Template: Story<typeof Wizard> = () => {
  const [currentStep, setCurrentStep] = useState(1);
  return <Wizard currentStep={currentStep} setCurrentStep={setCurrentStep} />;
};

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

};
