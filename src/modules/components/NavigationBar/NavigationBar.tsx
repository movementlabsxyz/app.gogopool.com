import { Box, Flex, Stack } from "@chakra-ui/react";

import { Button } from "@/common/components/Button";
import { GogopoolIcon } from "@/common/components/CustomIcon/GogopoolIcon";
import useWallet from "@/hooks/wallet";

import { Wallet } from "../Wallet";

export const NavigationBar = () => {
  const { account, activate, deactivate } = useWallet();

  const handleConnect = () => {
    activate();
  };

  const handleDisconnect = () => {
    deactivate();
  };

  return (
    <>
      <Box p="0.75rem 1.5rem" borderBottomWidth="1px" borderBottomColor="#0000001A" h="58px">
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <GogopoolIcon />
          </Box>

          <Flex alignItems="center">
            <Stack direction="row" spacing="7">
              {account ? (
                <Wallet address={account} onDisconnect={handleDisconnect} />
              ) : (
                <Button size="xs" variant="secondary-outline" onClick={handleConnect}>
                  Connect Wallet
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
