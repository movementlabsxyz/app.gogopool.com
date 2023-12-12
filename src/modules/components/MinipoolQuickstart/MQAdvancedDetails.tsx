import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { formatEther } from 'ethers/lib/utils.js'
import { FiInfo } from 'react-icons/fi'
import { useNetwork } from 'wagmi'

import MQLegalAndSend from './MQLegalAndSend'

import { Tooltip } from '@/common/components/Tooltip'
import { DEFAULT_AVAX_NUMBER, DEFAULT_GGP_NUMBER } from '@/constants/chainDefaults'
import { colors } from '@/theme/colors'

const InfoBox = ({ color, label, value, width }) => (
  <Box
    alignItems="center"
    borderBottom="1px dashed"
    borderColor={colors.blue[300]}
    color={color}
    display="flex"
    justifyContent="space-between"
    ml="auto"
    py={2}
    w={width}
  >
    <Text className="text-sm font-bold" color={colors.blue[300]}>
      {label}
    </Text>
    <Box alignItems="center" display="flex">
      <Text className="font-bold">{value}</Text>
    </Box>
  </Box>
)

const MQAdvancedDetails = ({
  apy,
  formData,
  ggpReward,
  onBackToDetails,
  onCreationSuccess,
  setTransactionData,
}) => {
  const { chain } = useNetwork()
  return (
    <Box
      alignItems="flex-start"
      bg={colors.blue[800]}
      borderRadius="16px"
      color={colors.grey[0]}
      display="flex"
      flexDirection="column"
      h="full"
      justifyContent="center"
      w="full"
    >
      <Box display="flex" flexDirection="column" mx={10}>
        <Box
          alignItems="center"
          borderBottom="1px solid"
          borderColor={colors.blue[300]}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          w="100"
        >
          <Box
            alignItems={'center'}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            w="100%"
          >
            <Box display="flex" flexDirection="row">
              <img alt="Calculator" src="/assets/img/gogopass/bi-calculator.svg" />
              <Text className="text-lg font-bold" pl={2}>
                Minipool Price Breakdown
              </Text>
            </Box>

            <Link
              className="text-xs"
              color={colors.blue[300]}
              onClick={onBackToDetails}
              textDecoration="underline"
            >
              Basic Breakdown
            </Link>
          </Box>
          <Box display="flex" flexDirection="row" gap={1} justifyContent="start" w="full">
            <Text className="text-sm" color={colors.blue[300]} py={3}>
              Your Node will be hosted by{' '}
            </Text>
            <img alt="Oonodz Logo" src="/assets/img/gogopass/Oonodz-Logo.svg" />
          </Box>
        </Box>

        <InfoBox
          color={colors.grey[0]}
          label="TOTAL AVAX DEPOSITED"
          value={formData.deposit + ' AVAX'}
          width="100%"
        />
        <InfoBox
          color={colors.blue[300]}
          label="AVAX STAKED"
          value={DEFAULT_AVAX_NUMBER[chain?.id] + ' AVAX'}
          width="80%"
        />
        <InfoBox
          color={colors.blue[300]}
          label="GGP STAKE"
          value={DEFAULT_GGP_NUMBER[chain?.id] + ' AVAX'}
          width="80%"
        />
        <InfoBox
          color={colors.grey[0]}
          label="HARDWARE HOSTING FEE"
          value={formData.nodeRentalFee + ' AVAX'}
          width="80%"
        />
        <InfoBox
          color={colors.grey[0]}
          label="VALIDATION LENGTH"
          value={formData.validationLength.toUpperCase()}
          width="100%"
        />
        <InfoBox
          color={colors.grey[0]}
          label={
            <Flex gap={2}>
              <Text>POTENTIAL GGP REWARDS</Text>
              <Tooltip
                content={<Text>GGP Rewards for running a validator for 1 cycle</Text>}
                placement="top"
              >
                <FiInfo size="18px" />
              </Tooltip>
            </Flex>
          }
          value={Number(formatEther(ggpReward)).toFixed(2)}
          width="100%"
        />
        <InfoBox
          color={colors.grey[0]}
          label={
            <Flex gap={2}>
              <Text>POTENTIAL AVAX REWARDS</Text>
              <Tooltip
                content={<Text>AVAX Rewards for running a validator for 1 cycle</Text>}
                placement="top"
              >
                <FiInfo size="18px" />
              </Tooltip>
            </Flex>
          }
          value="3.90"
          width="100%"
        />
        <Box
          alignItems="center"
          borderBottom="1px solid"
          borderColor={colors.blue[300]}
          color={colors.grey[0]}
          display="flex"
          gap={2}
          justifyContent="end"
          py={2}
          w="full"
        >
          <Text className="text-xs font-bold">
            You earn {Number(formatEther(apy)).toFixed(2)}% more here than validating solo.{' '}
          </Text>
          <Tooltip
            content={
              <Text>Compared to the ~8% APY from running a validator node on Avalanche.</Text>
            }
            placement="top"
          >
            <FiInfo color="#FFF" size="18px" />
          </Tooltip>
        </Box>

        <MQLegalAndSend
          formData={formData}
          onCreationSuccess={onCreationSuccess}
          setTransactionData={setTransactionData}
        />
      </Box>
    </Box>
  )
}

export default MQAdvancedDetails
