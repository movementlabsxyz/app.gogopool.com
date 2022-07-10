import { combineReducers } from "@reduxjs/toolkit";

import walletReducer from "./slices/wallet";

export const reducers = combineReducers({
  wallet: walletReducer,
});
