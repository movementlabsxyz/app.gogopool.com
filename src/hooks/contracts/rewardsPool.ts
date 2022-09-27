import { utils } from "ethers";

import RewardsPool from "@/contracts/RewardsPool.json";

import { useGetAddress } from "../useStorage";

const useRewardsPoolContract = () => {
  const { data } = useGetAddress("RewardsPool");
  const contractInterface = new utils.Interface(RewardsPool.abi);
  return { address: data?.toString() || "", contractInterface };
};

export default useRewardsPoolContract;
