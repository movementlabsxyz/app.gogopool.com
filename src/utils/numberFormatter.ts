import { BigNumber, utils } from "ethers";

export const roundedBigNumber = (num: BigNumber, decimals = 4): number => {
  const value = utils.formatEther(num) as never;
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
};
