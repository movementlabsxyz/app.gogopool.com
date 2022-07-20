import { configureStore } from "@reduxjs/toolkit";
import { Meta, Story } from "@storybook/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";

import { reducers } from "../../../store/reducers";
import { CoreLayout } from "./CoreLayout";

const MockStore = ({ children }) => (
  <Provider
    store={configureStore({
      reducer: reducers,
    })}
  >
    {children}
  </Provider>
);

export default {
  title: "Common/CoreLayout",
  component: CoreLayout,
  decorators: [(story) => <MockStore>{story()}</MockStore>],
} as Meta<typeof CoreLayout>;


const Template: Story<{ children: ReactNode }> = (args) => (
  <CoreLayout {...args} />
);
export const Default = Template.bind({});
Default.args = {
  children: "content"
}

