import { CustomIcon } from "./CustomIcon";
import { CustomIconProps } from "./types";

export const CaretUpIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M18 15L12 9L6 15"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </CustomIcon>
);
