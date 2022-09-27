import useSWR from "swr";

import fetcher from "@/utils/fetcher";

export interface ANRNodesResponse {
  available_nodes: string[];
  validators: string[];
  nodes: string[];
}

const useANRNodes = () => {
  const { data: resp, error } = useSWR(
    "https://anr.fly.dev/cgi-bin/nodes",
    fetcher
  );

  const data = resp as ANRNodesResponse;

  // TODO make this random
  const nodeID = data?.available_nodes?.[0];

  return {
    data,
    isLoading: !data && !error,
    isError: Boolean(error),
    error,
    nodeID,
  };
};

export default useANRNodes;
