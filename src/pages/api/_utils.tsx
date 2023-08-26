import { BigNumber } from 'ethers'

import axios from 'axios'
import { createPublicClient, http, parseEther } from 'viem'
import { avalanche } from 'viem/chains'

import Oracle from '@/contracts/Oracle'
import Staking from '@/contracts/Staking'
import { HexString } from '@/types/cryptoGenerics'
import { INVESTOR_LIST, RETAIL_REWARD_POOL, WEI_VALUE } from '@/utils/consts'

export type CalculatorData = {
  ggpStaked: BigNumber
  avaxStaked: BigNumber
}

export type Staker = {
  stakerAddr: HexString
  avaxAssigned: BigNumber
  avaxStaked: BigNumber
  avaxValidating: BigNumber
  avaxValidatingHighWater: BigNumber
  ggpRewards: BigNumber
  ggpStaked: BigNumber
  lastRewardsCycleCompleted: BigNumber
  rewardsStartTime: BigNumber
  ggpLockedUntil: BigNumber
}

const client = createPublicClient({
  chain: avalanche,
  transport: http(),
})

/**
 * Fetch stakers data
 */
export async function fetchStakersData() {
  return client.readContract({
    address: '0x9946e68490D71Fe976951e360f295c4Cf8531D00',
    abi: Staking,
    functionName: 'getStakers',
    args: [BigInt(0), BigInt(1000)],
  })
}

/**
 * Fetch GGP price in AVAX
 */
export async function fetchGGPPriceInAvax() {
  return client.readContract({
    abi: Oracle,
    address: '0x30fb915258D844E9dC420B2C3AA97420AEA16Db7',
    functionName: 'getGGPPriceInAVAX',
  })
}

/**
 * Fetch AVAX price in USD
 */
export async function fetchAvaxPriceUSD() {
  return axios.get('https://jsonbateman.com/avax_price')
}

/**
 * Reward amount in GGP
 */
export function getRewardAmount(ggpStake: BigNumber, totalGGPStake: BigNumber) {
  return ggpStake.mul(WEI_VALUE).div(totalGGPStake).mul(RETAIL_REWARD_POOL).div(WEI_VALUE)
}

/**
 * Calculate total effective GGP staked
 */
export function calculateTEGS(stakers: Staker[], ggpPriceInAvax: BigNumber, ggpStaked: BigNumber) {
  let retailTegs = ggpStaked
  let investorTegs = BigNumber.from('0')

  stakers
    .filter((staker) => {
      return staker.avaxValidatingHighWater.div(WEI_VALUE) && staker.rewardsStartTime.gt(0)
    })
    .map((staker) => {
      // 150% of high water is the max value that will be counted as effective ggp.
      const max = staker.avaxValidatingHighWater.mul(parseEther('1.5')).div(WEI_VALUE)
      const ggpAsAVAX = staker.ggpStaked.mul(ggpPriceInAvax).div(WEI_VALUE)
      // effective ggp staked is the amount of GGP that can be counted towards rewards.
      let effectiveGGPStaked = staker.ggpStaked
      if (!ggpPriceInAvax.eq(parseEther('0'))) {
        effectiveGGPStaked = ggpAsAVAX.gt(max)
          ? max.mul(WEI_VALUE).div(ggpPriceInAvax)
          : staker.ggpStaked
      }

      if (!INVESTOR_LIST.includes(staker.stakerAddr)) {
        retailTegs = retailTegs.add(effectiveGGPStaked)
      } else {
        investorTegs = investorTegs.add(effectiveGGPStaked)
      }

      const collateralRatio = ggpAsAVAX.mul(WEI_VALUE).div(staker.avaxValidatingHighWater)

      return { ...staker, effectiveGGPStaked, collateralRatio }
    })

  return { retailTegs, investorTegs }
}

/**
 * converts bigint values to BigNumbers
 */
export function convertStakers(a): Staker[] {
  for (const obj of a) {
    for (const key in obj) {
      if (typeof obj[key] === 'bigint') {
        obj[key] = BigNumber.from(obj[key])
      }
    }
  }
  return a
}

/**
 * converts every value on the object to BigNumbers
 */
export function convertPost(o): CalculatorData {
  if (typeof o === 'object') {
    for (const key in o) {
      o[key] = BigNumber.from(o[key])
    }
    return o
  }
  return o
}
