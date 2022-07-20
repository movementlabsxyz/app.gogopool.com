import { useBoolean } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import { ReactNode } from "react";

import { Button } from "../Button";
import { Modal, ModalBody, ModalHeader,ModalProps } from "./Modal";

export default {
  title: "Common/Modal",
  component: Modal,
} as Meta<typeof Modal>;

type AdditionProps = {
  header: ReactNode;
  body: ReactNode;
};

const Template: Story<ModalProps & AdditionProps> = ({
  header,
  children,
  ...args
}) => {
  const [flag, setFlag] = useBoolean(true);
  return (
    <>
    <Button onClick={setFlag.toggle}>Toggle</Button>
    <Modal {...args} isOpen={flag} onClose={setFlag.off}>
      {header && <ModalHeader textColor="grey.500">{header}</ModalHeader>}
      {children && <ModalBody textColor="grey.500">{children}</ModalBody>}
    </Modal>
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  children: "This is body",
  header: "This is header",
  ctaButton: <Button>Action</Button>
};
