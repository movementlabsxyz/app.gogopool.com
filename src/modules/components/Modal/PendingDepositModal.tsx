import { Heading } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { ModalBody, ModalHeader } from "@/common/components/Modal";

import { TransactionHash } from "./TransactionHash";
export interface PendingDepositModalProps {
  transactionHash: string;
}

export const PendingDepositModal: FunctionComponent<
  PendingDepositModalProps
> = ({ transactionHash }) => {
  return (
    <>
      <ModalHeader>
        <Heading textAlign="center" size="h5" color="grey.1000">
          Transaction pending...
        </Heading>
      </ModalHeader>
      <ModalBody>
        <TransactionHash transactionHash={transactionHash} />
      </ModalBody>
    </>
  );
};
