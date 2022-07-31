import { Box, useToast } from "@chakra-ui/react";
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

// I hate this ordering but this is how ESLint wants it
// - Chandler.
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
  const [approveStatus, setApproveStatus] = useState<
    "error" | "loading" | "success" | "idle"
  >("idle");
  const [createMinipoolStatus, setCreateMinipoolStatus] = useState<
    "error" | "loading" | "success" | "idle"
  >("idle");

  const { address: account } = useAccount();

  const toast = useToast();
  const headerRef = useRef<HTMLDivElement>(null);

  const handleChangeNodeId = (e: ChangeEvent<HTMLInputElement>) => {
    setNodeId(e.target.value);
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
    if (createMinipoolStatus === "error") {
      toast({
        description: "Error when sending the create minipool transaction",
        status: "error",
      });
      return;
    }

    if (createMinipoolStatus === "success" && txid !== "") {
      toast({ description: "Create minipool successful", status: "success" });
      nextStep();
      return;
    }
  }, [createMinipoolStatus, txid]);

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
            setApproveStatus={setApproveStatus}
            setAmount={setGGPAmount}
          />
        );
      case 3:
        return (
          <WizardStepThree
            amount={avaxAmount}
            ggpAmount={ggpAmount}
            setAmount={setAvaxAmount}
            nodeId={nodeId}
            setCreateMinipoolStatus={setCreateMinipoolStatus}
            setTxID={setTxid}
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
