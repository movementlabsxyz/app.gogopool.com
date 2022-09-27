import type { BigNumber } from "ethers";

interface Minipool {
  nodeID: string;
  status: MinipoolStatus;
  duration: number;
  startTime: number;
  endTime: number;
  delegationFee: BigNumber;
  ggpBondAmt: BigNumber;
  ggpSlashAmt: BigNumber;
  avaxNodeOpAmt: BigNumber;
  avaxLiquidStakerAmt: BigNumber;
  avaxTotalRewardAmt: BigNumber;
  avaxNodeOpRewardAmt: BigNumber;
  avaxUserRewardAmt: BigNumber;
  owner: string;
  multisigAddr: string;
  txID: string;
}

export type MinipoolKeys = keyof Minipool;

const displayNameTable: Record<MinipoolKeys, string> = {
  nodeID: "Node ID",
  status: "Status",
  duration: "Duration",
  startTime: "Start Time",
  endTime: "End Time",
  delegationFee: "Delegation Fee",
  ggpBondAmt: "GGP Bond Amount",
  ggpSlashAmt: "GGP Slash Amount",
  avaxLiquidStakerAmt: "User Deposit Amount",
  avaxNodeOpAmt: "NodeOp Deposit Amount",
  avaxNodeOpRewardAmt: "NodeOp Reward Amount",
  avaxTotalRewardAmt: "Total Reward Amount",
  avaxUserRewardAmt: "User Reward Amount",
  txID: "Transaction ID",
  multisigAddr: "Multisig Address",
  owner: "Owner Address",
};

export const displayName = (key: MinipoolKeys): string => {
  return displayNameTable?.[key] || key;
};

export enum MinipoolStatus {
  Prelaunch, // The minipool has NodeOp AVAX and is awaiting assignFunds/launch by Rialto
  Launched, // Rialto has claimed the funds and will send the validator tx
  Staking, // The minipool node is currently staking
  Withdrawable, // The minipool has finished staking period and all funds / rewards have been moved back to c-chain by Rialto
  Finished, // The minipool node has withdrawn all funds
  Canceled, // The minipool has been canceled before ever starting validation
  Error,
}

export default Minipool;
