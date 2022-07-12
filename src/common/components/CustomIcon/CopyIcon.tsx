import { useColorModeValue } from "@chakra-ui/react";

import { CustomIcon } from "./CustomIcon";
import { CustomIconProps } from "./types";

export const CopyIcon = ({ height = 12, width = 12, ...props }: CustomIconProps) => {
  const strokeColor = useColorModeValue("#000000", "#A8A8A8");

  return (
    <CustomIcon height={height} width={width} {...props}>
      <rect
        x="4"
        y="8"
        width="12"
        height="12"
        rx="2"
        stroke={strokeColor}
        fill="transparent"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.47059 4H18C19.1046 4 20 4.89543 20 6V14C20 15.1046 19.1046 16 18 16H16V10C16 8.89543 15.1046 8 14 8H8V5.47059C8 4.6584 8.6584 4 9.47059 4Z"
        stroke={strokeColor}
        fill="transparent"
        strokeWidth="2"
      />
    </CustomIcon>
  );
};
