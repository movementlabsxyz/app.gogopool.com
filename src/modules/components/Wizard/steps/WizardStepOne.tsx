import { Stack, Text } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";

import { Button } from "@/common/components/Button";
import { Input } from "@/common/components/Input";
import useBalance from "@/hooks/balance";
import useCreateMinipool from "@/hooks/minipool";
import useWallet from "@/hooks/wallet";
import { nodeID, parseDelta } from "@/utils";
import { roundedBigNumber } from "@/utils/numberFormatter";

export interface WizardStepOneProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const WizardStepOne: FunctionComponent<WizardStepOneProps> = ({
  setCurrentStep,
}): JSX.Element => {
  const [nodeId, setNodeId] = useState("");
  const { account, provider } = useWallet();
  const balance = useBalance()

  const {
    createMinipool,
    approve,
  } = useCreateMinipool(provider);

  const approveGGP = async () => {
    if (!account) return;
    const amount = parseEther("1000"); // placeholder. Should be read from UI. Units in nAVAX.
    await approve(account, BigNumber.from(amount));
  };

  const createMinipoolGGP = async () => {
    if (!account) return;
    const amount = parseEther("1000");
    const fee = parseEther("200");
    // This is a placeholder. I have to talk to John about
    // how to properly format the Avalanche Node IDs as an
    // eth address - Chandler.
    const nID = nodeID("randomUUID()");
    // These are also placeholder values. They should be read from
    // the UI.
    const duration = BigNumber.from(parseDelta("1m"));
    const delegationFee = BigNumber.from(20000);
    await createMinipool(nID, duration, delegationFee, fee, amount);
  };

  const handleSubmit = (): void => {
    setCurrentStep(2)
    approveGGP()
    createMinipoolGGP()
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
          {roundedBigNumber(balance) || 0} AVAX
        </Text>
      </Text>
    </Stack>
  );
};
