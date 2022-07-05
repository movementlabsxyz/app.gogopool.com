import { useColorMode, useTheme } from "@chakra-ui/react";

import { Button, ButtonProps } from "@/common/components/Button";

export type WalletDisconnectProps = ButtonProps;

export const WalletDisconnect: React.FC<WalletDisconnectProps> = ({
  children,
  ...props
}: WalletDisconnectProps): JSX.Element => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();

  return (
    <Button
      marginTop="8px"
      size="sm"
      full
      bg="transparent"
      border={`1px solid ${colors.error[500]}`}
      color={colorMode === "light" ? colors.error[500] : colors.error[500]}
      _hover={{
        bg: colorMode === "light" ? colors.grey[200] : colors.grey[900],
      }}
      _active={{
        bg: colorMode === "light" ? colors.grey[200] : colors.grey[900],
      }}
      _focus={{
        bg: colorMode === "light" ? colors.grey[200] : colors.grey[900],
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
