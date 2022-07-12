import { Input as ChakraInput, InputProps } from "@chakra-ui/react";

const DEFAULT_HEIGHT = 42;

export const Input = (props: InputProps) => {
  return (
    <ChakraInput
      style={{ boxShadow: "none" }}
      fontFamily="Jost"
      outline={0}
      borderColor="grey.200"
      _placeholder={{ color: "grey.500" }}
      _hover={{ borderColor: "grey.300" }}
      errorBorderColor="error.500"
      borderRadius="full"
      height={DEFAULT_HEIGHT}
      {...props}
    />
  );
};
