import { Box, Stack, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { Button } from "@/common/components/Button";
import { CopyIcon } from "@/common/components/CustomIcon/CopyIcon";
import { DiscordIcon } from "@/common/components/CustomIcon/DiscordIcon";

export interface WizardStepFourProps {
  hash: string;
}

export const WizardStepFour: FunctionComponent<WizardStepFourProps> = ({
  hash,
}): JSX.Element => {
  const handleSubmit = (): void => {
    alert("Discord link");
  };

  const handleCopy = (): void => {
    navigator.clipboard.writeText(hash);
  };

  return (
    <Stack direction="column" gap="4px">
      <Box
        bg="#FAFAFA"
        color="#686686"
        border="1px solid #D8D8D8"
        borderRadius="10px"
        py="16px"
        px="24px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap="4px"
        width="384px"
        mx="auto"
      >
        <Text size="sm" align="center">
          Minipool TX Hash:
        </Text>
        <Stack direction="row" justify="center">
          <Text size="sm" color="#000000" fontWeight={700}>
            {hash}
          </Text>
          <Box as="button" aria-label="copy" onClick={handleCopy}>
            <CopyIcon size="16" />
          </Box>
        </Stack>
      </Box>
      <Stack direction="row" gap="8px" justify="center">
        <Button
          mt={6}
          size="sm"
          variant="secondary-filled"
          onClick={handleSubmit}
          leftIcon={<DiscordIcon />}
        >
          Join GoGoPool on Discord
        </Button>
      </Stack>
    </Stack>
  );
};
