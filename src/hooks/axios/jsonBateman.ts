import axios from 'axios'

export async function getAvaxPrice() {
  const priceAPIAvax = await axios.get('https://www.jsonbateman.com/avax_price')
  return priceAPIAvax.data.price
}

export async function getUSDCPrice() {
  const priceAPIUSDC = await axios.get('https://www.jsonbateman.com/usdc_price')
  return priceAPIUSDC.data.price
}
