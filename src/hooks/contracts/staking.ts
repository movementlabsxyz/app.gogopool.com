import { utils } from "ethers";

import Staking from "@/contracts/Staking.json";

import { useStorageAddress } from "../storage";

const useStakingContract = () => {
  const { data } = useStorageAddress("Staking");

  const contractInterface = new utils.Interface(Staking.abi);

  return { address: data?.toString() || "", contractInterface };
};

export default useStakingContract;
