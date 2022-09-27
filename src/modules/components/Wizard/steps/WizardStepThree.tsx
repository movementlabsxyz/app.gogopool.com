import { Flex } from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { BigNumber, utils } from "ethers";
import ms from "ms";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAccount, useBalance } from "wagmi";

import { Button } from "@/common/components/Button";
import { AvalancheIcon } from "@/common/components/CustomIcon/AvalancheIcon";
import useCoinPrice from "@/hooks/coinPrice";
import { useCreateMinipool } from "@/hooks/minipool";
import { nodeID } from "@/utils";
import { roundedBigNumber } from "@/utils/numberFormatter";

import WeekInput from "../components/WeekInput";
import { StakeInput } from "../StakeInput";

export interface WizardStepThreeProps {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  nodeId: string;
  setTxID: Dispatch<SetStateAction<string>>;
  setCreateMinipoolStatus: Dispatch<"error" | "loading" | "success" | "idle">;
}

export const WizardStepThree: FunctionComponent<WizardStepThreeProps> = ({
  amount,
  setAmount,
  nodeId,
  setCreateMinipoolStatus,
  setTxID,
}): JSX.Element => {
  const [isWaitingOnResult, setIsWaitingOnResult] = useState(false);
  const [stakingPeriod, setStakingPeriod] = useState(2);

  const { openConnectModal } = useConnectModal();
  const { address: account, isConnected } = useAccount();

  const { price } = useCoinPrice("avalanche-2");

  const { data: balance } = useBalance({
    addressOrName: account,
  });

  // this is reverting now, need to find out why
  const {
    writeAsync: createMinipool,
    isLoading: isCreateMinipoolLoading,
    status: createMinipoolStatus,
  } = useCreateMinipool({
    nodeId: nodeID(nodeId),
    amount: utils.parseEther(amount.toString()),
    // These need to me made user changeable in the future
    fee: BigNumber.from(20000),
    // duration: stakingPeriod.toString() + "w",
    duration: "15m",
  });

  useEffect(() => {
    setCreateMinipoolStatus(createMinipoolStatus);
  }, [createMinipoolStatus]);

  const handleSubmit = async () => {
    setIsWaitingOnResult(true);
    const txResult = await createMinipool();
    const receipt = await txResult.wait();
    setTxID(receipt.transactionHash);
    setIsWaitingOnResult(false);
  };

  return (
    <Flex direction="column">
      <WeekInput
        title="Staking Duration (Weeks)"
        value={stakingPeriod}
        setValue={setStakingPeriod}
        disabled
      />
      <StakeInput
        hasIcon
        icon={<AvalancheIcon />}
        minInputWidth="96px"
        inputWidth={`${amount.toString().length * 16 + 24}px`}
        token="AVAX"
        amount={amount}
        setAmount={setAmount}
        balance={roundedBigNumber(balance?.value) || 0}
        exchangeRate={price}
        currencySymbol="$"
        title="AVAX STAKING DEPOSIT AMOUNT"
      />
      {/* Wallet is connected and createMinipool callStatic worked */}
      {isConnected && createMinipool && (
        <Button
          full
          onClick={handleSubmit}
          data-testid="deposit-avax"
          mt={4}
          isLoading={isCreateMinipoolLoading || isWaitingOnResult}
        >
          Stake AVAX!
        </Button>
      )}
      {/* Wallet is connected but the createMinipool callStatic failed */}
      {isConnected && !createMinipool && (
        <Button disabled full mt={4} variant="destructive-outline">
          {" "}
          Cannot deposit AVAX. Please try again later.{" "}
        </Button>
      )}
      {/* Wallet is not connected */}
      {!isConnected && (
        <Button size="sm" onClick={openConnectModal} data-testid="connect">
          Connect Wallet
        </Button>
      )}
    </Flex>
  );
};
