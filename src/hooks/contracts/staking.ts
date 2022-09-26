import { utils } from "ethers";

import Staking from "@/contracts/Staking.json";

import { useGetAddress } from "../useStorage";

const useStakingContract = () => {
  const { data } = useGetAddress("Staking");

  const contractInterface = new utils.Interface(Staking.abi);

  return { address: data?.toString() || "", contractInterface };
};

export default useStakingContract;
