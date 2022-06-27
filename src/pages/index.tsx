import MetamaskConnect from "@/common/components/MetamaskConnect";
import { PageHead } from "@/common/components/PageHead";
import { Button } from "@chakra-ui/react";
import {
  useEthers,
  useEtherBalance,
  DAppProvider,
  Config,
  Rinkeby,
} from "@usedapp/core";
import { getDefaultProvider } from "ethers";

export default function Home() {
  const { account, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);

  const config: Config = {
    readOnlyChainId: Rinkeby.chainId,
    readOnlyUrls: {
      [Rinkeby.chainId]: getDefaultProvider("rinkeby"),
    },
  };

  return (
    <DAppProvider config={config}>
      <div className="h-full">
        <PageHead
          append={false}
          description="Home page description"
          name="Home"
        />
        <section className="grid place-content-center h-full text-center">
          <span>Welcome to GoGoPool!</span>
          <MetamaskConnect />
        </section>
      </div>
    </DAppProvider>
  );
}
