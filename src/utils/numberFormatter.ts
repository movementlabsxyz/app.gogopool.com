import { BigNumberish, utils } from "ethers";

export const roundedBigNumber = (
  num: BigNumberish | undefined,
  decimals = 4
): number => {
  if (!num) {
    return 0;
  }
  const value = utils.formatEther(num) as never;
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
};
