import { Box, Heading, ModalProps, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { Button } from "@/common/components/Button";
import { Modal, ModalBody, ModalHeader } from "@/common/components/Modal";

export interface SuccessfulDepositModalProps
  extends Omit<ModalProps, "children"> {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  token: string;
}

export const SuccessfulDepositModal: FunctionComponent<
  SuccessfulDepositModalProps
> = ({ isOpen, onClose, amount, token, ...modalProps }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      headerImage={<Box width="178px" height="98px" bgColor="red.300" mb="8" />}
      ctaButton={
        <Button size="sm" variant="secondary-filled" full onClick={onClose}>
          Done
        </Button>
      }
      {...modalProps}
    >
      <ModalHeader>
        <Heading textAlign="center" size="h5" color="grey.1000">
          Congratulations! 👏
        </Heading>
      </ModalHeader>
      <ModalBody>
        <Text textAlign="center" color="grey.600">
          You've successfully deposited{" "}
          <Box as="span" fontWeight={700}>{`${amount} ${token}!`}</Box> 😄
        </Text>
      </ModalBody>
    </Modal>
  );
};
