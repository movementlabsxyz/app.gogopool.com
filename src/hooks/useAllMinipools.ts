import { Contract } from "ethers";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";
import { useSigner } from "wagmi";

import type Minipool from "@/types/minipool";

import useMinipoolManagerContract from "./contracts/minipoolManager";

const useAllMinipools = () => {
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
  }, [address, contractInterface, signer]);

  return {
    minipools,
    isLoading: signerLoading || loading,
    isError: !!error,
    error,
  };
};

export default useAllMinipools;
