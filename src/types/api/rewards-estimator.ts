import { BigNumber } from 'ethers'

import { HexString } from '../cryptoGenerics'

export type BigNumberJSON = {
  type: string
  hex: HexString
}

export type CalculatorReq = {
  ggpStaked: BigNumberJSON
  avaxStaked: BigNumberJSON
  walletAddress: HexString
}

export type CalculatorData = {
  ggpStaked: BigNumber
  avaxStaked: BigNumber
  walletAddress: HexString
}

export type Staker = {
  stakerAddr: HexString
  avaxAssigned: BigNumber
  avaxStaked: BigNumber
  avaxValidating: BigNumber
  avaxValidatingHighWater: BigNumber
  ggpRewards: BigNumber
  ggpStaked: BigNumber
  lastRewardsCycleCompleted: BigNumber
  rewardsStartTime: BigNumber
  ggpLockedUntil: BigNumber
}
