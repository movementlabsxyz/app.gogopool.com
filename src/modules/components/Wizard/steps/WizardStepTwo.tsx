import { Flex, Text } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";

import { Button } from "@/common/components/Button";
import useExchangeRate from "@/hooks/ggexchange";
import { useGGPBalance } from "@/hooks/ggpbalance";
import useWallet from "@/hooks/wallet";
import { roundedBigNumber } from "@/utils/numberFormatter";

import { StakeInput } from "../StakeInput";

export interface WizardStepTwoProps {
  createMinipoolGGP: () => Promise<void>;
  approveGGP: () => Promise<void>;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  approveSuccess: boolean;
}

export const WizardStepTwo: FunctionComponent<WizardStepTwoProps> = ({
  createMinipoolGGP,
  amount,
  setAmount,
  approveGGP,
  approveSuccess,
}): JSX.Element => {
  const { account, provider } = useWallet();
  const [loading, setLoading] = useState(false);
  const ggpBalance = useGGPBalance(provider, account);
  const rate = useExchangeRate(provider);

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    await approveGGP();
    setLoading(false);
  };

  const callMinipool = async (): Promise<void> => {
    setLoading(true);
    await createMinipoolGGP();
    setLoading(false);
  };

  return (
    <Flex direction="column">
      <StakeInput
        token="GGP"
        amount={amount}
        setAmount={setAmount}
        balance={roundedBigNumber(ggpBalance) || 0}
        exchangeRate={roundedBigNumber(rate) || 1}
        title="DEPOSIT GGP"
      />
      <Flex justify="center" mt={{ md: 6, base: 3 }} mb={{ md: 4, base: 2 }}>
        {!approveSuccess ? (
          <Button
            size="sm"
            onClick={handleSubmit}
            data-testid="stake-now"
            isLoading={loading}
          >
            Approve
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={callMinipool}
            data-testid="stake-now"
            isLoading={loading}
          >
            Stake now
          </Button>
        )}
      </Flex>
      <Text color="grey.500" size="xs" align="center">
        Currently staked:{" "}
        <Text as="span" size="xs" fontWeight={700} color="grey.1000">
          0 GGP
        </Text>
      </Text>
    </Flex>
  );
};
