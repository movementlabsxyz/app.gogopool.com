import { Box, Center, ModalProps, Spinner, useToken } from "@chakra-ui/react";
import Image from "next/image";
import { FunctionComponent } from "react";
import { ClimbingBoxLoader } from "react-spinners";

import { Button } from "@/common/components/Button";
import { Modal } from "@/common/components/Modal";

import { FailedDepositModal } from "./FailedDepositModal";
import { PendingDepositModal } from "./PendingDepositModal";
import { SuccessfulDepositModal } from "./SuccessfulDepositModal";

type DepositModalProps = {
  status: "success" | "error" | "idle" | "loading";
  transactionHash: string;
  isLoading: boolean;
  isSuccess: boolean;
  amount: number;
  token: string;
} & Omit<ModalProps, "children">;

export const DepositModal: FunctionComponent<DepositModalProps> = ({
  status,
  isOpen,
  onClose,
  transactionHash,
  isLoading,
  isSuccess,
  amount,
  token,
  ...modalProps
}) => {
  const renderCta = () => {
    if (status === "success" || status === "idle") {
      return (
        <Button size="sm" variant="secondary-filled" full onClick={onClose}>
          Done
        </Button>
      );
    }
    if (status === "loading") {
      return (
        <Button disabled size="sm" variant="secondary-filled" full>
          Loading...
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
          {isLoading && (
            <Center>
              <ClimbingBoxLoader color={useToken("color", "blue.400")} />
            </Center>
          )}

          {!isLoading && (
            <Image
              src={
                isSuccess
                  ? "/assets/img/deposit/success_deposit.svg"
                  : "/assets/img/deposit/failed_deposit.svg"
              }
              width={178}
              height={98}
              alt={`${status}_image`}
            />
          )}
        </Box>
      }
      ctaButton={renderCta()}
      {...modalProps}
    >
      {isLoading && transactionHash && (
        <PendingDepositModal transactionHash={transactionHash} />
      )}

      {isSuccess && !isLoading && (
        <SuccessfulDepositModal
          amount={amount}
          token={token}
          transactionHash={transactionHash}
        />
      )}

      {!isSuccess && !isLoading && (
        <FailedDepositModal transactionHash={transactionHash} />
      )}
    </Modal>
  );
};
