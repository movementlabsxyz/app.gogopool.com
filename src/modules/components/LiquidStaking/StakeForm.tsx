import {
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";

export const StakeForm = () => {
  return (
    <>
      <FormLabel mb="1" id="stake-avax" htmlFor="stake-avax-form">
        <Text size="sm" fontWeight="600" color="grey.600">
          STAKE AVAX
        </Text>
      </FormLabel>
      <InputGroup variant="unstyled" display="flex" alignItems="center" mb="4">
        <InputLeftElement
          height="full"
          children={<div className="w-6 h-6 bg-red-500 rounded-full" />}
        />
        <NumberInput defaultValue={0} ml="8">
          <NumberInputField
            fontWeight="bold"
            fontSize="32px"
            className="pxxl"
            id="stake-avax-form"
          />
        </NumberInput>
        <InputRightElement
          height="full"
          children={
            <Text size="xl" fontWeight="bold">
              $0
            </Text>
          }
        />
      </InputGroup>
      <FormLabel>
        <Text size="xs" color="grey.600">
          BALANCE: 9878124.23 AVAX
        </Text>
      </FormLabel>
    </>
  );
};
