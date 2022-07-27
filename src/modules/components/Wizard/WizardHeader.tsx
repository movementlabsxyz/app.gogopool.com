import { Box, Divider, Stack, Text, useBreakpointValue, useTheme } from "@chakra-ui/react";
import { FunctionComponent, MutableRefObject } from "react";

import { WizardIcon } from "@/common/components/CustomIcon/WizardIcon";

import { wizardSteps } from "./data";

export interface WizardHeaderProps {
  step: number;
  headerRef: MutableRefObject<HTMLDivElement>
}

export const WizardHeader: FunctionComponent<WizardHeaderProps> = ({
  step,
  headerRef
}): JSX.Element => {
  const { colors } = useTheme();
  const size = useBreakpointValue({ base: 16, md: 21 })

  return (
    <Box
      overflow="hidden"
      w="full"
      border={`1px solid ${colors.grey[200]}`}
      borderRadius="16px"
      ref={headerRef}
    >
      <Stack
        px="16px"
        py="12px"
        direction="row"
        position="relative"
        justify="space-between"
        minWidth={{ md: "696px", base: "420px"}}
        width="100%"
      >
        {wizardSteps.map((wizard) => (
          <Stack
            key={wizard.title}
            direction="row"
            bg="#ffffff"
            zIndex={10}
            px={2}
            pr={wizard.step !== 4 ? 2 : 0}
            pl={wizard.step !== 1 ? 2 : 0}
          >
            <WizardIcon
              width={size}
              height={size}
              step={wizard.step}
              active={wizard.step === step}
              complete={wizard.step < step}
            />
            <Text fontWeight={wizard.step === step ? 700 : 400} size={{ md: "sm", base: "xxs" }}>
              {wizard.header}
            </Text>
          </Stack>
        ))}
        <Divider
          position="absolute"
          zIndex={1}
          orientation="horizontal"
          top="50%"
          width="600px"
          variant="dashed"
          borderColor={colors.grey[300]}
        />
      </Stack>
    </Box>
  );
};
