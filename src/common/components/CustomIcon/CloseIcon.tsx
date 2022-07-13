import { CustomIcon } from "./CustomIcon";
import { CustomIconProps } from "./types";

export const CloseIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M12 4L4 12"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 4L12 12"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </CustomIcon>
);
