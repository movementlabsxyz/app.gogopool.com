import { BigNumber, ethers } from 'ethers'
import { useState } from 'react'

import { Box, Button, Checkbox, Link, useToast } from '@chakra-ui/react'
import axios from 'axios'
import useAsyncEffect from 'use-async-effect'
import { useNetwork } from 'wagmi'

import { DEFAULT_AVAX, DEFAULT_GGP } from '@/constants/chainDefaults'
import { useCreateStreamlinedMinipool } from '@/hooks/useMinipoolStreamliner'
import { useGetGGPPrice } from '@/hooks/useStake'
import { colors } from '@/theme/colors'

const weiValue = BigNumber.from('1000000000000000000') // represents 1 Ether in wei (10^18)

const MQLegalAndSend = ({ formData, onCreationSuccess, setTransactionData }) => {
  const { chain } = useNetwork()

  const [avaxPrice, setAvaxPrice] = useState(null)
  const [accept, setAccept] = useState(false)
  const [usdcPrice, setUSDCPrice] = useState(null)
  const { data: currentGgpPriceInAvax } = useGetGGPPrice()
  const [ggpPrice, setGgpPriceInUsd] = useState(null)

  useAsyncEffect(async () => {
    const priceAPIAvax = await axios.get('https://www.jsonbateman.com/avax_price')
    setAvaxPrice(parseFloat(priceAPIAvax.data.price).toFixed(2))

    const priceAPIUSDC = await axios.get('https://www.jsonbateman.com/usdc_price')
    setUSDCPrice(parseFloat(priceAPIUSDC.data.price).toFixed(2))

    if (currentGgpPriceInAvax && avaxPrice) {
      const avaxPriceBigNumber = ethers.utils.parseUnits(avaxPrice.toString(), 'ether')

      const calculatedGgpPriceInUsd = currentGgpPriceInAvax.mul(avaxPriceBigNumber).div(weiValue)

      // Convert to number, round to two decimal places and then back to a number
      const ggpPriceInUsdNumber = parseFloat(
        ethers.utils.formatEther(calculatedGgpPriceInUsd),
      ).toFixed(2)

      setGgpPriceInUsd(Number(ggpPriceInUsdNumber))
    }
  }, [currentGgpPriceInAvax, avaxPrice])

  const minAmountReceived = (amountSent, priceTokenSent, priceTokenReceived, slippage) => {
    const result = ((amountSent * priceTokenSent) / priceTokenReceived) * (1 - slippage)
    // Convert result (in wei) to BigNumber directly
    const weiBigNumber = ethers.BigNumber.from(result.toFixed(0)) // rounded to nearest whole number

    return weiBigNumber
  }

  const minUSDCOut =
    avaxPrice && usdcPrice
      ? minAmountReceived(formData.nodeRentalFee, avaxPrice, usdcPrice, 0.01)
      : ethers.BigNumber.from(0)

  const minGGPOut =
    avaxPrice && ggpPrice
      ? minAmountReceived(100, avaxPrice, ggpPrice, 0.01)
      : ethers.BigNumber.from(0)

  // convert days to seconds
  const daysToSeconds = (days: string): number => {
    const parsedDays = parseFloat(days)
    return parsedDays * 86400
  }

  // this is going to be less consistent functionality on fuji because we use
  // mainnet data/prices to do conversions and the swap pools on each network are not equivalent
  const { isLoading, ready, writeAsync } = useCreateStreamlinedMinipool(
    {
      nodeID: '0x0000000000000000000000000000000000000000',
      duration: BigNumber.from(daysToSeconds(formData.validationLength)),
      countryOfResidence: Number(formData.location),
      avaxForMinipool: DEFAULT_AVAX[chain?.id],
      avaxForGGP: DEFAULT_GGP[chain?.id],
      minGGPAmountOut: minGGPOut,
      avaxForNodeRental: ethers.utils.parseUnits(formData.nodeRentalFee.toString(), 18),
      minUSDCAmountOut: minUSDCOut,
      bestRate: true,
      withdrawalRightWaiver: accept, //checkbox
    },
    setTransactionData,
  )
  const toast = useToast()
  const handleCreateMinipool = () => {
    if (ready) {
      writeAsync()
        .then(() => {
          toast({
            title: 'Transaction sent',
            description:
              'Your minipool is being processed. You may have received some refunded USDC if your Node Rental Fee was less than we predicted.',
            status: 'info',
            duration: 5000,
            isClosable: true,
          })
          onCreationSuccess()
        })
        .catch((err) => {
          toast({
            title: 'Error',
            description:
              err.message +
              '. Please contact our team in the #support channel in our Discord if you need further assistance.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        })
    }
  }

  return (
    <Box>
      <Box alignItems="start" className="text-sm" display="flex" mt={2} py={6}>
        <Checkbox
          checked={accept}
          className="text-sm"
          colorScheme={colors.grey[0]}
          iconColor={colors.grey[0]}
          onChange={() => setAccept(!accept)}
        >
          I accept ooNodz{' '}
          <Link color={colors.green[500]} href="https://oonodz.network/Terms">
            terms and conditions
          </Link>
          . Service begins immediately after payment and I waive my 14-day right of withdrawal.{' '}
          <span className="font-bold">I also confirm that all details above are correct. </span>
        </Checkbox>
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          cursor={'pointer'}
          disabled={chain?.id == null || !accept ? true : false}
          isLoading={isLoading}
          onClick={handleCreateMinipool}
          size="md"
          textColor={colors.grey[1000]}
          variant="primary"
        >
          Create My Minipool
        </Button>
      </Box>
    </Box>
  )
}
export default MQLegalAndSend
