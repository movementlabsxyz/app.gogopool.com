import { Contract, providers, utils } from "ethers";
import { useEffect, useState } from "react";

import TokenggAVAX from "../../contracts/TokenggAVAX.json";
import { useStorageAddress } from "../storage";

const useTokenContract = (provider: providers.Web3Provider | undefined) => {
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  const tokenContractAddress = useStorageAddress("TokenggAVAX");

  useEffect(() => {
    if (!provider || !tokenContractAddress) return;
    const i = new utils.Interface(TokenggAVAX.abi);
    const c = new Contract(tokenContractAddress, i, provider.getSigner());
    setContract(c);
  }, [provider, tokenContractAddress]);

  return contract;
};

export default useTokenContract;
