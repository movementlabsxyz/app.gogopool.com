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

import { HexString } from '@/types/cryptoGenerics'
import { WEI_VALUE } from '@/utils/consts'

export type BigNumberJSON = {
  type: string
  hex: HexString
}

export type CalculatorReq = {
  ggpStaked: BigNumberJSON
  avaxStaked: BigNumberJSON
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const postData: CalculatorReq = req.body
    const stakersData = await fetchStakersData()
    const ggpPriceInAvaxData = await fetchGGPPriceInAvax()

    // viem's readContract returns everything as bigint, must convert to BigNumber
    const { avaxStaked, ggpStaked } = convertPost(postData)
    const stakers = convertStakers(stakersData)
    const [price] = ggpPriceInAvaxData
    const ggpPriceInAvax = BigNumber.from(price)

    // calculate rewards and apy
    const { retailTegs } = calculateTEGS(stakers, ggpPriceInAvax, ggpStaked)
    const ggpReward = getRewardAmount(ggpStaked, retailTegs)
    const avaxStakedInGGP = avaxStaked.mul(WEI_VALUE).div(ggpPriceInAvax)
    const ggpSpent = avaxStakedInGGP.add(ggpStaked)
    const apy = ggpReward.mul(WEI_VALUE).div(ggpSpent).mul(12)

    res.send({
      ggpReward: ggpReward,
      apy: apy,
    })
  } else if (req.method === 'GET') {
    res.send(`Rewards Estimator endpoint. To estimate, POST the following: 
       { 
         ggpStaked: BigNumber
         avaxStaked: BigNumber
       }`)
  } else {
    res.status(405).send('Invalid method, POST and GET are accepted')
  }
}
