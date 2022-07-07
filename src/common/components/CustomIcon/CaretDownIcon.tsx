import { useColorModeValue, useTheme } from "@chakra-ui/react";

import { CustomIcon } from "./CustomIcon";
import { CustomIconProps } from "./types";

export const CaretDownIcon = (props: CustomIconProps) => {
  const { colors } = useTheme();
  const strokeColor = useColorModeValue("#000000", colors.grey[400]);

  return (
    <CustomIcon {...props}>
      <path
        d="M6 9L12 15L18 9"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </CustomIcon>
  );
};
