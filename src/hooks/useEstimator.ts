import axios from 'axios'

import { CalculatorData } from '@/types/api/rewards-estimator'

export default async function postEstimator(postData: CalculatorData) {
  const res = await axios.post('/api/rewards-estimator', postData)
  const { data } = res

  return data
}
