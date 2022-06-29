import { CustomIcon } from "./CustomIcon";

interface CustomIconProps {
  size?: string;
}

export const CrossIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M18 6L6 18"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </CustomIcon>
);
