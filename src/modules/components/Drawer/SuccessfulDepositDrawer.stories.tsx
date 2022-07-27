import { useDisclosure } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";

import { Button } from "@/common/components/Button";

import { DepositDrawer } from "./DepositDrawer";
import {
  SuccessfulDepositDrawer,
  SuccessfulDepositDrawerProps,
} from "./SuccessfulDepositDrawer";

export default {
  title: "Modules/SuccessfulDepositDrawer",
  component: SuccessfulDepositDrawer,
} as Meta<SuccessfulDepositDrawerProps>;

const Template: Story<SuccessfulDepositDrawerProps> = ({ amount, token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Drawer</Button>
      <DepositDrawer
        status="success"
        isOpen={isOpen}
        onClose={onClose}
        successProps={{
          amount,
          token,
        }}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  amount: 1000,
  token: "AVAX",
};
