import { Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { ModalBody, ModalHeader } from "@/common/components/Modal";

export interface FailedDepositModalProps {}

export const FailedDepositModal: FunctionComponent<
  FailedDepositModalProps
> = () => {
  return (
    <>
      <ModalHeader>
        <Heading textAlign="center" size="h5" color="grey.1000">
          Deposit Failed! 😢
        </Heading>
      </ModalHeader>
      <ModalBody>
        <Text textAlign="center" color="grey.600">
          Sorry, you don't have enough AVAX to make a deposit. Please add more
          AVAX to your wallet and try another deposit.
        </Text>
      </ModalBody>
    </>
  );
};
