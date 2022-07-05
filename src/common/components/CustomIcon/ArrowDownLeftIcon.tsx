import { useColorMode } from "@chakra-ui/react";

import { CustomIcon } from "./CustomIcon";
import { CustomIconProps } from "./types";

export const ArrowDownLeftIcon = (props: CustomIconProps) => {
  const { colorMode } = useColorMode();

  return (
    <CustomIcon {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.734835 6.73483C0.588388 6.88128 0.588388 7.11872 0.734835 7.26516C0.881282 7.41161 1.11872 7.41161 1.26516 7.26516L6.625 1.90533L6.625 5.875C6.625 6.08211 6.79289 6.25 7 6.25C7.20711 6.25 7.375 6.08211 7.375 5.875L7.375 1.00006L7.375 1C7.375 0.949154 7.36488 0.900671 7.34655 0.856456C7.32825 0.812227 7.30112 0.770789 7.26517 0.734835C7.22921 0.698881 7.18777 0.671754 7.14354 0.653454C7.09933 0.635119 7.05085 0.625 7 0.625L2.125 0.625C1.91789 0.625 1.75 0.792892 1.75 1C1.75 1.20711 1.91789 1.375 2.125 1.375L6.09467 1.375L0.734835 6.73483Z"
        fill={colorMode === "light" ? "black" : "#A7A7B1"}
      />
    </CustomIcon>
  );
};
