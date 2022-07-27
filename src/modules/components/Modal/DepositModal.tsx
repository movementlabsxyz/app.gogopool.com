import { Box, ModalProps } from "@chakra-ui/react";
import Image from "next/image";
import { FunctionComponent } from "react";

import { Button } from "@/common/components/Button";
import { Modal } from "@/common/components/Modal";

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
  successProps?: SuccessfulDepositModalProps;
  failedProps?: FailedDepositModalProps;
} & Omit<ModalProps, "children">;

export const DepositModal: FunctionComponent<DepositModalProps> = ({
  status,
  isOpen,
  onClose,
  successProps,
  failedProps,
  ...modalProps
}) => {
  const renderCta = () => {
    if (status === "success") {
      return (
        <Button size="sm" variant="secondary-filled" full onClick={onClose}>
          Done
        </Button>
      );
    }
    return (
      <>
        <Button size="sm" variant="secondary-outline" full onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" variant="secondary-filled" full onClick={onClose}>
          Try again
        </Button>
      </>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      headerImage={
        <Box width="178px" height="98px" mb="8">
          <Image
            src={
              status === "success"
                ? "/assets/img/deposit/success_deposit.svg"
                : "/assets/img/deposit/failed_deposit.svg"
            }
            width={178}
            height={98}
            alt={`${status}_image`}
          />
        </Box>
      }
      ctaButton={renderCta()}
      {...modalProps}
    >
      {status === "success" ? (
        <SuccessfulDepositModal {...successProps} />
      ) : (
        <FailedDepositModal {...failedProps} />
      )}
    </Modal>
  );
};
