import { useContractRead } from "wagmi";

import useMinipoolManagerContract from "./contracts/minipoolManager";

export interface UseMinipoolsByStatusParams {
  status?: number;
  offset?: number;
  limit?: number;
}

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

export default useMinipoolsByStatus;
