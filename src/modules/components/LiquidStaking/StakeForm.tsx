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
import { BigNumber } from "ethers";
import { Dispatch, SetStateAction } from "react";

import { AvalancheIcon } from "@/common/components/CustomIcon/AvalancheIcon";

export interface StakeFormProps {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  setReward: Dispatch<SetStateAction<number>>;
  balance: number | BigNumber;
}

export const StakeForm = ({
  amount,
  setAmount,
  setReward,
  balance,
}: StakeFormProps): JSX.Element => {
  const parse = (val) => (!val || val < 0 ? 0 : val);

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
          <NumberInput
            ml="8"
            value={amount}
            onChange={(value) => setAmount(parse(value))} // change Reward accordingly
            defaultValue={0}
            min={0}
            keepWithinRange={true}
          >
            <NumberInputField
              fontWeight="bold"
              fontSize="32px"
              className="pxxl"
              id="stake-avax-form"
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
          {`BALANCE: ${balance} AVAX`}
        </Text>
      </FormLabel>
    </>
  );
};
