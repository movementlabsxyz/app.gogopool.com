import { BoxProps, Stack, Text, useColorModeValue, useTheme } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";

import { Card } from "@/common/components/Card";

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
  const { colors } = useTheme();

  return (
    <Card
      border={`1px solid ${useColorModeValue(colors.grey[700], colors.grey[500])}`}
      bg={useColorModeValue("white", "black")}
      borderRadius={10}
      padding="12px"
      display="flex"
      flexDirection="column"
      gap="8px"
      width="auto"
      {...props}
    >
      <Stack direction="row" justify="space-between" alignItems="center">
        <Stack direction="row" cursor={onClickTitle ? "pointer" : "auto"} onClick={onClickTitle}>
          <Text fontSize="xs" color={useColorModeValue(colors.grey[700], colors.grey[400])}>
            {title}
          </Text>
          {titleIcon}
        </Stack>
        {action}
      </Stack>
      {children}
    </Card>
  );
};
