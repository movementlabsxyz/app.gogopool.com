import { ethers } from "ethers";
import { useContractRead } from "wagmi";

import Storage from "@/contracts/Storage.json";

import { storageAddress } from "../constants/anr";
// import { storageAddress } from "../constants/local";
// import { storageAddress } from "../constants/newanr";

export const useGetUint = (args) => {
  return useContractRead({
    addressOrName: storageAddress,
    contractInterface: Storage.abi,
    functionName: "getUint",
    args,
  });
};

export const useGetAddress = (key: string, storageAddr?: string) => {
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
