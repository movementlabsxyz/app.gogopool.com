import { BigNumber } from 'ethers'

import axios from 'axios'
import { solidityKeccak256 } from 'ethers/lib/utils.js'
import { createPublicClient, http, parseEther } from 'viem'
import { avalanche } from 'viem/chains'

import { fuji } from '@/config/chains'
import { storageAddresses } from '@/constants/storageAddresses'
import Oracle from '@/contracts/Oracle'
import Staking from '@/contracts/Staking'
import Storage from '@/contracts/Storage'
import { CalculatorData, Staker } from '@/types/api/rewards-estimator'
import { HexString } from '@/types/cryptoGenerics'
import { INVESTOR_LIST, INVESTOR_REWARD_POOL, RETAIL_REWARD_POOL, WEI_VALUE } from '@/utils/consts'

const customTransport = http(process.env.API_RPC_ENDPOINT)

const client = createPublicClient({
  chain: avalanche,
  transport: customTransport,
})

const fujiClient = createPublicClient({
  chain: fuji,
  transport: http(),
})

function getClient(chainId: number) {
  return chainId == 43114 ? client : fujiClient
}

export async function getContractAddress(contractName: string, chainId: number) {
  const args = solidityKeccak256(
    ['string', 'string'],
    ['contract.address', contractName],
  ) as HexString

  return getClient(chainId).readContract({
    address: storageAddresses[chainId],
    abi: Storage,
    functionName: 'getAddress',
    args: [args],
  })
}

/**
 * Fetch stakers data
 */
export async function fetchStakersData(chainId: number) {
  return getClient(chainId).readContract({
    address: await getContractAddress('Staking', chainId),
    abi: Staking,
    functionName: 'getStakers',
    args: [BigInt(0), BigInt(1000)],
  })
}

/**
 * Fetch GGP price in AVAX
 */
export async function fetchGGPPriceInAvax(chainId: number) {
  return getClient(chainId).readContract({
    abi: Oracle,
    address: await getContractAddress('Oracle', chainId),
    functionName: 'getGGPPriceInAVAX',
  })
}

/**
 * Fetch AVAX price in USD
 */
export async function fetchAvaxPriceUSD() {
  const response = await axios.get('https://jsonbateman.com/avax_price')
  return response.data.price
}

/**
 * Fetch AVAX price in USD
 */
export async function getEffectiveGGPStaked(walletAddress: HexString, chainId: number) {
  return getClient(chainId).readContract({
    abi: Staking,
    address: await getContractAddress('Staking', chainId),
    functionName: 'getEffectiveGGPStaked',
    args: [walletAddress],
  })
}

/**
 * Reward amount in GGP
 */
export async function getRewardAmount(
  ggpStake: BigNumber,
  totalGGPStake: BigNumber,
  walletAddress: HexString,
  chainId: number,
  investor?: boolean,
) {
  // Get the amount of ggpstaked at a wallet address
  let effectiveGGPStaked = BigNumber.from(await getEffectiveGGPStaked(walletAddress, chainId))
  // If they have no ggp stake, allow the value passed to the endpoint to be the true value to estimate
  if (effectiveGGPStaked.eq(0)) {
    effectiveGGPStaked = ggpStake
  }
  if (investor) {
    return effectiveGGPStaked
      .mul(WEI_VALUE)
      .div(totalGGPStake)
      .mul(INVESTOR_REWARD_POOL)
      .div(WEI_VALUE)
  }
  return effectiveGGPStaked.mul(WEI_VALUE).div(totalGGPStake).mul(RETAIL_REWARD_POOL).div(WEI_VALUE)
}

/**
 * Calculate total effective GGP staked
 */
export function calculateTEGS(stakers: Staker[], ggpPriceInAvax: BigNumber) {
  let retailTegs = BigNumber.from('0')
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

      let collateralRatio = BigNumber.from(0)
      if (staker.avaxValidatingHighWater.gt(0)) {
        collateralRatio = ggpAsAVAX.mul(WEI_VALUE).div(staker.avaxValidatingHighWater)
      }

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
 * converts every object value on the object to BigNumbers
 */
export function convertPost(o): CalculatorData {
  if (typeof o === 'object') {
    for (const key in o) {
      if (typeof o[key] === 'object') {
        o[key] = BigNumber.from(o[key])
      }
    }
    return o
  }
}
