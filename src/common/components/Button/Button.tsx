import { Box, Button as ChakraButton } from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren, ReactElement } from "react";

export interface ButtonProps {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "primary" | "secondary-filled" | "secondary-outline" | "destructive-outline";
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  iconOnly?: ReactElement;
  full?: boolean;
  onClick?: () => void;
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  size = "md",
  variant = "primary",
  iconLeft,
  iconRight,
  iconOnly,
  full,
  children,
  onClick,
  ...props
}) => {
  return (
    <ChakraButton
      onClick={onClick}
      width={full && "100%"}
      size={iconOnly ? `iconOnly-${size}` : size}
      variant={variant}
      {...props}
    >
      {iconOnly ? (
        iconOnly
      ) : (
        <Box display="flex" flexDir="row" alignItems="center" justifyContent="center" columnGap="2">
          {iconLeft}
          {children}
          {iconRight}
        </Box>
      )}
    </ChakraButton>
  );
};
