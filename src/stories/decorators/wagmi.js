import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from "react";
import { WagmiConfig } from "wagmi";

import configWagmiClient from "@/config/wagmi";

const { wagmiClient, chains } = configWagmiClient();

const WagmiDecorator = (Story) => {
  return (
    <RainbowKitProvider
      wagmiClient={wagmiClient}
      chains={chains}
      config={WagmiConfig}
    >
      <Story />
    </RainbowKitProvider>
  );
};

export default WagmiDecorator;
