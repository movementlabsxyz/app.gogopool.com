import { parseEther } from 'ethers/lib/utils.js'

export const DEFAULT_AVAX = {
  43112: parseEther('1000'),
  43113: parseEther('1'),
  43114: parseEther('1000'),
}
export const DEFAULT_GGP = {
  43112: parseEther('100'),
  43113: parseEther('1'),
  43114: parseEther('110'),
}
export const DEFAULT_AVAX_NUMBER = {
  43112: 1000,
  43113: 1,
  43114: 1000,
}
export const DEFAULT_GGP_NUMBER = {
  43112: 100,
  43113: 1,
  43114: 110,
}
export const DEFAULT_TRANSACTION_LINK = {
  43112: `https://testnet.snowtrace.io/tx/`,
  43113: `https://testnet.snowtrace.io/tx/`,
  43114: `https://snowtrace.io/tx/`,
}
export const DEFAULT_OONODZ_LINK = {
  43112: `https://app.testnet.oonodz.network/?redirect=ggp&nid=`,
  43113: `https://app.testnet.oonodz.network/?redirect=ggp&nid=`,
  43114: `https://app.oonodz.network/?redirect=ggp&nid=`,
}
export const DEFAULT_DURATION = {
  43112: ['15 minutes'],
  43113: ['1 day'],
  43114: [
    '15 days',
    '30 days',
    '60 days',
    '90 days',
    '120 days',
    '150 days',
    '180 days',
    '210 days',
    '240 days',
    '270 days',
    '300 days',
    '330 days',
    '365 days',
  ],
}
