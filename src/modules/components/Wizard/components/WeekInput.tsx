import { Divider, Flex, InputGroup, Stack, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

import { NumberInput } from "@/common/components/NumberInput";

export interface WeekInputProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  title?: string;
  disabled?: boolean;
}

const sanitize = (input: number): number => {
  return input % 2 === 0 ? input : input - 1;
};

const WeekInput = ({
  value,
  setValue,
  title,
  disabled,
}: WeekInputProps): JSX.Element => {
  return (
    <Stack bg="grey.100" rounded="2xl" px="4" py={3} my={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={2} gap="2">
        {title && (
          <Text size="m" fontWeight="600" color="grey.600" whiteSpace="nowrap">
            {title}
          </Text>
        )}
        <InputGroup variant="unstyled" justifyContent="flex-end">
          <NumberInput
            min={2}
            max={52}
            step={2}
            isDisabled={disabled}
            keepWithinRange={true}
            value={value}
            onChange={(_, value) => {
              setValue(sanitize(value));
            }}
            minInputWidth="96px"
            inputWidth={`${value.toString().length * 16 + 24}px`}
          />
        </InputGroup>
      </Flex>
      <Divider borderColor="grey.300" mb="2" />
      <Flex justifyContent="space-between">
        <Text size="xs" color="grey.600">
          Minimum 2 weeks
        </Text>
        <Text size="xs" color="grey.600">
          Maximum 52 weeks
        </Text>
      </Flex>
    </Stack>
  );
};

export default WeekInput;
