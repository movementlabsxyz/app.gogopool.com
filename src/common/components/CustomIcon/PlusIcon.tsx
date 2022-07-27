import { CustomIcon } from "./CustomIcon";
import { CustomIconProps } from "./types";

export const PlusIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M12 5V19"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 12H19"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </CustomIcon>
);
