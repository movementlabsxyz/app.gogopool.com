import { Box, DrawerProps } from "@chakra-ui/react";
import Image from "next/image";
import { FunctionComponent } from "react";

import { Button } from "@/common/components/Button";
import { Drawer } from "@/common/components/Drawer";

import {
  FailedDepositDrawer,
  FailedDepositDrawerProps,
} from "./FailedDepositDrawer";
import {
  SuccessfulDepositDrawer,
  SuccessfulDepositDrawerProps,
} from "./SuccessfulDepositDrawer";

type DepositDrawerProps = {
  status: "success" | "failed";
  successProps?: SuccessfulDepositDrawerProps;
  failedProps?: FailedDepositDrawerProps;
} & Omit<DrawerProps, "children">;

export const DepositDrawer: FunctionComponent<DepositDrawerProps> = ({
  status,
  isOpen,
  onClose,
  successProps,
  failedProps,
  ...drawerProps
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
    <Drawer
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
      {...drawerProps}
    >
      {status === "success" ? (
        <SuccessfulDepositDrawer {...successProps} />
      ) : (
        <FailedDepositDrawer {...failedProps} />
      )}
    </Drawer>
  );
};
