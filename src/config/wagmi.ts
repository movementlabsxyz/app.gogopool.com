import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import chain from "@/config/chains";

export const configWagmiClient = () => {
  const { chains, provider } = configureChains(
    [/*chain.avalanche, chain.fuji, chain.local,*/ chain.anr],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "GoGoPool",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return {
    wagmiClient,
    chains,
  };
};

export default configWagmiClient;
