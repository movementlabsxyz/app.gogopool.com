import { Stack, Text, useToast } from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";

import { Button } from "@/common/components/Button";
import { Input } from "@/common/components/Input";
import { nodeID } from "@/utils";
import { roundedBigNumber } from "@/utils/numberFormatter";

export interface WizardStepOneProps {
  nodeId: string;
  handleChangeNodeId: (e: ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  isConnected: boolean;
}

export const WizardStepOne: FunctionComponent<WizardStepOneProps> = ({
  nodeId,
  handleChangeNodeId,
  nextStep,
  isConnected,
}): JSX.Element => {
  const { address: account } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: account,
  });
  const [loading, setLoading] = useState(false);

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const toast = useToast();
  const { openConnectModal } = useConnectModal();

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);

    try {
      if (!nodeId.startsWith("NodeID-") && !nodeId.startsWith("0x")) {
        throw new Error("Invalid node ID");
      }
      // strip all whitespace
      const id = nodeID(nodeId);
      if (id) {
        nextStep();
      }
    } catch (e) {
      toast({
        title: "Invalid node ID",
        description: "Please check the node ID and try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
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
        {!isSSR && isConnected ? (
          <Button
            size="sm"
            isLoading={loading}
            disabled={!nodeId}
            onClick={handleSubmit}
            data-testid="register-node"
            width={{ md: "auto", base: "100%" }}
          >
            Continue
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
      </Stack>
    </Stack>
  );
};
