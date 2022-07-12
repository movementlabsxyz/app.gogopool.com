import { Box, Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { ModalBody, ModalHeader } from "@/common/components/Modal";

export interface SuccessfulDepositModalProps {
  amount: number;
  token: string;
}

export const SuccessfulDepositModal: FunctionComponent<
  SuccessfulDepositModalProps
> = ({ amount, token }) => {
  return (
    <>
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
    </>
  );
};
