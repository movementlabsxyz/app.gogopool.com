import { Box } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

import { WizardStepFour } from "./steps/WizardStepFour";
import { WizardStepOne } from "./steps/WizardStepOne";
import { WizardStepThree } from "./steps/WizardStepThree";
import { WizardStepTwo } from "./steps/WizardStepTwo";
import { WizardContent } from "./WizardContent";
import { WizardHeader } from "./WizardHeader";

export interface WizardProps {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export const Wizard: FunctionComponent<WizardProps> = ({ currentStep, setCurrentStep }): JSX.Element => {

  const renderStepAction = (): JSX.Element => {
    switch (currentStep) {
      case 1:
        return <WizardStepOne setCurrentStep={setCurrentStep} />
      case 2:
        return <WizardStepTwo setCurrentStep={setCurrentStep} avax={299995} />;
      case 3:
        return <WizardStepThree setCurrentStep={setCurrentStep} avax={299995} />;
      case 4:
        return <WizardStepFour hash="#es2435213153f4639434693942e2341bd" />;
      default:
        throw Error("Invalid step");
    }
  };

  return (
    <Box bg="#ffffff" padding="32px" borderRadius="24px" color="#000000" maxW={780} marginX="auto" h="660px">
      <WizardHeader step={currentStep} />
      <Box mx="auto" maxWidth="528px">
        <WizardContent step={currentStep} />
        {renderStepAction()}
      </Box>
    </Box>
  );
};
