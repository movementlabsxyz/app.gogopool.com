import { Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { DrawerBody, DrawerHeader } from "@/common/components/Drawer";

export interface FailedDepositDrawerProps {}

export const FailedDepositDrawer: FunctionComponent<
  FailedDepositDrawerProps
> = () => {
  return (
    <>
      <DrawerHeader>
        <Heading textAlign="center" size="h5" color="grey.1000">
          Deposit Failed! 😢
        </Heading>
      </DrawerHeader>
      <DrawerBody>
        <Text textAlign="center" color="grey.600">
          Sorry, you don't have enough AVAX to make a deposit. Please add more
          AVAX to your wallet and try another deposit.
        </Text>
      </DrawerBody>
    </>
  );
};
