type CeresObjNum = {
  name: string
  title: string
  desc: string
  value: number
}

type CeresObjBool = {
  name: string
  title: string
  desc: string
  value: boolean
}

type CeresObjString = {
  name: string
  title: string
  desc: string
  value: string
}

export type Ceres = {
  minipoolsPrelaunch: CeresObjNum
  minipoolsLaunched: CeresObjNum
  minipoolsStaking: CeresObjNum
  minipoolsWithdrawable: CeresObjNum
  minipoolsFinished: CeresObjNum
  minipoolsCanceled: CeresObjNum
  minipoolsError: CeresObjNum
  totalAVAXLiquidStakerAmt: CeresObjNum
  numStakers: CeresObjNum
  effectiveGGPStake: CeresObjNum
  totalAssets: CeresObjNum
  lastSync: CeresObjNum
  lastRewardsAmt: CeresObjNum
  totalReleasedAssets: CeresObjNum
  stakingTotalAssets: CeresObjNum
  amountAvailableForStaking: CeresObjNum
  ggavaxAvaxExchangeRate: CeresObjNum
  stakerCount: CeresObjNum
  totalGGPStake: CeresObjNum
  rewardsEligibilityMinSeconds: CeresObjNum
  rewardsCycleSeconds: CeresObjNum
  rewardsCycleStartTime: CeresObjNum
  inflationIntervalRate: CeresObjString
  inflationIntervalSeconds: CeresObjNum
  minipoolMinAVAXStakingAmt: CeresObjNum
  minipoolNodeCommisionFeePct: CeresObjNum
  minipoolMaxAVAXAssignment: CeresObjNum
  minipoolMinAVAXAssignment: CeresObjNum
  expectedAVAXRewardRate: CeresObjNum
  maxCollateralizationRatio: CeresObjNum
  minCollateralizationRatio: CeresObjNum
  targetGGAVAXReserveRate: CeresObjNum
  ggpPriceInAVAX: CeresObjNum
  ggpPriceUpdateTime: CeresObjNum
  canStartRewardsCycle: CeresObjBool
  rewardsCyclesElapsed: CeresObjNum
  rewardCycleTotalAmt: CeresObjNum
  inflationIntervalStartTime: CeresObjNum
  inflationIntervalsElapsed: CeresObjNum
  claimingContractDistributionNodeOp: CeresObjNum
  claimingContractDistributionProtocolDAO: CeresObjNum
  RialtoChandlerUp: CeresObjNum
  RialtoJohnUp: CeresObjNum
  RialtoEmersonUp: CeresObjNum
  RialtoJulieUp: CeresObjNum
  RialtoCamUp: CeresObjNum
  RialtoChandlerQuorum: CeresObjNum
  RialtoJohnQuorum: CeresObjNum
  RialtoEmersonQuorum: CeresObjNum
  RialtoJulieQuorum: CeresObjNum
  RialtoCamQuorum: CeresObjNum
  RialtoChandlerVersion: CeresObjString
  RialtoJohnVersion: CeresObjString
  RialtoEmersonVersion: CeresObjString
  RialtoJulieVersion: CeresObjString
  RialtoCamVersion: CeresObjString
  rialtoPeers: CeresObjNum
  PBalance: CeresObjNum
  CBalance: CeresObjNum
  orcOnline: CeresObjBool
  avaxPrice: CeresObjNum
  tvlPercentChangeMonth: CeresObjNum
  tvlPercentChangeWeek: CeresObjNum
  liquidStakingPercentChangeMonth: CeresObjNum
  liquidStakingPercentChangeWeek: CeresObjNum
  ggpPercentChangeMonth: CeresObjNum
  ggpPercentChangeWeek: CeresObjNum
  ggpStakePercentChangeMonth: CeresObjNum
  ggpStakePercentChangeWeek: CeresObjNum
  totalMinipoolsPercentChangeMonth: CeresObjNum
  totalMinipoolsPercentChangeWeek: CeresObjNum
  effectiveGGPStakePercentChangeMonth: CeresObjNum
  effectiveGGPStakePercentChangeWeek: CeresObjNum
  ggAVAXMonthlyInterestMonth: CeresObjNum
  ggAVAXAPY: CeresObjNum
}
