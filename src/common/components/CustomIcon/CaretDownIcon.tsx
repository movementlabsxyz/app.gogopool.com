import { useColorMode, useTheme } from "@chakra-ui/react";

import { CustomIcon } from "./CustomIcon";
import { CustomIconProps } from "./types";

export const CaretDownIcon = (props: CustomIconProps) => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();

  return (
    <CustomIcon {...props}>
      <path
        d="M6 9L12 15L18 9"
        fill="none"
        stroke={colorMode === "light" ? "black" : colors.grey[400]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </CustomIcon>
  );
};
