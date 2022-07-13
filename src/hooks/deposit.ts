/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@chakra-ui/react";
import { providers, utils } from "ethers";
import { useEffect, useState } from "react";

import useTokenContract from "./contracts/tokenggAVAX";

export interface UseDeposit {
  send: (amount: number) => Promise<void>;
  error?: string | undefined;
  response?: any;
  success?: boolean;
}

const useDeposit = (provider: providers.Web3Provider | undefined): UseDeposit => {
  const contract = useTokenContract(provider);
  const toast = useToast();

  const [error, setError] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<any>(undefined);
  const [success, setSuccess] = useState<boolean>(false);

  const send = async (amount: number) => {
    if (!contract) return;
    if (!provider) {
      toast({
        description: "Please install MetaMask",
        status: "error",
      });
      setError("Please install MetaMask");
      return;
    }
    if (!amount) {
      toast({
        description: "Please enter a valid amount",
        status: "error",
      });
      setError("Please enter a valid amount");
      return;
    }

    const eth = utils.parseEther(amount.toString());

    try {
      const tx = await contract.depositAVAX({
        value: eth,
      });
      const resp = await tx.wait();
      setResponse(resp);
    } catch (e) {
      toast({
        description: e as string,
        status: "error",
      });
      setError(e as string);
    }
  };

  useEffect(() => {
    if (response?.status === 1) {
      toast({
        description: "Deposit successful!",
        status: "success",
      });
      setSuccess(true);
    }
  }, [response]);

  return {
    send,
    error,
    response,
    success,
  };
};

export default useDeposit;
