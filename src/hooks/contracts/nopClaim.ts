import { utils } from "ethers";

import NOPClaim from "@/contracts/NOPClaim.json";

import { useGetAddress } from "../useStorage";

const useNOPClaim = () => {
  const { data } = useGetAddress("NOPClaim");
  const contractInterface = new utils.Interface(NOPClaim.abi);
  return { address: data?.toString() || "", contractInterface };
};

export default useNOPClaim;
