import { Box, Stack, Text, useToast } from "@chakra-ui/react";
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
  const toast = useToast();

  const handleSubmit = (): void => {
    window.open("https://discord.gg/RWvx3TugqW");
  };

  const handleCopy = (): void => {
    toast({
      title: "Copied to clipboard!",
      description: "Your hash has been copied to your clipboard.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
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
        maxWidth="full"
        mx="auto"
      >
        <Text size="sm" align="center">
          Minipool TX Hash:
        </Text>
        <Stack direction="row" justify="center" maxW="full">
          <Text
            size="sm"
            color="#000000"
            fontWeight={700}
            overflowWrap="anywhere"
          >
            {hash}
          </Text>
          <Box as="button" aria-label="copy" onClick={handleCopy}>
            <CopyIcon size="16" />
          </Box>
        </Stack>
      </Box>
      <Stack direction="row" gap="8px" justify="center">
        <Button
          mt={{ md: 6, base: 3 }}
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
