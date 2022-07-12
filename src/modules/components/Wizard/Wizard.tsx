import { Box } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";

import { WizardStep } from "@/types/wizard";

import { WizardStepFour } from "./steps/WizardStepFour";
import { WizardStepOne } from "./steps/WizardStepOne";
import { WizardStepThree } from "./steps/WizardStepThree";
import { WizardStepTwo } from "./steps/WizardStepTwo";
import { WizardContent } from "./WizardContent";
import { WizardHeader } from "./WizardHeader";

export interface WizardProps {
  step?: WizardStep;
}

export const Wizard: FunctionComponent<WizardProps> = ({ step = 1 }): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<WizardStep>(step);

  const renderStepAction = (): JSX.Element => {
    switch (currentStep) {
      case 1:
        return <WizardStepOne setCurrentStep={setCurrentStep} avax={299995} />;
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
    <Box bg="#ffffff" padding="32px" borderRadius="24px" color="#000000">
      <WizardHeader step={currentStep} />
      <Box mx="auto" maxWidth="528px">
        <WizardContent step={currentStep} />
        {renderStepAction()}
      </Box>
    </Box>
  );
};
