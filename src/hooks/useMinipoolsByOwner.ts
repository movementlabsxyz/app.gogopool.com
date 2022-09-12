import useAllMinipools from "./useAllMinipools";

const useMinipoolsByOwner = (address: string | undefined) => {
  const { minipools, isError, isLoading, error } = useAllMinipools();

  if (!address) {
    return [];
  }

  return {
    minipools: minipools.filter((minipool) => minipool?.owner === address),
    isError,
    isLoading,
    error,
  };
};

export default useMinipoolsByOwner;
