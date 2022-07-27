import { BigNumber, utils } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import { nodeID } from "../utils";
import useMinipoolManagerContract from "./contracts/minipoolManager";
import useTokenGGPContract from "./contracts/tokenGGP";

export const useApproveGGP = (amount: BigNumber) => {
  const { address: ggpTokenAddress, contractInterface } = useTokenGGPContract();

  const { address: minipoolManagerAddr } = useMinipoolManagerContract();

  const { config } = usePrepareContractWrite({
    addressOrName: ggpTokenAddress,
    contractInterface,
    functionName: "approve",
    args: [minipoolManagerAddr, amount],
  });

  const resp = useContractWrite(config);

  return {
    ...resp,
    ready: resp?.write !== undefined,
  };
};

export interface UseCreateMinipoolParams {
  nodeId: string; // node ID as input by the user
  startTime: Date; // start time of the minipool
  endTime: Date; // end time of the minipool
  amount: BigNumber | number | string; // amount of tokens to be deposited
  bondAmount?: BigNumber; // amount of tokens to be bonded. Default 200 GGP
  fee?: BigNumber; // the fee for the node. Default is 20000, or 2%
}

export const useCreateMinipool = ({
  nodeId,
  startTime,
  endTime,
  amount,
  bondAmount,
  fee,
}: UseCreateMinipoolParams) => {
  if (!bondAmount) {
    bondAmount = utils.parseEther("200");
  }

  if (!fee) {
    fee = BigNumber.from(20000);
  }

  if (typeof amount === "number") {
    amount = BigNumber.from(amount);
  } else if (typeof amount === "string") {
    amount = utils.parseEther(amount);
  }

  // seconds between startTime and endTime
  const duration = BigNumber.from(
    Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
  );

  const formattedID = nodeID(nodeId);

  const { address, contractInterface } = useMinipoolManagerContract();

  const { config } = usePrepareContractWrite({
    addressOrName: address,
    contractInterface,
    functionName: "createMinipool",
    args: [formattedID, duration, fee, bondAmount],
    overrides: {
      value: amount,
    },
  });

  const resp = useContractWrite(config);

  return {
    ...resp,
    ready: resp?.write !== undefined,
  };
};

const fns = { useApproveGGP, useCreateMinipool };

export default fns;
