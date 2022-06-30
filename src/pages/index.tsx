import { Config, DAppProvider, Rinkeby } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

export default function Home() {
  const config: Config = {
    readOnlyChainId: Rinkeby.chainId,
    readOnlyUrls: {
      [Rinkeby.chainId]: getDefaultProvider("rinkeby"),
    },
  };

  return <DAppProvider config={config}></DAppProvider>;
}
