import { Stack, Text } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

import { Button } from "@/common/components/Button";
import { WizardStep } from "@/types/wizard";

export interface WizardStepTwoProps {
  setCurrentStep: Dispatch<SetStateAction<WizardStep>>;
  avax: number;
}

export const WizardStepTwo: FunctionComponent<WizardStepTwoProps> = ({
  setCurrentStep,
  avax,
}): JSX.Element => {
  const handleSubmit = (): void => {
    setCurrentStep(3);
  };

  return (
    <Stack direction="column" gap="4px">
      <Stack direction="row" gap="8px" justify="center">
        <Button size="sm" onClick={handleSubmit} data-testid="stake-now">
          Stake now
        </Button>
      </Stack>
      <Text color="grey.500" size="xs" align="center">
        AVAX available for Swap:{" "}
        <Text as="span" size="xs" fontWeight={700} color="grey.1000">
          {avax} AVAX
        </Text>
      </Text>
    </Stack>
  );
};
