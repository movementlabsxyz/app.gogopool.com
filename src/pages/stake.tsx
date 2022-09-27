import { Button, Spacer, Text } from "@chakra-ui/react";
import { addressEqual } from "@usedapp/core";
import { constants, ethers } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";
import { NextPage } from "next";
import { isErrored } from "stream";
import {
  useAccount,
  useBalance,
  useContractEvent,
  useWaitForTransaction,
} from "wagmi";

import useApproveGGP from "@/hooks/approve";
import useStakingContract from "@/hooks/contracts/staking";
import useTokenGGPContract from "@/hooks/contracts/tokenGGP";
import { useGetGGPStake, useStakeGGP } from "@/hooks/useStake";
import { newApproveGGP, useAllowance } from "@/hooks/useTokenGGP";

const Stake: NextPage = () => {
  console.log("STRAT OF PAGE LOAD");
  const { address } = useAccount();
  const amount = ethers.utils.parseEther("222");
  console.log("amount", amount);
  const { data: ggpStake } = useGetGGPStake(address);
  const { address: ggpAddress, contractInterface } = useTokenGGPContract();
  const { address: stakingAddress } = useStakingContract();
  console.log("staking addres", stakingAddress);

  const { data: ggpBalance } = useBalance({
    addressOrName: address,
    token: ggpAddress,
  });

  // const realStake = Number(formatEther(ggpBalance? || 0));

  const {
    data: approveData,
    write: approve,
    isLoading: isApproveLoading,
    isError: isApproveError,
    status: approveStatus,
  } = newApproveGGP(constants.MaxUint256);
  console.log("is approval loading", isApproveLoading);
  console.log("is approval error", isApproveError);
  console.log("status", isApproveError);
  console.log("approval data", approveData);
  console.log("approval data value", approveData);

  const { data, isError, isLoading } = useWaitForTransaction({
    hash: approveData?.hash,
  });
  console.log("wait data", data);
  console.log("is error data", isError);
  console.log("is loading data", isLoading);

  const {
    data: stakeData,
    write: stakeGGP,
    isLoading: isStakeLoading,
    isError: isStakeError,
    status: stakeStatus,
  } = useStakeGGP(amount);

  console.log("isLoading", isStakeLoading);
  console.log("isError", isStakeError);
  console.log("stakedata", stakeData);
  console.log("stake ggp", stakeGGP);

  const handleClick = () => {
    stakeGGP();
  };

  const handleApprove = () => {
    approve();
  };

  const { data: allowance, isError: allowanceError } = useAllowance(
    address,
    stakingAddress
  );
  console.log("allowance", allowance);
  console.log("allowance error", allowanceError);

  useContractEvent({
    addressOrName: ggpAddress,
    contractInterface: contractInterface,
    eventName: "Approval",
    listener: (event) => console.log("EVENT FOUND", event),
  });

  console.log("ggpStake", ggpStake);
  return (
    <>
      <Text>Learning how to stake</Text>
      <Button onClick={handleApprove}> approve it</Button>
      <Button onClick={handleClick}>Stake it baby</Button>
      <Spacer />
      <Text>stake is: {ggpStake.toLocaleString()}</Text>
      <Text>
        ggpBalance:{" "}
        {/* {Number(formatEther(ggpBalance?.value, { commify: true, pad: true }))} */}
        {Number(formatUnits(ggpBalance?.value || 0, 0))}
      </Text>
      <Text>allowance: {Number(formatEther(allowance || 0))}</Text>
    </>
  );
};

export default Stake;
