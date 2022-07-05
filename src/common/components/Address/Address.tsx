import { Box, Stack, Text, TextProps, useColorMode, useTheme } from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren, ReactNode } from "react";

import { CopyIcon } from "@/common/components/CustomIcon/CopyIcon";
import { CustomIcon } from "@/common/components/CustomIcon/CustomIcon";

interface CopyableAddressProps {
  text?: string;
}

export interface AddressProps extends Omit<TextProps, "onCopy"> {
  startLength?: number;
  lastLength?: number;
  truncate?: boolean;
  ellipsis?: ReactNode;
  copyable?: CopyableAddressProps | boolean;
}

export const Address: FunctionComponent<PropsWithChildren<AddressProps>> = ({
  children,
  startLength = 5,
  lastLength = -4,
  truncate = true,
  ellipsis = "..",
  copyable = false,
  fontSize = "sm",
  fontWeight = 400,
  ...props
}): JSX.Element => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const startLetter = children.toString().slice(0, startLength);
  const lastLetter = children.toString().slice(lastLength);

  const handleCopy = (): void => {
    // TODO: Add tooltip when user copied the address
    if (copyable && (copyable as CopyableAddressProps).text) {
      navigator.clipboard.writeText((copyable as CopyableAddressProps).text);
    } else {
      navigator.clipboard.writeText(children.toString());
    }
  };

  return (
    <Stack direction="row" alignItems="center" gap="2px">
      <Text
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={colorMode === "light" ? colors.grey[1000] : colors.grey[0]}
        {...props}
      >
        {truncate ? startLetter + ellipsis + lastLetter : children}
      </Text>
      {Boolean(copyable) && (
        <Box as="button" aria-label="copy" onClick={handleCopy}>
          <CustomIcon>
            <CopyIcon />
          </CustomIcon>
        </Box>
      )}
    </Stack>
  );
};
