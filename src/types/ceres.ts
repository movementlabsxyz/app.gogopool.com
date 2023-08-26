type CeresObj = {
  name: string
  title: string
  desc: string
  value: number | boolean | null
}

export type Ceres = {
  minipoolsPrelaunch: CeresObj
  minipoolsLaunched: CeresObj
  minipoolsStaking: CeresObj
  minipoolsWithdrawable: CeresObj
  minipoolsFinished: CeresObj
  minipoolsCanceled: CeresObj
  minipoolsError: CeresObj
  totalAVAXLiquidStakerAmt: CeresObj
  numStakers: CeresObj
  effectiveGGPStake: CeresObj
  totalAssets: CeresObj
  lastSync: CeresObj
  lastRewardsAmt: CeresObj
  totalReleasedAssets: CeresObj
  stakingTotalAssets: CeresObj
  amountAvailableForStaking: CeresObj
  ggavaxAvaxExchangeRate: CeresObj
  stakerCount: CeresObj
  totalGGPStake: CeresObj
  rewardsEligibilityMinSeconds: CeresObj
  rewardsCycleSeconds: CeresObj
  inflationIntervalRate: CeresObj
  inflationIntervalSeconds: CeresObj
  minipoolMinAVAXStakingAmt: CeresObj
  minipoolNodeCommisionFeePct: CeresObj
  minipoolMaxAVAXAssignment: CeresObj
  minipoolMinAVAXAssignment: CeresObj
  expectedAVAXRewardRate: CeresObj
  maxCollateralizationRatio: CeresObj
  minCollateralizationRatio: CeresObj
  targetGGAVAXReserveRate: CeresObj
  ggpPriceInAVAX: CeresObj
  ggpPriceUpdateTime: CeresObj
  canStartRewardsCycle: CeresObj
  rewardsCyclesElapsed: CeresObj
  rewardCycleTotalAmt: CeresObj
  inflationIntervalStartTime: CeresObj
  inflationIntervalsElapsed: CeresObj
  claimingContractDistributionNodeOp: CeresObj
  claimingContractDistributionProtocolDAO: CeresObj
  orcOnline: CeresObj
  avaxPrice: CeresObj
  tvlPercentChangeMonth: CeresObj
  tvlPercentChangeWeek: CeresObj
  liquidStakingPercentChangeMonth: CeresObj
  liquidStakingPercentChangeWeek: CeresObj
  ggpPercentChangeMonth: CeresObj
  ggpPercentChangeWeek: CeresObj
  ggpStakePercentChangeMonth: CeresObj
  ggpStakePercentChangeWeek: CeresObj
  totalMinipoolsPercentChangeMonth: CeresObj
  totalMinipoolsPercentChangeWeek: CeresObj
  effectiveGGPStakePercentChangeMonth: CeresObj
  effectiveGGPStakePercentChangeWeek: CeresObj
  ggAVAXMonthlyInterestMonth: CeresObj
  circulatingSupply: CeresObj
}
