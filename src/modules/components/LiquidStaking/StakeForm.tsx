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
      <FormLabel mb="1">
        <Text size="sm" fontWeight="600" className="text-grey-600">
          STAKE AVAX
        </Text>
      </FormLabel>
      <InputGroup variant="unstyled" display="flex" alignItems="center" mb="4">
        <InputLeftElement
          height="full"
          children={<div className="h-6 w-6 rounded-full bg-red-500" />}
        />
        <NumberInput defaultValue={0} ml="8">
          <NumberInputField
            fontWeight="bold"
            fontSize="32px"
            className="pxxl"
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
        <Text size="xs" className="text-grey-600">
          BALANCE: 9878124.23 AVAX
        </Text>
      </FormLabel>
    </>
  );
};
