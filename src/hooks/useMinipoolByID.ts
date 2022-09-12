import { nodeID } from "@/utils";

import useAllMinipools from "./useAllMinipools";

const useMinipoolByID = (id: string) => {
  id = nodeID(id);

  const { minipools, isLoading, isError, error } = useAllMinipools();

  return {
    minipools: minipools.find((minipool) => minipool?.nodeID === id),
    isLoading,
    isError,
    error,
  };
};

export default useMinipoolByID;
