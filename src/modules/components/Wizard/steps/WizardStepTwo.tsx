import { Flex, Text } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";

import { Button } from "@/common/components/Button";
import useExchangeRate from "@/hooks/ggexchange";
import { useGGPBalance } from "@/hooks/ggpbalance";
import useWallet from "@/hooks/wallet";
import { roundedBigNumber } from "@/utils/numberFormatter";

import { StakeInput } from "../StakeInput";

export interface WizardStepTwoProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  avax: number;
}

export const WizardStepTwo: FunctionComponent<WizardStepTwoProps> = ({
  setCurrentStep,
}): JSX.Element => {
  const [amount, setAmount] = useState(0);
  const { account, provider } = useWallet()
  const ggpBalance = useGGPBalance(provider, account)
  const rate = useExchangeRate(provider)

  const handleSubmit = (): void => {
    setCurrentStep(3);
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
      <Flex justify="center" mt={6} mb={4}>
        <Button size="sm" onClick={handleSubmit} data-testid="stake-now">
          Stake now
        </Button>
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
