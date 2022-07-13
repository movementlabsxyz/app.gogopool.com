import {
  Flex,
  Tooltip as ChakraTooltip,
  TooltipProps,
  useBoolean,
} from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";

import { CloseIcon } from "../CustomIcon";

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

enum TooltipVariant {
  default = "default",
  persistent = "persistent",
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

type VariantProps =
  | {
      variant?: "default";
      defaultIsOpen?: boolean;
    }
  | {
      variant?: "persistent";
      defaultIsOpen: boolean;
    };

export type CustomTooltipProps = {
  placement?: OriginalOptions | AdditionalOptions;
  content: ReactNode;
  children: ReactNode;
  chakraUIprops?: Omit<TooltipProps, "variant">;
} & VariantProps;

export const Tooltip = ({
  placement = "bottom",
  variant = TooltipVariant.default,
  content,
  children,
  defaultIsOpen,
  chakraUIprops,
}: CustomTooltipProps) => {
  const [modifiers, tooltipPlacement] = getModifiers(placement);
  const [visible, setVisible] = useBoolean(!!defaultIsOpen);
  const [displayAlready, setDisplayAlready] = useBoolean(false)

  let label = content;

  const isPersistent = variant === TooltipVariant.persistent;
  
  const handleClose = () => {
    setVisible.off()
    setDisplayAlready.on()
  }

  useEffect(() => {
    if (isPersistent && defaultIsOpen && !displayAlready) {
      setVisible.on();
    }
  }, [defaultIsOpen]);

  if (isPersistent) {
    label = (
      <Flex justifyContent="center" alignItems="center">
        <CloseIcon
          width={16}
          height={16}
          style={{ marginRight: 8 }}
          viewBox="0 0 16 16"
          onClick={handleClose}
          pointerEvents="auto"
        />
        {content}
      </Flex>
    );
  }

  return (
    <ChakraTooltip
      modifiers={modifiers}
      hasArrow
      placement={tooltipPlacement}
      isOpen={isPersistent ? visible : undefined}
      label={label}
      bg="grey.900"
      color="grey.50"
      className={`tooltip_${tooltipPlacement}`}
      padding={2}
      borderRadius={6}
      borderWidth={1}
      borderColor="grey.800"
      {...chakraUIprops}
    >
      {children}
    </ChakraTooltip>
  );
};
