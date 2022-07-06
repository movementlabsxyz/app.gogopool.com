import { Box, Flex, Stack } from "@chakra-ui/react";

import { Button } from "@/common/components/Button";
import { GogopoolIcon } from "@/common/components/CustomIcon/GogopoolIcon";

export const NavigationBar = () => {
  return (
    <>
      <Box
        p="0.75rem 1.5rem"
        borderBottomWidth="1px"
        borderBottomColor="#0000001A"
        h="58px"
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <GogopoolIcon />
          </Box>

          <Flex alignItems="center">
            <Stack direction="row" spacing="7">
              <Button
                size="xs"
                variant="secondary-outline"
                onClick={() => null}
              >
                Connect Wallet
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
