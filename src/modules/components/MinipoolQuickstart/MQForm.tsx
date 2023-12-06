// Placeholder for the info icon
import { useEffect, useState } from 'react'

import { Box, CircularProgress, Flex, Link, Text } from '@chakra-ui/react'
import axios from 'axios'
import Image from 'next/image'
import { FiCalendar, FiMapPin } from 'react-icons/fi'
import useAsyncEffect from 'use-async-effect'
import { useNetwork } from 'wagmi'

import { fuji } from '@/config/chains'
import {
  DEFAULT_AVAX_NUMBER,
  DEFAULT_DURATION,
  DEFAULT_GGP_NUMBER,
} from '@/constants/chainDefaults'
import { Countries } from '@/constants/countries'
import { useFindBestRateAndPlan } from '@/hooks/useOonodzWrapper'
import { colors } from '@/theme/colors'

import avaxIcon from '/public/assets/img/token/avax.png'

const MQForm = ({ formData, setFormData, showHardwareCostLoading }) => {
  const { chain } = useNetwork()
  const [avaxPrice, setAvaxPrice] = useState(null)

  const { data: nodeRentalFeeUSD } = useFindBestRateAndPlan(
    formData.validationLength,
    true,
    formData.location,
  )

  useAsyncEffect(async () => {
    let response

    if (chain?.id == fuji.id) {
      response = 10
      setAvaxPrice(response)
    } else {
      response = await axios.get('https://www.jsonbateman.com/avax_price')
      setAvaxPrice(response.data.price)
    }
  }, [])

  const nodeRentalFeeAvax = avaxPrice
    ? parseFloat((Math.round((nodeRentalFeeUSD / avaxPrice) * 10) / 10 + 0.1).toFixed(2))
    : showHardwareCostLoading

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      nodeRentalFee: nodeRentalFeeAvax,
      deposit:
        DEFAULT_AVAX_NUMBER[chain?.id] + DEFAULT_GGP_NUMBER[chain?.id] + prevFormData.nodeRentalFee,
    }))
  }, [nodeRentalFeeAvax, setFormData, formData.nodeRentalFee]) // eslint-disable-line
  // eslint disabled so we can use 'chain?.id'

  return (
    <Box
      alignItems="center"
      bg={colors.grey[0]}
      border="1px"
      borderColor="gray.300"
      borderRadius="16px"
      display="flex"
      flexDirection="column"
      height={'670px'}
      justifyContent="center"
      w="full"
    >
      <Box display="flex" flexDirection="column" py={12} w="80%">
        <Box
          alignItems="start"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          w={'full'}
        >
          <Text className="font-domaine text-4xl">Let&apos;s create your Minipool</Text>
          <Box w="80%">
            <Text className="text-sm" mb={2} mt={4}>
              By staking {DEFAULT_AVAX_NUMBER[chain?.id] + DEFAULT_GGP_NUMBER[chain?.id]} AVAX and
              setting your validation length, we generate a custom NodeID (price varies) and set up
              your GGP collateralization for you automatically.
            </Text>
          </Box>
          <Text className="text-xs font-bold">
            Already have GGP or a Node ID? Try
            <Link href="/create-minipool-manually" ml={1} textDecoration="underline">
              Manual Setup
            </Link>
          </Text>
        </Box>
        <Box py={'3'}>
          <Box alignItems="start" className="text-sm" display="flex" justifyContent="space-between">
            <Text className="text-xs font-bold" my={2}>
              DEPOSIT AVAX
            </Text>
          </Box>
          <Flex
            border="1px"
            borderColor="blue.200"
            borderRadius="6px"
            className="focus-within:border-blue-400 focus-within:outline focus-within:outline-1 focus-within:outline-blue-400"
            pl={'3'}
            py={'2'}
          >
            <span className="flex w-8 items-center justify-center">
              <Image alt="AVAX" src={avaxIcon} width={20} />
              <Text color={colors.blue[200]} fontSize={'20px'} fontWeight={'hairline'}>
                &nbsp;|
              </Text>
            </span>
            <input
              className="w-full border-none pl-2 focus:border-none focus:outline-none"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deposit: e.target.value,
                })
              }
              placeholder={
                DEFAULT_AVAX_NUMBER[chain?.id] +
                DEFAULT_GGP_NUMBER[chain?.id] +
                formData.nodeRentalFee
              }
              readOnly
              value={
                chain?.id == null
                  ? 'Please connect your wallet'
                  : DEFAULT_AVAX_NUMBER[chain?.id] +
                    DEFAULT_GGP_NUMBER[chain?.id] +
                    formData.nodeRentalFee
              }
            />
          </Flex>
          <Box alignItems="center" display="flex" justifyContent="space-between">
            <Text className="text-xs font-bold" color={colors.grey[400]}>
              Hardware hosting cost:{' '}
              {showHardwareCostLoading ? (
                <>
                  <CircularProgress
                    color="green.300"
                    isIndeterminate
                    size="12px"
                    thickness="20px"
                    value={70}
                  />
                </>
              ) : (
                `${formData.nodeRentalFee} AVAX`
              )}
            </Text>

            {/* FOR V2
            <Link
              className="text-xs font-bold"
              color={colors.blue[500]}
              href="#"
              textDecoration="underline"
            >
              Already have a Node ID?
            </Link>{' '} */}
          </Box>
        </Box>

        <Box my={4}>
          <Text className="text-xs font-bold" mb={2}>
            SELECT YOUR COUNTRY OF RESIDENCY
          </Text>
          <Flex
            border="1px"
            borderColor="blue.200"
            borderRadius="6px"
            className="focus-within:border-blue-400 focus-within:outline focus-within:outline-1 focus-within:outline-blue-400"
            px={'3'}
            py={'2'}
          >
            <span className="flex w-8 items-center justify-center">
              <FiMapPin color={colors.blue[500]} size={18} />
              <Text color={colors.blue[200]} fontSize={'20px'} fontWeight={'hairline'}>
                &nbsp;|
              </Text>
            </span>
            <select
              className="w-full truncate border-none pl-1 focus:border-none focus:outline-none"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
              placeholder="Select option"
              value={formData.location}
            >
              <option value="">Your location is needed for ooNodz...</option>
              {Countries.map((country) => (
                <option key={country.numeric} value={country.numeric}>
                  {country.name}
                </option>
              ))}
            </select>
          </Flex>
        </Box>

        <Box my={4}>
          <Text className="text-xs font-bold" mb={2}>
            SET VALIDATION LENGTH
          </Text>
          <Flex
            border="1px"
            borderColor="blue.200"
            borderRadius="6px"
            className="focus-within:border-blue-400 focus-within:outline focus-within:outline-1 focus-within:outline-blue-400"
            px={'3'}
            py={'2'}
          >
            <span className="flex w-8 items-center justify-center">
              <FiCalendar color={colors.blue[500]} size={18} />
              <Text color={colors.blue[200]} fontSize={'20px'} fontWeight={'hairline'}>
                &nbsp;|
              </Text>
            </span>
            <select
              className="w-full truncate border-none pl-1 focus:border-none focus:outline-none"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  validationLength: e.target.value,
                })
              }
              placeholder="Select option"
              value={formData.length}
            >
              {chain?.id == null ? (
                <option value="">Please connect your wallet</option>
              ) : (
                DEFAULT_DURATION[chain?.id] && (
                  <>
                    <option value="">You need a min. 15 days to run...</option>
                    {DEFAULT_DURATION[chain?.id].map((duration: string) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </>
                )
              )}
            </select>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default MQForm
