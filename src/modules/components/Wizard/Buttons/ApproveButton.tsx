import { useConnectModal } from "@rainbow-me/rainbowkit";
import { BigNumber, utils } from "ethers";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAccount } from "wagmi";

import { Button } from "@/common/components/Button";
import useApproveGGP from "@/hooks/approve";

export interface ApproveProps {
  amount: number | BigNumber;
  setApproveStatus: Dispatch<
    SetStateAction<"error" | "loading" | "success" | "idle">
  >;
}

const ApproveButton = ({ amount, setApproveStatus }: ApproveProps) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (typeof amount === "number") {
    amount = utils.parseEther(amount.toString());
  }

  const {
    writeAsync: approve,
    isLoading: isApproveLoading,
    status: approveStatus,
  } = useApproveGGP(amount);

  useEffect(() => {
    setApproveStatus(approveStatus);
  }, [approveStatus, setApproveStatus]);

  const handleSubmit = async () => {
    const result = await approve();
    await result?.wait();
  };

  return isConnected ? (
    <Button
      onClick={handleSubmit}
      disabled={isApproveLoading || !amount.gt(0) || !approve}
      isLoading={isApproveLoading}
    >
      Approve
    </Button>
  ) : (
    <Button size="sm" onClick={openConnectModal} data-testid="connect">
      Connect Wallet
    </Button>
  );
};

export default ApproveButton;
