import { Box, Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { Button } from "@/common/components/Button";
import { Modal, ModalBody, ModalHeader } from "@/common/components/Modal";

export interface FailedDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FailedDepositModal: FunctionComponent<FailedDepositModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      headerImage={<Box width="178px" height="98px" bgColor="red.300" mb="8" />}
      ctaButton={
        <>
          <Button size="sm" variant="secondary-outline" full onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" variant="secondary-filled" full onClick={onClose}>
            Try again
          </Button>
        </>
      }
    >
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
    </Modal>
  );
};
