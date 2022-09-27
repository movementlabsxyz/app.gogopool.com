import {
  Box,
  Stack,
  Text,
  TextProps,
  useColorModeValue,
  useTheme,
  useToast,
} from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren, ReactNode } from "react";

import { CopyIcon } from "@/common/components/CustomIcon/CopyIcon";

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
  const toast = useToast();
  const { colors } = useTheme();
  const startLetter = children.toString().slice(0, startLength);
  const lastLetter = children.toString().slice(lastLength);
  const textColor = useColorModeValue(colors.grey[1000], colors.grey[0]);

  const handleCopy = (): void => {
    if (copyable && (copyable as CopyableAddressProps).text) {
      navigator.clipboard.writeText((copyable as CopyableAddressProps).text);
    } else {
      navigator.clipboard.writeText(children.toString());
    }
    toast({
      title: "Copied to clipboard!",
      status: "success",
    });
  };

  return (
    <Stack direction="row" alignItems="center" gap="2px">
      <Text
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={textColor}
        {...props}
      >
        {truncate ? startLetter + ellipsis + lastLetter : children}
      </Text>
      {Boolean(copyable) && (
        <Box as="button" aria-label="copy" onClick={handleCopy}>
          <CopyIcon size="16" />
        </Box>
      )}
    </Stack>
  );
};
