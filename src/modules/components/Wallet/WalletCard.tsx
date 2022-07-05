import { Box, BoxProps, Stack, Text, useColorMode, useTheme } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";

export interface WalletCardProps extends Omit<BoxProps, "title"> {
  title?: ReactNode;
  titleIcon?: ReactNode;
  action?: ReactNode;
  onClickTitle?: () => void;
}

export const WalletCard: FunctionComponent<WalletCardProps> = ({
  children,
  title,
  titleIcon,
  action,
  onClickTitle,
  ...props
}: WalletCardProps): JSX.Element => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();

  return (
    <Box
      border={`1px solid ${colorMode === "light" ? colors.grey[700] : colors.grey[500]}`}
      borderRadius={10}
      padding="12px"
      display="flex"
      flexDirection="column"
      gap="8px"
      {...props}
    >
      <Stack direction="row" justify="space-between" alignItems="center">
        <Stack direction="row" onClick={onClickTitle}>
          <Text fontSize="xs" color={colorMode === "light" ? colors.grey[700] : colors.grey[400]}>
            {title}
          </Text>
          {titleIcon}
        </Stack>
        {action}
      </Stack>
      {children}
    </Box>
  );
};
