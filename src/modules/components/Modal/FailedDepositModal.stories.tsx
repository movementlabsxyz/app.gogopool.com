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
      <DepositModal
        status="error"
        isOpen={isOpen}
        onClose={onClose}
        transactionHash={"failedhash"}
        isLoading={false}
        isSuccess={true}
        amount={100}
        token={
          "0x4766ecd489b648199cbc083e124243b95091a2c136c8cebb3b16267f0c4f3b61"
        }
      />
    </>
  );
};

export const Default = Template.bind({});
