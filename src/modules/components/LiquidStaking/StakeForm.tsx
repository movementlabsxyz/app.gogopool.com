import {
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
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
      <InputGroup variant="unstyled" display="flex" alignItems="center" mb="4">
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
