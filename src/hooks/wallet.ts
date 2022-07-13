import { useToast } from "@chakra-ui/react";
import { providers, utils } from "ethers";
import useAsyncEffect from "use-async-effect";

import { setAccount, setChainId, setChainName } from "@/store/slices/wallet";

import useProvider from "./provider";
import { useDispatch, useSelector } from "./redux";

export interface UseWallet {
  account: string | undefined;
  activate: () => Promise<void>;
  deactivate: () => Promise<void>;
  chainId: number | undefined;
  chainName: string | undefined;
  error?: string | undefined;
  provider: providers.Web3Provider | undefined;
}

const useWallet = (): UseWallet => {
  const provider = useProvider();
  const dispatch = useDispatch();
  const toast = useToast();
  const { account, chainId, chainName } = useSelector((state) => state.wallet);

  useAsyncEffect(async () => {
    if (!account || !utils.isAddress(account)) return;
    if (!provider) return;
    const network = await provider.getNetwork();
    network?.chainId && dispatch(setChainId(network.chainId));
    network?.name && dispatch(setChainName(network.name));
  });

  const activate = async () => {
    if (!provider) {
      toast({
        description: "Please install MetaMask",
        status: "error",
      });
      return;
    }

    if (account) return;

    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    if (accounts.length > 0 && signer) {
      dispatch(setAccount(await signer.getAddress()));
    }
  };

  const deactivate = async () => {
    if (!provider) return;
    if (!account) return;

    dispatch(setAccount(undefined));
  };

  if (!provider) return {} as UseWallet;

  return {
    account,
    activate,
    deactivate,
    chainId,
    chainName,
    provider,
  };
};

export default useWallet;
