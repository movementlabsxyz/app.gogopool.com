import { utils } from "ethers";

import MinipoolManager from "../../contracts/MinipoolManager.json";
import { useStorageAddress } from "../storage";

const useMinipoolManagerContract = () => {
  const { data } = useStorageAddress("MinipoolManager");

  const contractInterface = new utils.Interface(MinipoolManager.abi);

  return { address: data?.toString() || "", contractInterface };
};

export default useMinipoolManagerContract;
