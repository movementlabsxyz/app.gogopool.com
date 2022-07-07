import { Divider, Stack, Text, useTheme } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { WizardIcon } from "@/common/components/CustomIcon/WizardIcon";
import { WizardStep } from "@/types/wizard";

import { wizardSteps } from "./data";

export interface WizardHeaderProps {
  step: WizardStep;
}

export const WizardHeader: FunctionComponent<WizardHeaderProps> = ({ step }): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Stack
      border={`1px solid ${colors.grey[200]}`}
      px="16px"
      py="12px"
      direction="row"
      borderRadius="16px"
      position="relative"
      justify="space-between"
      minWidth="696px"
    >
      {wizardSteps.map((wizard) => (
        <Stack
          direction="row"
          bg="#ffffff"
          zIndex={10}
          px={2}
          pr={wizard.step !== 4 ? 2 : 0}
          pl={wizard.step !== 1 ? 2 : 0}
        >
          <WizardIcon
            step={wizard.step}
            active={wizard.step === step}
            complete={wizard.step < step}
          />
          <Text fontWeight={wizard.step === step ? 700 : 400} size="sm">
            {wizard.header}
          </Text>
        </Stack>
      ))}
      <Divider
        position="absolute"
        zIndex={1}
        orientation="horizontal"
        top="50%"
        variant="dashed"
        borderColor={colors.grey[300]}
      />
    </Stack>
  );
};
