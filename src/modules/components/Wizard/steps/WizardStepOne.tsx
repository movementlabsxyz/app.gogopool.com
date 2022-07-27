import { Stack, Text, useToast } from "@chakra-ui/react";
import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";

import { Button } from "@/common/components/Button";
import { Input } from "@/common/components/Input";
import useBalance from "@/hooks/balance";
import { roundedBigNumber } from "@/utils/numberFormatter";

export interface WizardStepOneProps {
  nodeId: string;
  handleChangeNodeId: (e: ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void 
  isConnected: boolean;
}

export const WizardStepOne: FunctionComponent<WizardStepOneProps> = ({
  nodeId,
  handleChangeNodeId,
  nextStep,
  isConnected
}): JSX.Element => {
  const balance = useBalance();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const verifyNodeId = async (id: string) => {
    // call backend to verify dupplication
    return await new Promise((resolve) => setTimeout(() => resolve(id), 1000));
  };

  const handleSubmit = async (): Promise<void> => {
    if (!isConnected) {
      toast({ description: "Please connect to your wallet", status: "warning"});
      return; 
    }
    setLoading(true);
    await verifyNodeId(nodeId);
    nextStep();
    setLoading(false);
  };

  return (
    <Stack direction="column" gap="4px">
      <Stack direction={{ md: "row", base: "column" }} gap="8px">
        <Input
          placeholder="Enter your Node ID"
          value={nodeId}
          onChange={handleChangeNodeId}
        />
        <Button
          size="sm"
          isLoading={loading}
          disabled={!nodeId}
          onClick={handleSubmit}
          data-testid="register-node"
          width={{ md: "auto", base: "100%" }}
        >
          Register Node
        </Button>
      </Stack>
      <Text color="grey.500" size="xs">
        AVAX available for Swap:{" "}
        <Text as="span" size="xs" fontWeight={700} color="grey.1000">
          {roundedBigNumber(balance) || 0} AVAX
        </Text>
      </Text>
    </Stack>
  );
};
