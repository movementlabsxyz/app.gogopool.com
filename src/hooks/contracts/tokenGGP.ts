import { utils } from "ethers";

import TokenGGP from "@/contracts/TokenGGP.json";

import { useStorageAddress } from "../storage";

const useTokenGGPContract = () => {
  const { data } = useStorageAddress("TokenGGP");

  const contractInterface = new utils.Interface(TokenGGP.abi);

  return { address: data?.toString() || "", contractInterface };
};

export default useTokenGGPContract;
