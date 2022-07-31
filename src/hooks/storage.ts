import { ethers } from "ethers";
import { useContractRead } from "wagmi";

import { storageAddress } from "../constants/anr";
import Storage from "../contracts/Storage.json";

export const useStorageAddress = (key: string, storageAddr?: string) => {
  const addr = storageAddr || storageAddress;

  const args = ethers.utils.solidityKeccak256(
    ["string", "string"],
    ["contract.address", key]
  );

  const resp = useContractRead({
    addressOrName: addr,
    contractInterface: Storage.abi,
    functionName: "getAddress",
    args,
  });

  return resp;
};
