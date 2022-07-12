import { useDisclosure } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";

import { Button } from "@/common/components/Button";

import { DepositModal } from "./DepositModal";
import {
  SuccessfulDepositModal,
  SuccessfulDepositModalProps,
} from "./SuccessfulDepositModal";

export default {
  title: "Modules/SuccessfulDepositModal",
  component: SuccessfulDepositModal,
} as Meta<SuccessfulDepositModalProps>;

const Template: Story<SuccessfulDepositModalProps> = ({ amount, token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <DepositModal
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
