import { utils } from "ethers";

import TokenGGP from "@/contracts/TokenGGP.json";

import { useGetAddress } from "../useStorage";

const useTokenGGPContract = () => {
  const { data } = useGetAddress("TokenGGP");

  const contractInterface = new utils.Interface(TokenGGP.abi);

  return { address: data?.toString() || "", contractInterface };
};

export default useTokenGGPContract;
