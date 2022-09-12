import { BigNumber, utils } from "ethers";
import ms from "ms";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import { nodeID } from "@/utils";

import useMinipoolManagerContract from "./contracts/minipoolManager";

export interface UseCreateMinipoolParams {
  nodeId: string; // node ID as input by the user
  duration: number | string; // duration in ms
  amount: BigNumber | number | string; // amount of tokens to be deposited
  fee?: BigNumber; // the fee for the node. Default is 20000, or 2%
}

export const useCreateMinipool = ({
  nodeId,
  duration,
  amount,
  fee,
}: UseCreateMinipoolParams) => {
  if (!fee) {
    fee = BigNumber.from(20000);
  }

  if (typeof duration === "string") {
    duration = ms(duration) / 1000;
  }

  if (typeof amount === "number") {
    amount = BigNumber.from(amount);
  } else if (typeof amount === "string") {
    amount = utils.parseEther(amount);
  }

  const formattedID = nodeID(nodeId);

  const { address, contractInterface } = useMinipoolManagerContract();

  const { config } = usePrepareContractWrite({
    addressOrName: address,
    contractInterface,
    functionName: "createMinipool",
    args: [formattedID, BigNumber.from(duration), fee, amount],
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

export default useCreateMinipool;
