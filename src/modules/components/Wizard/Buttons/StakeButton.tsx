import { useConnectModal } from "@rainbow-me/rainbowkit";
import { BigNumber } from "ethers";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAccount } from "wagmi";

import { Button } from "@/common/components/Button";
import useStake from "@/hooks/stake";

export interface StakeButtonProps {
  amount: number | BigNumber;
  setStakeStatus: Dispatch<
    SetStateAction<"error" | "loading" | "success" | "idle">
  >;
}

const StakeButton = ({ amount, setStakeStatus }: StakeButtonProps) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (typeof amount === "number") {
    amount = BigNumber.from(amount);
  }

  const {
    writeAsync: stake,
    isLoading: isStakeLoading,
    status: stakeStatus,
  } = useStake(amount);

  useEffect(() => {
    setStakeStatus(stakeStatus);
  }, [stakeStatus, setStakeStatus]);

  const handleSubmit = async () => {
    const result = await stake();
    await result?.wait();
  };

  return isConnected ? (
    <Button
      onClick={handleSubmit}
      disabled={isStakeLoading || !amount.gt(0) || !stake}
      isLoading={isStakeLoading}
    >
      Stake
    </Button>
  ) : (
    <Button size="sm" onClick={openConnectModal} data-testid="connect">
      Connect Wallet
    </Button>
  );
};

export default StakeButton;
