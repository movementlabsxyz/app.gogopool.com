/* eslint-disable no-console */

const addToken = async (address, symbol, decimals = 18): Promise<boolean> => {
  if (window.ethereum === undefined) {
    return false
  }

  try {
    await window?.ethereum?.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol: symbol,
          decimals: decimals,
        },
      },
    })
  } catch (e: unknown) {
    console.error(e)
    return false
  }

  return true
}

export default addToken
