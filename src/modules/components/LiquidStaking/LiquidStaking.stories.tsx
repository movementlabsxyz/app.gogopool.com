import { configureStore, createSlice } from "@reduxjs/toolkit";
import { expect } from "@storybook/jest";
import { Meta, Story } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import React from "react";
import { Provider } from "react-redux";

import { WalletState } from "@/types/wallet";

import { LiquidStaking } from "./LiquidStaking";

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
  title: "Modules/LiquidStaking",
  component: LiquidStaking,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} as Meta<typeof LiquidStaking>;

const Template: Story<typeof LiquidStaking> = () => <LiquidStaking />;

export const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.clear(canvas.getByRole("spinbutton"));
  await userEvent.type(canvas.getByRole("spinbutton"), "1234567890");
  await expect(canvas.getByRole("spinbutton")).toHaveValue("1234567890");

  await userEvent.click(canvas.getByTestId("liquid-staking-accordion-action"));
  await expect(canvas.getByTestId("liquid-staking-accordion-action")).toHaveAttribute(
    "aria-expanded",
    "true"
  );
};
