import { Box, DrawerProps } from "@chakra-ui/react";
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
      headerImage={<Box width="178px" height="98px" bgColor="red.300" mb="8" />}
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
