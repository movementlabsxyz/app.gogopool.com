import { Box, useToast } from "@chakra-ui/react";
import { BigNumber, utils } from "ethers";
import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAccount } from "wagmi";

import { useApproveGGP, useCreateMinipool } from "@/hooks/minipool";
import { nodeID } from "@/utils";

// I hate this ordering but this is how ESLint wants it.
import { WizardStepFour } from "./steps/WizardStepFour";
import { WizardStepOne } from "./steps/WizardStepOne";
import { WizardStepThree } from "./steps/WizardStepThree";
import { WizardStepTwo } from "./steps/WizardStepTwo";
import { WizardContent } from "./WizardContent";
import { WizardHeader } from "./WizardHeader";

export interface WizardProps {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const Wizard: FunctionComponent<WizardProps> = ({
  currentStep,
  setCurrentStep,
}): JSX.Element => {
  const [nodeId, setNodeId] = useState("");
  const [ggpAmount, setGGPAmount] = useState(200);
  const [avaxAmount, setAvaxAmount] = useState(1000);
  const [txid, setTxid] = useState("");

  const { isConnected, address: account } = useAccount();

  const {
    writeAsync: approve,
    isLoading: isApproveLoading,
    status: approveStatus,
  } = useApproveGGP(utils.parseEther(ggpAmount.toString()));

  const {
    writeAsync: createMinipool,
    isLoading: isCreateMinipoolLoading,
    status: createMinipoolStatus,
    error: createMinipoolError,
  } = useCreateMinipool({
    nodeId: nodeID(nodeId),
    bondAmount: utils.parseEther(ggpAmount.toString()),
    amount: utils.parseEther(avaxAmount.toString()),
    // These need to me made user changeable in the future
    fee: BigNumber.from(20000),
    // 15 minutes from now
    startTime: new Date(Date.now() + 15 * 60 * 1000),
    // 15 minutes and 2 weeks from now
    endTime: new Date(Date.now() + 15 * 60 * 1000 + 14 * 24 * 60 * 60 * 1000),
  });

  const toast = useToast();
  const headerRef = useRef<HTMLDivElement>(null);

  const handleChangeNodeId = (e: ChangeEvent<HTMLInputElement>) => {
    setNodeId(e.target.value);
  };

  const remindConnect = () => {
    toast({
      description: "Please connect to your wallet",
      status: "warning",
    });
  };
  const nextStep = () => {
    setCurrentStep((s) => {
      // what?
      if (s === 1) {
        headerRef.current.scrollLeft = 100; // scroll right in Mobile view
      }
      return s + 1;
    });
  };

  const approveGGP = async () => {
    if (!isConnected) {
      remindConnect();
      return;
    }
    await approve();
  };

  const createMinipoolGGP = async () => {
    if (!isConnected) {
      remindConnect();
      return;
    }
    if (createMinipool) {
      const resp = await createMinipool();
      // wait until the transaction is mined
      const receipt = await resp.wait();
      setTxid(receipt.transactionHash);
    }
  };

  const isLoading = isApproveLoading || isCreateMinipoolLoading;

  useEffect(() => {
    if (approveStatus === "error") {
      toast({
        description: "Error when making trans",
        status: "error",
      });
      return;
    }

    if (approveStatus === "success") {
      toast({ description: "Approve successful", status: "success" });
      nextStep();
      return;
    }
  }, [approveStatus]);

  useEffect(() => {
    console.error(createMinipoolError);
    if (createMinipoolStatus === "error") {
      toast({
        description: "Error when sending the create minipool transaction",
        status: "error",
      });
      return;
    }

    if (createMinipoolStatus === "success") {
      toast({ description: "Create minipool successful", status: "success" });
      nextStep();
      return;
    }
  }, [createMinipoolStatus, createMinipoolError]);

  const renderStepAction = (): JSX.Element => {
    switch (currentStep) {
      case 1:
        return (
          <WizardStepOne
            isConnected={!!account}
            nodeId={nodeId}
            handleChangeNodeId={handleChangeNodeId}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <WizardStepTwo
            amount={ggpAmount}
            approveGGP={approveGGP}
            setAmount={setGGPAmount}
            createMinipoolGGP={createMinipoolGGP}
            approveSuccess={approveStatus === "success"}
          />
        );
      case 3:
        return (
          <WizardStepThree
            amount={avaxAmount}
            setAmount={setAvaxAmount}
            setCurrentStep={setCurrentStep}
            loading={isLoading}
          />
        );
      case 4:
        return <WizardStepFour hash={txid} />;
      default:
        throw Error("Invalid step");
    }
  };

  return (
    <Box
      bg="#ffffff"
      padding="32px"
      borderRadius="24px"
      color="#000000"
      maxW={780}
      marginX="auto"
      h="660px"
    >
      <WizardHeader step={currentStep} headerRef={headerRef} />
      <Box mx="auto" maxWidth="528px">
        <WizardContent step={currentStep} />
        {renderStepAction()}
      </Box>
    </Box>
  );
};
