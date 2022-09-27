import { useDisclosure } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";

import { Button } from "@/common/components/Button";

import { DepositDrawer } from "./DepositDrawer";
import {
  FailedDepositDrawer,
  FailedDepositDrawerProps,
} from "./FailedDepositDrawer";

export default {
  title: "Modules/FailedDepositDrawer",
  component: FailedDepositDrawer,
} as Meta<FailedDepositDrawerProps>;

const Template: Story<FailedDepositDrawerProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Drawer</Button>
      <DepositDrawer status="error" isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export const Default = Template.bind({});
