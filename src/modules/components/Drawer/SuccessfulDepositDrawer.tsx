import { Box, Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

import { DrawerBody, DrawerHeader } from "@/common/components/Drawer";

export interface SuccessfulDepositDrawerProps {
  amount: number;
  token: string;
}

export const SuccessfulDepositDrawer: FunctionComponent<
  SuccessfulDepositDrawerProps
> = ({ amount, token }) => {
  return (
    <>
      <DrawerHeader>
        <Heading textAlign="center" size="h5" color="grey.1000">
          Congratulations! 👏
        </Heading>
      </DrawerHeader>
      <DrawerBody>
        <Text textAlign="center" color="grey.600">
          You've successfully deposited{" "}
          <Box as="span" fontWeight={700}>{`${amount} ${token}!`}</Box> 😄
        </Text>
      </DrawerBody>
    </>
  );
};
