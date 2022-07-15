import { CustomIcon } from "./CustomIcon";
import { CustomIconProps } from "./types";

export const InfoCircleIcon = (props: CustomIconProps) => (
  <CustomIcon width={12} height={12} viewBox="0 0 12 12" {...props}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6 1.875C3.72183 1.875 1.875 3.72183 1.875 6C1.875 8.27817 3.72183 10.125 6 10.125C8.27817 10.125 10.125 8.27817 10.125 6C10.125 3.72183 8.27817 1.875 6 1.875ZM1.125 6C1.125 3.30761 3.30761 1.125 6 1.125C8.69239 1.125 10.875 3.30761 10.875 6C10.875 8.69239 8.69239 10.875 6 10.875C3.30761 10.875 1.125 8.69239 1.125 6Z"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.25 5.625C5.25 5.41789 5.41789 5.25 5.625 5.25H6C6.20711 5.25 6.375 5.41789 6.375 5.625V7.875C6.58211 7.875 6.75 8.04289 6.75 8.25C6.75 8.45711 6.58211 8.625 6.375 8.625H6C5.79289 8.625 5.625 8.45711 5.625 8.25V6C5.41789 6 5.25 5.83211 5.25 5.625Z"
    />
    <path d="M5.90625 4.5C6.21691 4.5 6.46875 4.24816 6.46875 3.9375C6.46875 3.62684 6.21691 3.375 5.90625 3.375C5.59559 3.375 5.34375 3.62684 5.34375 3.9375C5.34375 4.24816 5.59559 4.5 5.90625 4.5Z" />
  </CustomIcon>
);
