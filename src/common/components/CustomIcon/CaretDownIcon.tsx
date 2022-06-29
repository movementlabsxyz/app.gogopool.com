import { CustomIcon } from "./CustomIcon";

interface CustomIconProps {
  size?: string;
}

export const CaretDownIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M6 9L12 15L18 9"
      fill="none"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </CustomIcon>
);
