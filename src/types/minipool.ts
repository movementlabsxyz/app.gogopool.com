import type { BigNumber } from 'ethers'

import { HexString } from './cryptoGenerics'

export default interface Minipool {
  nodeID: HexString
  status: BigNumber
  duration: number
  creationTime: BigNumber
  initialStartTime: BigNumber
  startTime: BigNumber
  endTime: BigNumber
  delegationFee: BigNumber
  ggpBondAmt: BigNumber
  ggpSlashAmt: BigNumber
  avaxNodeOpAmt: BigNumber
  avaxNodeOpInitialAmt: BigNumber
  avaxLiquidStakerAmt: BigNumber
  avaxTotalRewardAmt: BigNumber
  avaxNodeOpRewardAmt: BigNumber
  avaxUserRewardAmt: BigNumber
  owner: HexString
  multisigAddr: string
  txID: string
  errorCode: string
}

export type MinipoolKeys = keyof Minipool

const displayNameTable: Record<MinipoolKeys, string> = {
  nodeID: 'Node ID',
  status: 'Status',
  duration: 'Duration',
  startTime: 'Start Time',
  creationTime: 'Creation Time',
  initialStartTime: 'Initial Start Time',
  endTime: 'End Time',
  delegationFee: 'Delegation Fee',
  ggpBondAmt: 'GGP Bond Amount',
  ggpSlashAmt: 'GGP Slash Amount',
  avaxLiquidStakerAmt: 'User Deposit Amount',
  avaxNodeOpAmt: 'NodeOp Deposit Amount',
  avaxNodeOpInitialAmt: 'NodeOp Initial Deposit Amount',
  avaxNodeOpRewardAmt: 'NodeOp Reward Amount',
  avaxTotalRewardAmt: 'Total Reward Amount',
  avaxUserRewardAmt: 'User Reward Amount',
  txID: 'Transaction ID',
  multisigAddr: 'Multisig Address',
  owner: 'Owner Address',
  errorCode: 'Error Code',
}

export const displayName = (key: MinipoolKeys): string => {
  return displayNameTable?.[key] || key
}

export enum MinipoolStatus {
  Prelaunch, // The minipool has NodeOp AVAX and is awaiting assignFunds/launch by Rialto
  Launched, // Rialto has claimed the funds and will send the validator tx
  Staking, // The minipool node is currently staking
  Withdrawable, // The minipool has finished staking period and all funds / rewards have been moved back to c-chain by Rialto
  Finished, // The minipool node has withdrawn all funds
  Canceled, // The minipool has been canceled before ever starting validation
  Error,
}

export const MinipoolErrorCodes = {
  '0x4531000000000000000000000000000000000000000000000000000000000000': 'Node already validating',
  '0x4532000000000000000000000000000000000000000000000000000000000000':
    'Error determining node status',
  '0x4533000000000000000000000000000000000000000000000000000000000000': 'Error staking node',
  '0x4543310000000000000000000000000000000000000000000000000000000000': 'Error cycling minipool',
}
