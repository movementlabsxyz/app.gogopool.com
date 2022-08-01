import {
  Divider,
  Flex,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

const parse = (val) => (!val || val < 0 ? 0 : val);

type HasIconInput =
  | {
      hasIcon: true;
      icon: ReactNode;
      minInputWidth: string;
      inputWidth: string;
    }
  | {
      hasIcon?: false;
      icon?: undefined;
      minInputWidth?: undefined;
      inputWidth?: undefined;
    };

type StakeInputProps = {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  exchangeRate?: number;
  currencySymbol?: string;
  balance: number;
  token: string;
  title: string;
} & HasIconInput;

export const StakeInput = ({
  title,
  hasIcon = false,
  icon,
  token,
  minInputWidth,
  inputWidth,
  amount,
  setAmount,
  exchangeRate,
  balance,
  currencySymbol,
}: StakeInputProps) => {
  return (
    <Stack bg="grey.100" rounded="2xl" px="4" py={3}>
      <Flex justifyContent="space-between" alignItems="center" mb={2} gap="2">
        <Text size="xs" fontWeight="600" color="grey.600" whiteSpace="nowrap">
          {title}
        </Text>
        <InputGroup variant="unstyled" justifyContent="flex-end">
          <NumberInput
            value={amount}
            onChange={(value) => {
              setAmount(parse(value));
            }}
            min={0}
            keepWithinRange={true}
          >
            {hasIcon && <InputLeftElement height="full" children={icon} />}
            <NumberInputField
              width={inputWidth}
              minW={minInputWidth}
              paddingInlineEnd={0}
              textAlign="right"
              placeholder="0.0"
              fontWeight="bold"
              fontSize="24px"
              lineHeight="36px"
              className="pxxl"
              id="stake-avax-form"
            />
          </NumberInput>
        </InputGroup>
      </Flex>
      <Divider borderColor="grey.300" mb="2" />
      <Flex justifyContent="space-between">
        <Text size="xs" color="grey.600">
          {`BALANCE: ${balance} ${token}`}
        </Text>

        {exchangeRate?.toString() && exchangeRate !== 0 ? (
          <Text color="grey.600">
            1 {token} = {currencySymbol}
            {exchangeRate}
          </Text>
        ) : null}
      </Flex>
    </Stack>
  );
};
