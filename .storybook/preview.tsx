import { Parameters, Story } from "@storybook/react";
import theme from "../src/theme/index";
import "../src/styles/components.scss";

export const parameters: Parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: (a: Story, b: Story) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  chakra: {
    theme,
  },
};
