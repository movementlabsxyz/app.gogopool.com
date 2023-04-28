import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { reducers } from './reducers'

import { deserialize, serialize } from '@/utils/immutable'

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
})

export const makeStore = () => store

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = ReturnType<typeof makeStore>['dispatch']
export type AppState = ReturnType<AppStore['getState']>

export const wrapper = createWrapper<AppStore>(makeStore, {
  serializeState: (state) => serialize(state),
  deserializeState: (state) => deserialize(state),
})
