import { CustomIcon } from "./CustomIcon";

interface CustomIconProps {
  size?: string;
}

export const InfoIcon = (props: CustomIconProps) => (
  <CustomIcon {...props}>
    <path
      d="M1.99999 11.9993C1.99999 6.4753 6.47699 1.9993 12 1.9993C17.523 1.9993 22 6.4753 22 11.9993C22 17.5213 17.523 21.9993 12 21.9993C6.477 21.9993 1.99999 17.5213 1.99999 11.9993"
      fill="#5D5D64"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.1301 11.3692C11.1301 10.8872 11.5231 10.4942 12.0051 10.4942C12.4871 10.4942 12.8801 10.8872 12.8801 11.3692L12.8801 15.7892C12.8801 16.2712 12.4871 16.6642 12.0051 16.6642C11.5231 16.6642 11.1301 16.2712 11.1301 15.7892L11.1301 11.3692ZM12.8752 8.19593C12.8752 8.67793 12.4842 9.07094 12.0052 9.07094C11.5122 9.07094 11.1202 8.67793 11.1202 8.19593C11.1202 7.71393 11.5122 7.32093 11.9952 7.32093C12.4802 7.32093 12.8752 7.71393 12.8752 8.19593Z"
      fill="white"
    />
  </CustomIcon>
);
