import { Contract, providers, utils } from "ethers";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";

import MinipoolManager from "../../contracts/MinipoolManager.json";
import { useStorageAddress } from "../storage";

const useMinipoolManagerContract = (provider: providers.Web3Provider | undefined) => {
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  const minipoolManagerAddress = useStorageAddress("MinipoolManager");

  useAsyncEffect(() => {
    if (!provider || !minipoolManagerAddress) return;
    const i = new utils.Interface(MinipoolManager.abi);
    const c = new Contract(minipoolManagerAddress, i, provider.getSigner());
    setContract(c);
  }, [provider, minipoolManagerAddress]);

  return contract;
};

export default useMinipoolManagerContract;
