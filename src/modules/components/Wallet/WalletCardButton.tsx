import { useColorModeValue, useTheme } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { Button, ButtonProps } from "@/common/components/Button";

export type WalletCardButtonProps = ButtonProps;

export const WalletCardButton: FunctionComponent<WalletCardButtonProps> = ({
  children,
  ...props
}: WalletCardButtonProps): JSX.Element => {
  const { colors } = useTheme();
  const bgColor = useColorModeValue(colors.grey[100], colors.grey[800]);
  const color = useColorModeValue(colors.grey[1000], colors.grey[0]);
  const _bgColor = useColorModeValue(colors.grey[200], colors.grey[900]);

  return (
    <Button
      paddingX="8px"
      paddingY="4px"
      fontWeight={400}
      fontSize="0.625rem"
      bg={bgColor}
      color={color}
      _hover={{
        bg: _bgColor,
      }}
      _active={{
        bg: _bgColor,
      }}
      _focus={{
        bg: _bgColor,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
