import { Stack, Text } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";

import { Button } from "@/common/components/Button";
import { Input } from "@/common/components/Input";
import { WizardStep } from "@/types/wizard";

export interface WizardStepOneProps {
  setCurrentStep: Dispatch<SetStateAction<WizardStep>>;
  avax: number;
}

export const WizardStepOne: FunctionComponent<WizardStepOneProps> = ({
  setCurrentStep,
  avax,
}): JSX.Element => {
  const [nodeId, setNodeId] = useState("");

  const handleSubmit = (): void => {
    setCurrentStep(2);
  };

  return (
    <Stack direction="column" gap="4px">
      <Stack direction="row" gap="8px">
        <Input
          placeholder="Enter your Node ID"
          value={nodeId}
          onChange={(e) => setNodeId(e.target.value)}
        />
        <Button size="sm" disabled={!nodeId} onClick={handleSubmit} data-testid="register-node">
          Register Node
        </Button>
      </Stack>
      <Text color="grey.500" size="xs">
        AVAX available for Swap:{" "}
        <Text as="span" size="xs" fontWeight={700} color="grey.1000">
          {avax} AVAX
        </Text>
      </Text>
    </Stack>
  );
};
