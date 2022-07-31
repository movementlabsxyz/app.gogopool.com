import { Flex } from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { utils } from "ethers";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAccount, useBalance } from "wagmi";

import { Button } from "@/common/components/Button";
import useTokenGGPContract from "@/hooks/contracts/tokenGGP";
import { useApproveGGP } from "@/hooks/minipool";
import { roundedBigNumber } from "@/utils/numberFormatter";

import { StakeInput } from "../StakeInput";

export interface WizardStepTwoProps {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  setApproveStatus: Dispatch<
    SetStateAction<"error" | "loading" | "success" | "idle">
  >;
}

export const WizardStepTwo: FunctionComponent<WizardStepTwoProps> = ({
  amount,
  setAmount,
  setApproveStatus,
}): JSX.Element => {
  // These hooks need to be organized better - Chandler
  const [loading, setLoading] = useState(false);

  const {
    writeAsync: approve,
    isLoading: isApproveLoading,
    status: approveGGPStatus,
  } = useApproveGGP(utils.parseEther(amount.toString()));

  const { openConnectModal } = useConnectModal();

  const { address: account, isConnected } = useAccount();
  const { address: ggpAddress } = useTokenGGPContract();

  const { data: balance } = useBalance({
    addressOrName: account,
    token: ggpAddress,
  });

  const handleSubmit = async (): Promise<void> => {
    try {
      const txResult = await approve();
      await txResult.wait();
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isApproveLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    setApproveStatus(approveGGPStatus);
  }, [approveGGPStatus, setApproveStatus, isApproveLoading]);

  return (
    <Flex direction="column">
      <StakeInput
        token="GGP"
        amount={amount}
        setAmount={setAmount}
        balance={roundedBigNumber(balance?.value) || 0}
        title="DEPOSIT GGP"
      />
      <Flex justify="center" mt={{ md: 6, base: 3 }} mb={{ md: 4, base: 2 }}>
        {isConnected ? (
          <Button
            size="sm"
            onClick={handleSubmit}
            data-testid="approve-ggp"
            isLoading={loading}
          >
            Approve
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={openConnectModal}
            data-testid="connect"
            isLoading={loading}
          >
            Connect Wallet
          </Button>
        )}
      </Flex>
      {/* I'm not sure we'll use this? Maybe? - Chandler
      <Text color="grey.500" size="xs" align="center">
        Currently staked:{" "}
        <Text as="span" size="xs" fontWeight={700} color="grey.1000">
          0 GGP
        </Text>
      </Text> */}
    </Flex>
  );
};
