import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    rounded: "full",
    fontWeight: "bold",
    _disabled: {
      opacity: "40%",
    },
    width: "fit-content",
  },
  sizes: {
    xs: {
      paddingX: "20px",
      paddingY: "6px",
      fontSize: "14px",
      lineHeight: "22px",
    },
    sm: {
      paddingX: "20px",
      paddingY: "10px",
      fontSize: "14px",
      lineHeight: "22px",
    },
    md: {
      paddingX: "24px",
      paddingY: "12px",
      fontSize: "16px",
      lineHeight: "24px",
    },
    lg: {
      paddingX: "28px",
      paddingY: "14px",
      fontSize: "18px",
      lineHeight: "28px",
    },
    "iconOnly-xs": {
      height: "34px",
      width: "34px",
      padding: "10px",
    },
    "iconOnly-sm": {
      height: "42px",
      width: "42px",
      padding: "14px",
    },
    "iconOnly-md": {
      height: "48px",
      width: "48px",
      padding: "16px",
    },
    "iconOnly-lg": {
      height: "58px",
      width: "58px",
      padding: "20px",
    },
  },
  variants: {
    primary: {
      bgColor: "green.500",
      _hover: {
        bgColor: "green.550",
      },
    },
    "secondary-filled": {
      color: "grey.0",
      bgColor: "blue.500",
      _hover: {
        bgColor: "blue.550",
      },
    },
    "secondary-outline": {
      color: "blue.500",
      borderWidth: "2px",
      borderColor: "blue.500",
      _hover: {
        color: "blue.550",
        borderColor: "blue.550",
      },
    },
    "destructive-outline": {
      color: "error.500",
      borderWidth: "2px",
      borderColor: "error.500",
      _hover: {
        color: "error.600",
        borderColor: "error.600",
      },
    },
  },
  defaultProps: {
    variant: "primary",
    size: "md",
  },
};
