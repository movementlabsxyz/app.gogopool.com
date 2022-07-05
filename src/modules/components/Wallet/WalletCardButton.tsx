import { useColorMode, useTheme } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { Button, ButtonProps } from "@/common/components/Button";

export type WalletCardButtonProps = ButtonProps;

export const WalletCardButton: FunctionComponent<WalletCardButtonProps> = ({
  children,
  ...props
}: WalletCardButtonProps): JSX.Element => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();

  return (
    <Button
      paddingX="8px"
      paddingY="4px"
      fontWeight={400}
      fontSize="0.625rem"
      bg={colorMode === "light" ? colors.grey[100] : colors.grey[800]}
      color={colorMode === "light" ? colors.grey[1000] : colors.grey[0]}
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
