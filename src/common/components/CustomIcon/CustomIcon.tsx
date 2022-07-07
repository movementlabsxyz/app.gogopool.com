import { PropsWithChildren } from "react";

import { CustomIconProps } from "./types";

export const CustomIcon = ({
  children,
  width = 24,
  height = 24,
  size,
  viewBox = "0 0 24 24",
  name,
  ...props
}: PropsWithChildren<CustomIconProps>): JSX.Element => {
  return (
    <svg
      aria-labelledby={name}
      height={size || height}
      role="presentation"
      viewBox={viewBox}
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};
