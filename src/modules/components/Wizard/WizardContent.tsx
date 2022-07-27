import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FunctionComponent } from "react";

import { wizardSteps } from "./data";

export interface WizardContentProps {
  step: number;
}

export const WizardContent: FunctionComponent<WizardContentProps> = ({
  step,
}): JSX.Element => {
  const wizard = wizardSteps.find((wizard) => wizard.step === step);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="32px" mt="40px" mb="24px">
      <Image src={wizard.image} alt={`wizard-step-${step}`} {...wizard.size} />
      <Stack direction="column" alignItems="center" gap="8px">
        <Heading as="h5" textAlign="center">
          {wizard.title}
        </Heading>
        {wizard.description && (
          <Text size={{ md: "md", base: "sm" }} color="grey.800" align="center">
            {wizard.description}
          </Text>
        )}
      </Stack>
    </Box>
  );
};
