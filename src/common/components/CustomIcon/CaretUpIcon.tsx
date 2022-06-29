import { CustomIcon } from "./CustomIcon";

interface CustomIconProps {
  size?: string;
}

export const CaretUpIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M18 15L12 9L6 15"
      fill="none"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </CustomIcon>
);
