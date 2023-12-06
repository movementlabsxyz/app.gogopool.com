import React, { useRef, useState } from 'react'

import { Box, Button, Text } from '@chakra-ui/react'
import { shortenTransactionHash } from '@usedapp/core'
import Link from 'next/link'
import { useNetwork } from 'wagmi'

import { DEFAULT_OONODZ_LINK, DEFAULT_TRANSACTION_LINK } from '@/constants/chainDefaults'
import { useMinipoolsByStatus } from '@/hooks/minipool'
import { colors } from '@/theme/colors'
import { ordinal_suffix } from '@/utils/misc'

const InfoBox = ({ label, value }) => (
  <Box
    alignItems="center"
    borderBottom="1px solid"
    color="#DB9067"
    display="flex"
    justifyContent="space-between"
    mb={3}
    pb={3}
    w="full"
  >
    <Text className="text-sm font-bold" color={colors.yellow[900]}>
      {label}
    </Text>
    <Text className="text-sm font-bold" color={colors.yellow[800]}>
      {value}
    </Text>
  </Box>
)

const MQSuccess = ({ formData, transactionData }) => {
  const { chain } = useNetwork()
  const { data: minipoolsPrelaunch } = useMinipoolsByStatus({
    status: 0,
  })
  const today = new Date()
  const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(
    today.getDate(),
  ).padStart(2, '0')}-${today.getFullYear()}`
  const [playVideo, setPlayVideo] = useState(false)
  const videoRef = useRef(null)
  const handleImageClick = () => {
    setPlayVideo(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }
  return (
    <Box
      alignItems="center"
      bg="blue.500"
      borderRadius="32px"
      display="flex"
      flexBasis={'1280px'}
      flexDirection="row"
      justifyContent="space-between"
      p={7}
    >
      <Box display="flex" flexDirection="row" gap={6} justifyContent="space-between" width="100%">
        <Box
          alignItems="center"
          borderRadius="16px"
          display="flex"
          flexDirection="column"
          maxW={'600px'}
          minW={'400px'}
          p={3}
          width="50%"
        >
          {/* Header Image */}
          <img alt="Success Header" src="/assets/img/gogopass/success-header.svg" />

          {/* Banner Image */}
          <img alt="Success Banner" src="/assets/img/gogopass/success-banner-v2.svg" />
          <hr className="mt-4 h-[1px] w-full border-none bg-black"></hr>
          <Box
            alignItems="center"
            color={colors.grey[0]}
            display="flex"
            gap={4}
            justifyContent="space-between"
            py={4}
            w="100%"
          >
            <Text className="text-sm font-bold">{transactionData.nodeID}</Text>
            <Link href={`${DEFAULT_OONODZ_LINK[chain?.id]}${transactionData.nodeID}`}>
              <Button
                border="1px"
                borderColor={colors.blue[300]}
                size="xs"
                textColor={colors.grey[0]}
                variant="secondary-filled"
              >
                View on ooNodz
              </Button>
            </Link>
          </Box>

          {/* Info Box */}
          <Box
            backgroundColor={colors.caution[400]}
            borderRadius="16px"
            boxShadow="0px 8px 0px 0px #9A5400"
            padding="4%"
            width="100%"
          >
            <InfoBox label="AVAX DEPOSITED" value={formData.deposit} />
            <InfoBox label="VALIDATION LENGTH" value={formData.validationLength.toUpperCase()} />
            <InfoBox label="MINIPOOL CREATION DATE" value={formattedDate} />
            <InfoBox label="STATUS" value="PRELAUNCH" />
            <Box alignItems="center" display="flex" justifyContent="space-between" w="full">
              <Text className="text-sm font-bold" color={colors.yellow[900]}>
                TRANSACTION HASH
              </Text>
              <Box alignItems="center" display="flex">
                <Link href={`${DEFAULT_TRANSACTION_LINK[chain?.id]}${transactionData.hash}`}>
                  <Text className="text-sm font-bold underline" color={colors.yellow[800]}>
                    {transactionData.hash && shortenTransactionHash(transactionData.hash)}
                  </Text>
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Buttons */}
          <Box alignItems="center" display="flex" justifyContent="center" mt={6} width="100%">
            <Box
              alignItems="center"
              color={colors.blue[200]}
              display="flex"
              justifyContent="space-between"
              w="full"
            >
              {minipoolsPrelaunch && minipoolsPrelaunch.length > 0 ? (
                <span>
                  You will be&nbsp;
                  <span className="font-bold" style={{ color: colors.blue[50] }}>
                    {ordinal_suffix(minipoolsPrelaunch.length)} in line
                  </span>
                  &nbsp;for Minipool launch!
                </span>
              ) : (
                <span>Your minipool will be matched with 1000 AVAX!</span>
              )}
            </Box>
            <Link className="flex w-60" href={'/dashboard'}>
              <Button
                alignContent="space-between"
                border="1px"
                borderColor={colors.blue[300]}
                leftIcon={<img alt="Stats Icon" src="/assets/img/gogopass/stats-icon.svg" />}
                textColor={colors.grey[0]}
                variant="secondary-filled"
                width="full"
              >
                Go to Dashboard
              </Button>
            </Link>
            {/* FOR V2
            <Button
              border="1px"
              borderColor={colors.blue[300]}
              leftIcon={<img alt="Details Icon" src="/assets/img/gogopass/details-icon.svg" />}
              textColor={colors.grey[0]}
              variant="outline"
              width="40%"
            >
              Detailed Receipt
            </Button> */}
          </Box>
        </Box>

        {/* Right Panel */}
        <Box
          alignItems="center"
          backgroundColor={colors.yellow[50]}
          borderRadius="15px"
          display="flex"
          flexBasis={'600px'}
          flexDirection="column"
          maxW={'600px'}
          minW={'400px'}
          p={10}
          width={'50%'}
        >
          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <img alt="Edge Left" src="/assets/img/gogopass/edges-left.svg" />
            <img alt="Greetings" src="/assets/img/gogopass/Greetings.svg" />
            <img alt="Edge Right" src="/assets/img/gogopass/edges-right.svg" />
          </Box>
          <Text className="text-sm font-bold" mb={7}>
            Excited to have you on board!
          </Text>
          <video controls ref={videoRef} style={{ display: playVideo ? 'block' : 'none' }}>
            <source src="/assets/img/gogopass/steves-message-v1.mp4" type="video/mp4" />
          </video>
          {!playVideo && (
            <img
              alt="Video Thumb Holder"
              onClick={handleImageClick}
              src="/assets/img/gogopass/video-thumb.svg"
              style={{ cursor: 'pointer' }}
            />
          )}
          <Box alignItems="start" display="flex" flexDirection="column" pt={5} width="100%">
            <Text size={'sm'}>
              Hi there! We probably haven’t met yet, but I’m GoGoPool’s co-founder – I told my team
              to add this page in specifically so I can thank you for trying out GoGoPool.
            </Text>
            <Text paddingTop={5} size={'sm'}>
              If you would like to meet with me, even just for a friendly chat, you can book time on
              my calendly link provided.
            </Text>
            <Text paddingTop={5}>Thanks,</Text>
            <Text as="span" fontWeight="bold">
              Steve
            </Text>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              pt={6}
              width={'full'}
            >
              <Link className="flex w-40" href={'https://calend.ly/gogopool'} target="_blank">
                <Button fontSize={'xs'} size={'sm'} variant="secondary-filled">
                  Book time with Steve
                </Button>
              </Link>
              <Box display="flex" flexDirection="row" gap={3} justifyContent="space-between">
                <Link className="flex" href="https://discord.gg/RWvx3TugqW" target="_blank">
                  <img alt="Discord" src="/assets/img/gogopass/discord-icon.svg" />
                </Link>
                <Link className="flex" href="https://twitter.com/GoGoPool_" target="_blank">
                  <img alt="X (Formerly Twitter)" src="/assets/img/gogopass/twitter-logo.svg" />
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MQSuccess
