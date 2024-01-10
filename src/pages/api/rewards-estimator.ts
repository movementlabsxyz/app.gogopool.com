import { BigNumber } from 'ethers'

import { NextApiRequest, NextApiResponse } from 'next'

import {
  calculateTEGS,
  convertPost,
  convertStakers,
  fetchGGPPriceInAvax,
  fetchStakersData,
  getRewardAmount,
} from './_utils'

import { CalculatorReq } from '@/types/api/rewards-estimator'
import { INVESTOR_LIST, WEI_VALUE } from '@/utils/consts'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const postData: CalculatorReq = req.body
    const stakersData = await fetchStakersData(postData.chainId)
    const ggpPriceInAvaxData = await fetchGGPPriceInAvax(postData.chainId)

    // viem's readContract returns everything as bigint, must convert to BigNumber
    const { avaxStaked, ggpStaked, walletAddress } = convertPost(postData)
    const stakers = convertStakers(stakersData)
    const [price] = ggpPriceInAvaxData
    const ggpPriceInAvax = BigNumber.from(price)

    // calculate rewards and apy
    let ggpReward: BigNumber
    const { investorTegs, retailTegs } = calculateTEGS(stakers, ggpPriceInAvax)
    if (INVESTOR_LIST.includes(walletAddress)) {
      ggpReward = await getRewardAmount(
        ggpStaked,
        investorTegs,
        walletAddress,
        postData.chainId,
        true,
      )
    } else {
      ggpReward = await getRewardAmount(ggpStaked, retailTegs, walletAddress, postData.chainId)
    }
    const avaxStakedInGGP = avaxStaked.mul(WEI_VALUE).div(ggpPriceInAvax)
    const ggpSpent = avaxStakedInGGP.add(ggpStaked)
    const apy = ggpReward.mul(WEI_VALUE).div(ggpSpent).mul(12).mul(100)

    res.send({
      ggpReward: ggpReward,
      apy: apy,
    })
  } else if (req.method === 'GET') {
    res.send(`Rewards Estimator endpoint. To estimate, POST the following: 
       { 
         ggpStaked: BigNumber
         avaxStaked: BigNumber
         walletAddress: HexString
         chainId: number
       }`)
  } else {
    res.status(405).send('Invalid method, POST and GET are accepted')
  }
}
