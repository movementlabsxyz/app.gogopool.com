import { useDisclosure } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";

import { Button } from "@/common/components/Button";

import { DepositModal } from "./DepositModal";
import {
  FailedDepositModal,
  FailedDepositModalProps,
} from "./FailedDepositModal";

export default {
  title: "Modules/FailedDepositModal",
  component: FailedDepositModal,
} as Meta<FailedDepositModalProps>;

const Template: Story<FailedDepositModalProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <DepositModal status="failed" isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export const Default = Template.bind({});
