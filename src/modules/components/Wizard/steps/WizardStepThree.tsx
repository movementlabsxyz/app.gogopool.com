import { Flex } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { useAccount, useBalance } from "wagmi";

import { Button } from "@/common/components/Button";
import { AvalancheIcon } from "@/common/components/CustomIcon/AvalancheIcon";
import { roundedBigNumber } from "@/utils/numberFormatter";

import { StakeInput } from "../StakeInput";

export interface WizardStepThreeProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  depositAvax?: () => Promise<void>;
  loading: boolean;
}

export const WizardStepThree: FunctionComponent<WizardStepThreeProps> = ({
  amount,
  setAmount,
  loading,
  depositAvax,
}): JSX.Element => {
  const { address: account } = useAccount();

  const { data: balance } = useBalance({
    addressOrName: account,
  });

  const handleSubmit = (): void => {
    if (depositAvax) {
      depositAvax();
    }
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
        balance={roundedBigNumber(balance?.value) || 0}
        exchangeRate={10}
        title="AVAX STAKING DEPOSIT AMOUNT"
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
