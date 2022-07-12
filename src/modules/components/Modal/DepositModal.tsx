import { ModalProps } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import {
  FailedDepositModal,
  FailedDepositModalProps,
} from "./FailedDepositModal";
import {
  SuccessfulDepositModal,
  SuccessfulDepositModalProps,
} from "./SuccessfulDepositModal";

type DepositModalProps = {
  status: "success" | "failed";
} & ModalProps &
  (SuccessfulDepositModalProps & FailedDepositModalProps);

export const DepositModal: FunctionComponent<DepositModalProps> = ({
  status,
  isOpen,
  onClose,
  amount,
  token,
  ...modalProps
}) => {
  return (
    <>
      {status === "success" ? (
        <SuccessfulDepositModal
          isOpen={isOpen}
          onClose={onClose}
          amount={amount}
          token={token}
          {...modalProps}
        />
      ) : (
        <FailedDepositModal isOpen={isOpen} onClose={onClose} {...modalProps} />
      )}
    </>
  );
};
