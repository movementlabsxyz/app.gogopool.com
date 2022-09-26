import { Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { ModalBody, ModalHeader } from "@/common/components/Modal";

import { TransactionHash } from "./TransactionHash";

export interface FailedDepositModalProps {
  transactionHash: string;
}

export const FailedDepositModal: FunctionComponent<FailedDepositModalProps> = ({
  transactionHash,
}) => {
  return (
    <>
      <ModalHeader>
        <Heading textAlign="center" size="h5" color="grey.1000">
          Deposit Failed! 😢
        </Heading>
      </ModalHeader>
      <ModalBody>
        <Text textAlign="center" color="grey.600">
          Transaction Hash: {transactionHash}
        </Text>

        <Text textAlign="center" color="grey.600">
          Sorry, you don't have enough AVAX to make a deposit. Please add more
          AVAX to your wallet and try another deposit.
        </Text>
        <TransactionHash transactionHash={transactionHash} />
      </ModalBody>
    </>
  );
};
