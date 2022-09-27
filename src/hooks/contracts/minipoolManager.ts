import { utils } from "ethers";

import MinipoolManager from "@/contracts/MinipoolManager.json";

import { useGetAddress } from "../useStorage";

const useMinipoolManagerContract = () => {
  const { data } = useGetAddress("MinipoolManager");

  const contractInterface = new utils.Interface(MinipoolManager.abi);

  return { address: data?.toString() || "", contractInterface };
};

export default useMinipoolManagerContract;
