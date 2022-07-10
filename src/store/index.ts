import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { deserialize, serialize } from "@/utils/immutable";

import { reducers } from "./reducers";

const makeStore = () =>
  configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore, {
  serializeState: (state) => serialize(state),
  deserializeState: (state) => deserialize(state),
});
