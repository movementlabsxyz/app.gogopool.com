import {
  Box,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren, useRef } from "react";

import { Address } from "@/common/components/Address";
import { Avatar } from "@/common/components/Avatar";
import { Button } from "@/common/components/Button";
import { ArrowDownLeftIcon } from "@/common/components/CustomIcon/ArrowDownLeftIcon";
import { CaretDownIcon } from "@/common/components/CustomIcon/CaretDownIcon";

import { WalletCard } from "./WalletCard";
import { WalletCardButton } from "./WalletCardButton";
import { WalletDisconnect } from "./WalletDisconnect";

export interface WalletProps {
  avatar?: string;
  address: string;
  onChangeWallet?: () => void;
  onDisconnect?: () => void;
  onClearAllTransaction?: () => void;
}

export const Wallet: FunctionComponent<PropsWithChildren<WalletProps>> = ({
  address,
  avatar,
  onChangeWallet,
  onDisconnect,
  onClearAllTransaction,
}): JSX.Element => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  const handleClickRecenTransactions = (): void => {
    // TODO: Change me to navigate to recent transactions page
    window.open(`https://etherscan.io/address/${address}`, "_blank");
  };

  return (
    <Popover initialFocusRef={initialFocusRef} placement="bottom-end" isLazy>
      <PopoverTrigger>
        <Box>
          <Button
            iconLeft={<Avatar size="xs" src={avatar} />}
            iconRight={<CaretDownIcon height={12} width={12} />}
            paddingLeft="6px"
            paddingRight="8px"
            paddingY="5px"
            bg={colorMode === "light" ? colors.grey[0] : colors.grey[1000]}
            color={colorMode === "light" ? colors.grey[1000] : colors.grey[0]}
            _hover={{
              bg: colorMode === "light" ? colors.grey[0] : colors.grey[1000],
            }}
            _active={{
              bg: colorMode === "light" ? colors.grey[0] : colors.grey[1000],
            }}
            _focus={{
              bg: colorMode === "light" ? colors.grey[0] : colors.grey[1000],
            }}
          >
            <Address>{address}</Address>
          </Button>
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent border="none" borderRadius={10} minWidth="464px">
          <PopoverBody
            bg={colorMode === "light" ? colors.grey[0] : colors.grey[1000]}
            borderRadius={10}
            padding="16px"
            display="flex"
            flexDirection="column"
            gap="8px"
          >
            <Text fontWeight={700}>Account 1</Text>
            <WalletCard
              title="Connected with MetaMask"
              action={<WalletCardButton onClick={onChangeWallet}>Change wallet</WalletCardButton>}
            >
              <Stack direction="row" alignItems="center" gap="8px">
                <Avatar size="sm" src={avatar} />
                <Address copyable fontWeight={700} fontSize="md">
                  {address}
                </Address>
              </Stack>
            </WalletCard>
            <WalletCard
              title="Recent Transactions"
              titleIcon={<ArrowDownLeftIcon />}
              action={
                <WalletCardButton onClick={onClearAllTransaction}>Clear all</WalletCardButton>
              }
              onClickTitle={handleClickRecenTransactions}
            >
              <Text
                fontSize="sm"
                color={colorMode === "light" ? colors.grey[700] : colors.grey[400]}
              >
                Your transaction will appear here
              </Text>
            </WalletCard>
            <WalletDisconnect onClick={onDisconnect}>Disconnect wallet</WalletDisconnect>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
