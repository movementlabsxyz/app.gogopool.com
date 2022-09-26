import { BigNumber, utils } from "ethers";
import { Contract } from "ethers";
import ms from "ms";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useContractRead, useSigner } from "wagmi";

import type Minipool from "@/types/minipool";
import { MinipoolStatus } from "@/types/minipool";
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

export interface UseMinipoolsByStatusParams {
  status?: number;
  offset?: number;
  limit?: number;
}

export const useAllMinipools = () => {
  const [minipools, setMinipools] = useState<Minipool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { data: signer, isLoading: signerLoading } = useSigner();

  const { address, contractInterface } = useMinipoolManagerContract();

  useAsyncEffect(async () => {
    if (!signer) {
      return;
    }
    try {
      const c = new Contract(address, contractInterface, signer);
      // statuses are 0 to 6 inclusive
      const statuses = [0, 1, 2, 3, 4, 5, 6];
      const promises = statuses.map((status) => c.getMinipools(status, 0, 0));
      const results = await Promise.all(promises);
      // flatten the array of arrays
      const flattened = [].concat(...results);
      setMinipools(flattened);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }, [address, signer]);

  return {
    minipools,
    isLoading: signerLoading || loading,
    isError: !!error,
    error,
  };
};

export const useMinipoolsByStatus = ({
  status = 2, // default to staking minipools
  offset = 0, // no offset
  limit = 0, // get all matching ones, no pagination
}: UseMinipoolsByStatusParams) => {
  const { address, contractInterface } = useMinipoolManagerContract();

  const resp = useContractRead({
    addressOrName: address,
    contractInterface,
    functionName: "getMinipools",
    args: [status, offset, limit],
  });

  return resp;
};

export const useMinipoolByID = (id: string) => {
  id = nodeID(id);

  const { minipools, isLoading, isError, error } = useAllMinipools();

  return {
    minipools: minipools.find((minipool) => minipool?.nodeID === id),
    isLoading,
    isError,
    error,
  };
};

export const useMinipoolsByOwner = (address: string | undefined) => {
  const { minipools, isError, isLoading, error } = useAllMinipools();

  if (!address) {
    return {};
  }

  return {
    minipools: minipools.filter((minipool) => minipool?.owner === address),
    isError,
    isLoading,
    error,
  };
};
