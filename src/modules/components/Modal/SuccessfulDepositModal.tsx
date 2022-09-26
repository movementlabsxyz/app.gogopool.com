import { Box, Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { ModalBody, ModalHeader } from "@/common/components/Modal";

import { TransactionHash } from "./TransactionHash";

export interface SuccessfulDepositModalProps {
  amount: number;
  token: string;
  transactionHash: string;
}

export const SuccessfulDepositModal: FunctionComponent<
  SuccessfulDepositModalProps
> = ({ amount, token, transactionHash }) => {
  return (
    <>
      <ModalHeader>
        <Heading textAlign="center" size="h5" color="grey.1000">
          successful deposit modal
        </Heading>
      </ModalHeader>
      <ModalBody>
        <Text textAlign="center" color="grey.600">
          You've successfully deposited{" "}
          <Box as="span" fontWeight={700}>{`${amount} ${token}!`}</Box> 😄
        </Text>
        <TransactionHash transactionHash={transactionHash} />
      </ModalBody>
    </>
  );
};
