import { Text } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";

import { ChakraFonts, CustomFonts } from "./CustomFont";

export default {
  title: "Common/CustomFont",
  component: CustomFonts,
} as Meta<typeof CustomFonts>;

const Template: Story = (args) => (
  <>
    <CustomFonts />
    <ChakraFonts />
    {args.children}
  </>
);

export const WithChakraFontLoader = Template.bind({});
WithChakraFontLoader.args = {
  children: <Text fontFamily="Jost">Josh font is working</Text>,
};
