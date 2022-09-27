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
import { CaretRightIcon } from "@/common/components/CustomIcon/CaretRightIcon";
import { Tooltip } from "@/common/components/Tooltip";
import { sanitizeNumbers } from "@/utils";

export interface StakeFormProps {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  setReward: Dispatch<SetStateAction<number>>;
  balance: number;
  exchangeRate?: number;
  token?: string;
  header?: string;
  icon?: JSX.Element;
}

export const StakeForm = ({
  amount,
  setAmount,
  setReward,
  balance,
  exchangeRate,
  token = "AVAX",
  header,
  icon = <AvalancheIcon />,
}: StakeFormProps): JSX.Element => {
  const parse = (val) => (!val || val < 0 ? 0 : val);

  const price = isNaN(exchangeRate * amount) ? 0 : exchangeRate * amount;

  return (
    <>
      <FormLabel mb="1" id="stake-avax" htmlFor="stake-avax-form">
        <Text size="sm" fontWeight="600" color="grey.600">
          {header || "STAKE AVAX"}
        </Text>
      </FormLabel>
      <Flex
        flexDir={{ base: "column", sm: "row" }}
        alignItems={{ base: "flex-start", sm: "center" }}
        mb={{ base: "2", sm: "4" }}
        gap="2"
      >
        <InputGroup variant="unstyled" display="flex" alignItems="center">
          <Tooltip
            placement="bottom_right"
            variant="persistent"
            defaultIsOpen={amount >= 1000 && token === "AVAX"}
            content={
              <>
                <Text size="xxs">
                  {`With ${amount} AVAX deposited, you can start a Node validator in protocol. `}
                </Text>
                <Flex
                  flexDirection="row"
                  justifyContent="center"
                  alignContent="center"
                  width="80px"
                  onClick={() => null} // redirect somewhere
                >
                  <Text size="xxs" color="green.500" fontWeight={700}>
                    Learn more
                  </Text>
                  <CaretRightIcon
                    stroke="#49E988"
                    width={16}
                    height={16}
                    style={{ marginLeft: 2 }}
                  />
                </Flex>
              </>
            }
          >
            <InputLeftElement height="full" children={icon} />
          </Tooltip>
          <NumberInput
            ml="8"
            value={amount}
            onChange={(value) => {
              value = sanitizeNumbers(value);
              setAmount(parse(value));
              setReward(0); // change Reward accordingly
            }}
            min={0}
            keepWithinRange={true}
          >
            <NumberInputField
              placeholder="0.0"
              fontWeight="bold"
              fontSize="32px"
              className="pxxl"
              id="stake-avax-form"
            />
          </NumberInput>
        </InputGroup>
        {exchangeRate !== undefined && (
          <Flex>
            <Text size={{ base: "xs", sm: "xl" }} fontWeight="bold">
              <Box as="span" display={{ base: null, sm: "none" }}>
                Value:{" "}
              </Box>
              {`$${price?.toFixed(2) || 0}`}
            </Text>
          </Flex>
        )}
      </Flex>
      <Divider
        borderColor="grey.300"
        mb="2"
        display={{ base: null, sm: "none" }}
      />
      <FormLabel m="0">
        <Text size="xs" color="grey.600">
          {`BALANCE: ${balance} ${token}`}
        </Text>
      </FormLabel>
    </>
  );
};
