import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { WalletState } from '@/types/wallet'

const initialState: WalletState = {
  account: undefined,
  chainId: undefined,
  chainName: undefined,
  error: undefined,
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload
    },
    setChainId: (state, action) => {
      state.chainId = action.payload
    },
    setChainName: (state, action) => {
      state.chainName = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.subject,
      }
    },
  },
})

export const { setAccount, setChainId, setChainName, setError } = walletSlice.actions

export default walletSlice.reducer
