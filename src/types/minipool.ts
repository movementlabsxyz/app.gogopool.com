import type { BigNumber } from "ethers";

interface Minipool {
  nodeID: string;
  status: number;
  duration: number;
  startTime: number;
  endTime: number;
  delegationFee: BigNumber;
  ggpBondAmt: BigNumber;
  ggpSlashAmt: BigNumber;
  avaxNodeOpAmt: BigNumber;
  avaxUserAmt: BigNumber;
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
  avaxUserAmt: "User Deposit Amount",
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

export default Minipool;
