import { Button } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import React, { ReactNode } from "react";

import {
  BoxPropsWithStyles,
  Card,
  Content,
  Footer,
  Title,
} from "./Card";

export default {
  title: "Common/Card",
  component: Card,
} as Meta<typeof Card>;

type AdditionProps = {
    title: ReactNode,
    content: ReactNode,
    footer: ReactNode,
}
const Template: Story<BoxPropsWithStyles & AdditionProps> = ({ title, footer, content, ...args}) => (
  <Card {...args}>
    {title && <Title>{title}</Title>}
    {content && <Content>{content}</Content>}
    {footer && <Footer>{footer}</Footer>}
  </Card>
);

export const Primary = Template.bind({});
Primary.args = {
  color: "grey.500",
  title: "This is heading",
  footer: <Button>Footer</Button>,
  content: "This is content"
};
