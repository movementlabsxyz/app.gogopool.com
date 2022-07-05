import { Tooltip as ChakraTooltip, TooltipProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

enum OriginalPosition {
  top = "top",
  bottom = "bottom",
  right = "right",
  left = "left",
}
enum AdditionPosition {
  top_left = "top_left",
  top_right = "top_right",
  bottom_left = "bottom_left",
  bottom_right = "bottom_right",
}

const tooltipToLeft = {
  name: "offset",
  options: {
    offset: ({ popper }) => [-popper.width / 2 + 20, 5],
  },
};
const tooltipToRight = {
  name: "offset",
  options: {
    offset: ({ popper }) => [popper.width / 2 - 20, 5],
  },
};

const modifiersMapping = {
  top_left: [tooltipToLeft],
  bottom_left: [tooltipToLeft],
  top_right: [tooltipToRight],
  bottom_right: [tooltipToRight],
};

type OriginalOptions = keyof typeof OriginalPosition;
type AdditionalOptions = keyof typeof AdditionPosition;

const getModifiers = (
  placement: OriginalOptions | AdditionalOptions
): [unknown[], OriginalOptions] => {
  if (modifiersMapping[placement]) {
    return [
      modifiersMapping[placement],
      placement.split("_")[0] as OriginalOptions,
    ];
  }
  return [[], placement as OriginalOptions];
};

type CustomTooltipProps = {
  placement?: OriginalOptions | AdditionalOptions;
  content: ReactNode;
  children: ReactNode;
  chakraUIStyle?: Omit<TooltipProps, "children">;
};

export const Tooltip = ({
  placement = "bottom",
  content,
  chakraUIStyle = {},
  children,
}: CustomTooltipProps) => {
  const [modifiers, tooltipPlacement] = getModifiers(placement);

  return (
    <ChakraTooltip
      modifiers={modifiers}
      hasArrow
      placement={tooltipPlacement}
      label={content}
      bg="grey.900"
      color="grey.50"
      className={`tooltip_${tooltipPlacement}`}
      padding={2}
      borderRadius={6}
      borderWidth={1}
      borderColor="grey.800"
      {...chakraUIStyle}
    >
      {children}
    </ChakraTooltip>
  );
};
