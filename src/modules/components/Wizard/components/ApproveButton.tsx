import { useConnectModal } from "@rainbow-me/rainbowkit";
import { BigNumber, constants } from "ethers";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAccount } from "wagmi";

import { Button } from "@/common/components/Button";
import useApproveGGP from "@/hooks/approve";

export interface ApproveProps {
  setApproveStatus: Dispatch<
    SetStateAction<"error" | "loading" | "success" | "idle">
  >;
}

const ApproveButton = ({ setApproveStatus }: ApproveProps) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const amount = constants.MaxUint256;

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
      disabled={isApproveLoading || !approve}
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
