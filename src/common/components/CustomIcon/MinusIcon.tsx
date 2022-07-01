import { CustomIcon } from "./CustomIcon";
import { CustomIconProps } from "./types";

export const MinusIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M5 12H19"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </CustomIcon>
);
