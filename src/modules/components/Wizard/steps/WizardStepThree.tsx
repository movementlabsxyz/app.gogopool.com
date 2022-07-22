import { Flex } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

import { Button } from "@/common/components/Button";
import { AvalancheIcon } from "@/common/components/CustomIcon/AvalancheIcon";
import useBalance from "@/hooks/balance";
import { roundedBigNumber } from "@/utils/numberFormatter";

import { StakeInput } from "../StakeInput";

export interface WizardStepThreeProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  depositAvax: () => Promise<void>;
  loading: boolean;
}

export const WizardStepThree: FunctionComponent<WizardStepThreeProps> = ({
  amount,
  setAmount,
  loading,
  depositAvax,
}): JSX.Element => {
  const balance = useBalance();

  const handleSubmit = (): void => {
    depositAvax();
  };

  return (
    <Flex direction="column">
      <StakeInput
        hasIcon
        icon={<AvalancheIcon />}
        minInputWidth="96px"
        inputWidth={`${amount.toString().length * 16 + 24}px`}
        token="AVAX"
        amount={amount}
        setAmount={setAmount}
        balance={roundedBigNumber(balance) || 0}
        exchangeRate={10}
        title="DEPOSIT AVAX"
      />
      <Button
        full
        onClick={handleSubmit}
        data-testid="deposit-avax"
        mt={4}
        isLoading={loading}
      >
        Deposit AVAX
      </Button>
    </Flex>
  );
};
