import { Box, BoxProps, Heading, TextProps } from "@chakra-ui/react";
import { forwardRef } from "react";

interface BoxPropsWithStyles extends BoxProps {
  outer?: boolean;
  customStyles?: React.CSSProperties;
}

interface TextPropsWithStyles extends TextProps {
  customStyles?: React.CSSProperties;
}

export const Card = forwardRef<HTMLDivElement, BoxPropsWithStyles>(
  (
    {
      children,
      backgroundColor = "white",
      maxWidth = "588px",
      minWidth = "334px",
      width = "auto",
      maxHeight = "auto",
      height = "auto",
      p = "1.5rem", // 24px
      boxShadow = "default",
      borderRadius = "1.25rem", // 8px
      outer = false,
      customStyles,
      ...rest
    },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        width={outer ? "full" : width}
        p={p}
        height={height}
        maxWidth={outer && maxWidth}
        minWidth={outer && minWidth}
        maxHeight={maxHeight}
        borderRadius={borderRadius}
        bg={backgroundColor}
        boxShadow={boxShadow}
        borderWidth={outer && "1px"}
        borderColor="grey.200"
        sx={customStyles}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);

export const Title = forwardRef<HTMLDivElement, TextPropsWithStyles>(
  ({ children, customStyles, ...rest }, ref) => {
    return (
      <Heading
        ref={ref}
        size="h5"
        fontWeight="bold"
        mb="8"
        sx={customStyles}
        {...rest}
      >
        {children}
      </Heading>
    );
  }
);

export const Content = forwardRef<HTMLDivElement, BoxPropsWithStyles>(
  ({ children, customStyles, ...rest }, ref) => {
    return (
      <Box ref={ref} {...rest} sx={customStyles}>
        {children}
      </Box>
    );
  }
);

export const Footer = forwardRef<HTMLDivElement, BoxPropsWithStyles>(
  ({ children, customStyles, ...rest }, ref) => {
    return (
      <Box ref={ref} mt="8" {...rest} sx={customStyles}>
        {children}
      </Box>
    );
  }
);

const _default = Object.assign(Card, { Title, Content, Footer });

export default _default;
