import { Button } from "@chakra-ui/react";
import {
  Avalanche,
  Config,
  DAppProvider,
  Rinkeby,
  useEtherBalance,
  useEthers,
} from "@usedapp/core";
import { getDefaultProvider } from "ethers";

import MetamaskConnect from "@/common/components/MetamaskConnect";
import { PageHead } from "@/common/components/PageHead";
import { SwapIcon } from "@/common/components/CustomIcon/SwapIcon";
import { CrossIcon } from "@/common/components/CustomIcon/CrossIcon";
import { CaretLeftIcon } from "@/common/components/CustomIcon/CaretLeftIcon";
import { CaretDownIcon } from "@/common/components/CustomIcon/CaretDownIcon";
import { CaretUpIcon } from "@/common/components/CustomIcon/CaretUpIcon";
import { CaretRightIcon } from "@/common/components/CustomIcon/CaretRightIcon";
import { AvalancheIcon } from "@/common/components/CustomIcon/AvalancheIcon";
import { MetaMaskIcon } from "@/common/components/CustomIcon/MetaMaskIcon";
import { InfoIcon } from "@/common/components/CustomIcon/InfoIcon";

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
        <section className="grid h-full place-content-center text-center">
          <span>
            <SwapIcon />
            <CrossIcon />
            <CaretLeftIcon />
            <CaretDownIcon />
            <CaretRightIcon />
            <CaretUpIcon />
            <AvalancheIcon />
            <MetaMaskIcon />
            <InfoIcon />
          </span>
        </section>
      </div>
    </DAppProvider>
  );
}
