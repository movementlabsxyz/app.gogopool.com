import { Box, Link, Text } from '@chakra-ui/react'
import { formatEther } from 'ethers/lib/utils.js'
import { FiInfo } from 'react-icons/fi'
import { parseEther } from 'viem'

import MQLegalAndSend from './MQLegalAndSend'

import { Tooltip } from '@/common/components/Tooltip'
import { colors } from '@/theme/colors'

const InfoBox = ({ hasLink, label, onShowPriceDetails, value }) => (
  <Box
    alignItems="center"
    borderBottom="1px dashed"
    borderColor={colors.blue[100]}
    color={colors.grey[0]}
    display="flex"
    justifyContent="space-between"
    py={4}
    w="full"
  >
    <Text className="text-sm font-bold" color={colors.blue[300]}>
      {label}
    </Text>
    <Box alignItems="center" display="flex">
      {hasLink && (
        <Link
          className="text-xs"
          color={colors.green[500]}
          onClick={onShowPriceDetails}
          textDecoration="underline"
        >
          Price Details
        </Link>
      )}
      <Text className="font-bold" ml={hasLink ? 4 : 0}>
        {value}
      </Text>
    </Box>
  </Box>
)

// Validators of AVAX earn ~8%, which is how I did the calculations
const MQBasicDetails = ({
  apy,
  formData,
  onCreationSuccess,
  onShowPriceDetails,
  setTransactionData,
}) => {
  return (
    <Box
      alignItems="center"
      borderRadius="16px"
      color={colors.grey[0]}
      display="flex"
      flexDirection="column"
      h="full"
      justifyContent="center"
      w="full"
    >
      <Box display="flex" flexDirection="column" p={6}>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          mb={8}
        >
          <img alt="Minipool" src="/assets/img/gogopass/minipool-icon.svg" />
          <Text className="font-domaine text-4xl" mt={2}>
            Your Minipool details
          </Text>
          <Text className="text-sm" color={colors.blue[200]} my={2} textAlign="center">
            Read through and confirm your details before you click create.
          </Text>
        </Box>

        <Box
          alignItems="center"
          borderBottom="1px solid"
          borderColor={colors.blue[300]}
          color={colors.grey[0]}
          display="flex"
          justifyContent="space-between"
          w="full"
        ></Box>
        <InfoBox
          hasLink={true}
          label="AVAX DEPOSITED"
          onShowPriceDetails={onShowPriceDetails}
          value={formData.deposit + ' AVAX'}
        />
        <InfoBox
          hasLink={false}
          label="VALIDATION LENGTH"
          onShowPriceDetails={onShowPriceDetails}
          value={formData.validationLength.toUpperCase()}
        />
        <InfoBox
          hasLink={false}
          label="POTENTIAL APY"
          onShowPriceDetails={onShowPriceDetails}
          value={
            <Text color={colors.green[500]}>{`${Number(
              formatEther(apy.add(parseEther('8'))),
            ).toFixed(2)}%`}</Text>
          }
        />
        <Box
          alignItems="center"
          borderBottom="1px solid"
          borderColor={colors.blue[300]}
          color={colors.grey[0]}
          display="flex"
          gap={2}
          justifyContent="end"
          p={3}
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

export default MQBasicDetails
