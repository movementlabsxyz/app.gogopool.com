import { Flex } from "@chakra-ui/react";
import { BigNumber, utils } from "ethers";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAccount, useBalance } from "wagmi";

import useGGPAllowance from "@/hooks/allowance";
import useTokenGGPContract from "@/hooks/contracts/tokenGGP";
import { roundedBigNumber } from "@/utils/numberFormatter";

import ApproveButton from "../components/ApproveButton";
import StakeButton from "../components/StakeButton";
import { StakeInput } from "../StakeInput";

export interface WizardStepTwoProps {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  setStakeStatus: Dispatch<
    SetStateAction<"error" | "loading" | "success" | "idle">
  >;
}

export const WizardStepTwo: FunctionComponent<WizardStepTwoProps> = ({
  amount,
  setAmount,
  setStakeStatus,
}): JSX.Element => {
  const [approved, setApproved] = useState(false);
  const [approveStatus, setApproveStatus] = useState<
    "error" | "loading" | "success" | "idle"
  >("idle");

  const { address: account } = useAccount();
  const { address: ggpAddress } = useTokenGGPContract();
  const { data: ggpAllowance } = useGGPAllowance(account);

  const { data: balance } = useBalance({
    addressOrName: account,
    token: ggpAddress,
  });

  const allowance = (ggpAllowance as unknown as BigNumber) || BigNumber.from(0);
  const amountBN = utils.parseEther(amount.toString());

  useEffect(() => {
    if (!approved && approveStatus === "success") {
      setApproved(true);
    }
  }, [approved, approveStatus, setApproved]);

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
        {allowance.gte(amountBN) || approved ? (
          <StakeButton amount={amount} setStakeStatus={setStakeStatus} />
        ) : (
          <ApproveButton setApproveStatus={setApproveStatus} />
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
