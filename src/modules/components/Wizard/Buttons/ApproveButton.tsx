import { useConnectModal } from "@rainbow-me/rainbowkit";
import { BigNumber, utils } from "ethers";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";

import { Button } from "@/common/components/Button";
import useApproveGGP from "@/hooks/approve";
import useTokenGGPContract from "@/hooks/contracts/tokenGGP";

export interface ApproveProps {
  amount: number | BigNumber;
  setApproveStatus: Dispatch<
    SetStateAction<"error" | "loading" | "success" | "idle">
  >;
}

const ApproveButton = ({ amount, setApproveStatus }: ApproveProps) => {
  const { address: account, isConnected } = useAccount();
  const { address: ggpAddress } = useTokenGGPContract();

  const { data: balance } = useBalance({
    addressOrName: account,
    token: ggpAddress,
  });

  const { openConnectModal } = useConnectModal();

  if (typeof amount === "number") {
    amount = utils.parseEther(amount.toString());
  }

  const notAllowed = (balance && balance?.value.lt(amount)) || amount.isZero();

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
      disabled={isApproveLoading || notAllowed || !approve}
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
