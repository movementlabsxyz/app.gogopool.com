import { Flex } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { useState } from "react";

import { CaretRightIcon } from "../CustomIcon/CaretRightIcon";
import { CustomTooltipProps, Tooltip } from "./Tooltip";

export default {
  title: "Common/Tooltip",
  component: Tooltip,
} as Meta<typeof Tooltip>;

const content = (
  <Flex>
    <span>tooltip</span>
    <Flex
      alignItems="center"
      style={{
        color: "#49E988",
        fontWeight: 700,
        marginLeft: 8,
      }}
    >
      Learn More{" "}
      <CaretRightIcon
        stroke="#49E988"
        width={16}
        height={16}
        style={{ marginLeft: 2 }}
      />
    </Flex>
  </Flex>
);

const children = <div style={{ textAlign: "center" }}>Content</div>;

const generator =
  (input): Story<CustomTooltipProps> =>
  (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        className="flex h-[300px] justify-center"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 300,
        }}
      >
        <Tooltip {...args} content={content} defaultIsOpen={isOpen}>
          {input
            ? input({
                onChange: (e) =>
                  e.target.value > 100 ? setIsOpen(true) : setIsOpen(false),
              })
            : children}
        </Tooltip>
      </div>
    );
  };

const Template = generator(undefined);

export const Default = Template.bind({});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByText("Content");
  userEvent.hover(input);
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  placement: "bottom_left",
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  placement: "bottom_right",
};

export const Top = Template.bind({});
Top.args = {
  placement: "top",
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  placement: "top_left",
};

export const TopRight = Template.bind({});
TopRight.args = {
  placement: "top_right",
};

export const Left = Template.bind({});
Left.args = {
  placement: "left",
};

export const Right = Template.bind({});
Right.args = {
  placement: "right",
};

const Input = (props) => (
  <div style={{ background: "lightgrey", padding: 1 }}>
    <input type="number" {...props} role="input_number" />
  </div>
);

const TemplateTest = generator(Input);
export const Persistent = TemplateTest.bind({});

Persistent.args = {
  variant: "persistent",
};

Persistent.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole("input_number");
  userEvent.type(input, "123", { delay: 200 });
};
