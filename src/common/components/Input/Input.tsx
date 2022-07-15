import { Flex, Input as ChakraInput, InputProps, Text } from "@chakra-ui/react";

import { InfoCircleIcon } from "../CustomIcon";

const DEFAULT_HEIGHT = 42;

type ErrorInputProps =
  | {
      errorText: string;
      isInvalid: boolean;
    }
  | { errorText?: string; isInvalid?: boolean };

export type CustomInputProps = InputProps & ErrorInputProps;

export const Input = ({ errorText, ...props }: CustomInputProps) => {
  return (
    <>
      <ChakraInput
        style={{ boxShadow: "none" }}
        fontFamily="Jost"
        outline={0}
        _placeholder={{ color: "grey.500" }}
        _hover={{ borderColor: "grey.300" }}
        errorBorderColor="error.500"
        borderRadius="full"
        height={DEFAULT_HEIGHT}
        {...props}
      />
      {props.isInvalid ? (
        <Flex justifyContent="flex-start" alignItems="center" marginTop={1}>
          <InfoCircleIcon fill="#FF2A29" />
          <Text
            marginLeft={1}
            fontSize="xs"
            lineHeight="18px"
            color="error.500"
          >
            {errorText}
          </Text>
        </Flex>
      ) : null}
    </>
  );
};
