import { Box, useToast } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";
import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction, useEffect, useRef, useState
} from "react";

import useDeposit from "@/hooks/deposit";
import useCreateMinipool from "@/hooks/minipool";
import useWallet from "@/hooks/wallet";
import { nodeID, parseDelta } from "@/utils";

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
  const [ggpAmount, setGGPAmount] = useState(1000);
  const [avaxAmount, setAvaxAmount] = useState(1000);

  const { account, provider } = useWallet();
  const toast = useToast();
  const headerRef = useRef<HTMLDivElement>(null)
  const { createMinipool, approve, approveResponse, error, success } =
    useCreateMinipool(provider);

  const {
    send,
    error: depositError,
    isLoading: depositLoading,
    success: depositSuccess,
  } = useDeposit(provider);

  const handleChangeNodeId = (e: ChangeEvent<HTMLInputElement>) => {
    setNodeId(e.target.value);
  };

  const remindConnect = () => {
      toast({
        description: "Please connect to your wallet",
        status: "warning",
      });
  }
  const nextStep = () => {
    setCurrentStep(s => {
      if (s === 1) {
        headerRef.current.scrollLeft = 100 // scroll right in MObile view
      }
      return s + 1
    })
  }

  const depositAvax = async () => {
    if (!account) {
      remindConnect()
      return;
    }
    await send(avaxAmount);
  };

  const approveGGP = async () => {
    if (!account) {
      remindConnect()
      return;
    }
    const amount = parseEther(ggpAmount.toString()); // placeholder. Should be read from UI. Units in nAVAX.
    await approve(account, BigNumber.from(amount));
  };

  const createMinipoolGGP = async () => {
    if (!account) {
      remindConnect()
      return;
    }
    const amount = parseEther(ggpAmount.toString());
    const fee = parseEther("200");
    // This is a placeholder. I have to talk to John about
    // how to properly format the Avalanche Node IDs as an
    // eth address - Chandler.
    const nID = nodeID(nodeId);
    // These are also placeholder values. They should be read from
    // the UI.
    const duration = BigNumber.from(parseDelta("1m"));
    const delegationFee = BigNumber.from(20000);
    await createMinipool(nID, duration, delegationFee, fee, amount);
  }

  useEffect(() => {
    if (depositError) {
      toast({
        description: "Error when making trans",
        status: "error",
      });
      return;
    }
    if (depositSuccess) {
      nextStep()
      return;
    }
  }, [depositError, depositSuccess]);

  useEffect(() => {
    if (error) {
      toast({
        description: "Error when making trans",
        status: "error",
      });
      return;
    }

    if (success) {
      toast({ description: "Create Pool success", status: "success" });
      nextStep()
      return;
    }

    if (approveResponse && approveResponse.status === 1) {
      toast({ description: "Approve successful", status: "success" });
      return;
    }
  }, [approveResponse, error, success]);

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
            approveSuccess={!!approveResponse && approveResponse.status === 1}
          />
        );
      case 3:
        return (
          <WizardStepThree
            setCurrentStep={setCurrentStep}
            amount={avaxAmount}
            setAmount={setAvaxAmount}
            loading={depositLoading}
            depositAvax={depositAvax}
          />
        );
      case 4:
        return <WizardStepFour hash="#es2435213153f4639434693942e2341bd" />;
      default:
        throw Error("Invalid step");
    }
  };

  return (
    <Box bg="#ffffff" padding="32px" borderRadius="24px" color="#000000" maxW={780} marginX="auto" h="660px">
      <WizardHeader step={currentStep} headerRef={headerRef}/>
      <Box mx="auto" maxWidth="528px">
        <WizardContent step={currentStep} />
        {renderStepAction()}
      </Box>
    </Box>
  );
};
