import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from "@chakra-ui/react";

interface Props {
  minInputWidth?: string;
  inputWidth?: string;
}

export type InputProps = NumberInputProps & Props;

const DEFAULT_HEIGHT = 42;

export const NI = (props: InputProps) => {
  return (
    <NumberInput
      style={{ boxShadow: "none" }}
      fontFamily="Jost"
      outline={0}
      _placeholder={{ color: "grey.500" }}
      _hover={{ borderColor: "grey.300" }}
      errorBorderColor="error.500"
      borderRadius="full"
      height={DEFAULT_HEIGHT}
      {...props}
    >
      <NumberInputField
        width={props.inputWidth}
        minW={props.minInputWidth}
        textAlign="right"
        placeholder="0.0"
        fontWeight="bold"
        fontSize="24px"
        lineHeight="36px"
        className="pxxl"
      />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};
