import { CustomIcon } from "./CustomIcon";
import { CustomIconProps } from "./types";

export const CaretLeftIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M15 18L9 12L15 6"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </CustomIcon>
);
