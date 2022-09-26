import { utils } from "ethers";

import TokenggAVAX from "@/contracts/TokenggAVAX.json";

import { useGetAddress } from "../useStorage";

const useTokenggAVAXContract = () => {
  const { data } = useGetAddress("TokenggAVAX");

  const contractInterface = new utils.Interface(TokenggAVAX.abi);

  return { address: data?.toString() || "", contractInterface };
};

export default useTokenggAVAXContract;
