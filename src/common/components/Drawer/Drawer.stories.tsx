import { useBoolean } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import { ReactNode } from "react";

import { Button } from "../Button";
import { Drawer, DrawerBody, DrawerHeader, DrawerProps } from "./Drawer";

export default {
  title: "Common/Drawer",
  component: Drawer,
} as Meta<typeof Drawer>;

type AdditionProps = {
  header: ReactNode;
  body: ReactNode;
};

const Template: Story<DrawerProps & AdditionProps> = ({
  header,
  children,
  ...args
}) => {
  const [flag, setFlag] = useBoolean(true);
  return (
    <>
    <Button onClick={setFlag.toggle}>Toggle</Button>
    <Drawer  {...args} isOpen={flag} onClose={setFlag.off}>
      {header && <DrawerHeader textColor="grey.500">{header}</DrawerHeader>}
      {children && <DrawerBody textColor="grey.500">{children}</DrawerBody>}
    </Drawer>
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  children: "This is body",
  header: "This is header",
  ctaButton: <Button>Action</Button>
};
