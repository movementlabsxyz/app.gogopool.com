import { CustomIcon } from "./CustomIcon";

interface CustomIconProps {
  size?: string;
}

export const CaretRightIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M9 18L15 12L9 6"
      fill="none"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </CustomIcon>
);
