import { CustomIcon } from "./CustomIcon";
import { CustomIconProps } from "./types";

export const CrossIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M18 6L6 18"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </CustomIcon>
);
