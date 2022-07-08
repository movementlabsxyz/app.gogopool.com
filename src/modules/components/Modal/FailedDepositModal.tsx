import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { Button } from "@/common/components/Button";

interface ModalProps extends Omit<ChakraModalProps, "children"> {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  token: string;
}

export const FailedDepositModal: FunctionComponent<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="465px" mt="auto" mb="auto">
        <VStack>
          <Box width="178px" height="98px" bgColor="red.300" mb="8" />
        </VStack>
        <ModalHeader p="0 0 8px 0">
          <Heading textAlign="center" size="h5">
            Deposit Failed! 😢
          </Heading>
        </ModalHeader>
        <ModalBody p="0 0 24px 0">
          <Text textAlign="center" color="grey.600">
            Sorry, you don't have enough AVAX to make a deposit. Please add more
            AVAX to your wallet and try another deposit.
          </Text>
        </ModalBody>

        <ModalFooter p="0" gap="16px">
          <Button size="sm" variant="secondary-outline" full onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" variant="secondary-filled" full onClick={onClose}>
            Try again
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
