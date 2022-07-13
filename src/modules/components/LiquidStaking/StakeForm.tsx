import {
  Box,
  Divider,
  Flex,
  FormLabel,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

import { AvalancheIcon } from "@/common/components/CustomIcon/AvalancheIcon";

export interface StakeFormProps {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
}

export const StakeForm = ({ amount, setAmount }: StakeFormProps): JSX.Element => {
  return (
    <>
      <FormLabel mb="1" id="stake-avax" htmlFor="stake-avax-form">
        <Text size="sm" fontWeight="600" color="grey.600">
          STAKE AVAX
        </Text>
      </FormLabel>
      <Flex
        flexDir={{ base: "column", sm: "row" }}
        alignItems={{ base: "flex-start", sm: "center" }}
        mb={{ base: "2", sm: "4" }}
        gap="2"
      >
        <InputGroup variant="unstyled" display="flex" alignItems="center">
          <InputLeftElement height="full" children={<AvalancheIcon />} />
          <NumberInput defaultValue={0} ml="8">
            <NumberInputField
              fontWeight="bold"
              fontSize="32px"
              className="pxxl"
              id="stake-avax-form"
              value={amount}
              onChange={(e): void => setAmount(Number(e.target.value))}
            />
          </NumberInput>
        </InputGroup>
        <Flex>
          <Text size={{ base: "xs", sm: "xl" }} fontWeight="bold">
            <Box as="span" display={{ base: null, sm: "none" }}>
              Value:{" "}
            </Box>
            $0
          </Text>
        </Flex>
      </Flex>
      <Divider
        borderColor="grey.300"
        mb="2"
        display={{ base: null, sm: "none" }}
      />
      <FormLabel m="0">
        <Text size="xs" color="grey.600">
          BALANCE: 9878124.23 AVAX
        </Text>
      </FormLabel>
    </>
  );
};
