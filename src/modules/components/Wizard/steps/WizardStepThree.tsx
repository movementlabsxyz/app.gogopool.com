import { Flex } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";

import { Button } from "@/common/components/Button";
import { AvalancheIcon } from "@/common/components/CustomIcon/AvalancheIcon";
import useBalance from "@/hooks/balance";
import { roundedBigNumber } from "@/utils/numberFormatter";

import { StakeInput } from "../StakeInput";

export interface WizardStepThreeProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  avax: number;
}

export const WizardStepThree: FunctionComponent<WizardStepThreeProps> = ({
  setCurrentStep,
}): JSX.Element => {
  const [amount, setAmount] = useState(10);
  const balance = useBalance()
  const handleSubmit = (): void => {
    setCurrentStep(4);
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
      <Button full onClick={handleSubmit} data-testid="deposit-avax" mt={4}>
        Deposit AVAX
      </Button>
    </Flex>
  );
};
