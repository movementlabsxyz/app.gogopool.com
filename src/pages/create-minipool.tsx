import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'

import { Box, Flex } from '@chakra-ui/react'
import useAsyncEffect from 'use-async-effect'
import { useAccount, useNetwork } from 'wagmi'

import { DEFAULT_AVAX, DEFAULT_GGP } from '@/constants/chainDefaults'
import postEstimator from '@/hooks/useEstimator'
import { useGetGGPPrice } from '@/hooks/useStake'
import CreateMinipoolEntry from '@/modules/components/MinipoolQuickstart/CreateMinipoolEntry'
import MQAdvancedDetails from '@/modules/components/MinipoolQuickstart/MQAdvancedDetails'
import MQBackground from '@/modules/components/MinipoolQuickstart/MQBackround'
import MQBasicDetails from '@/modules/components/MinipoolQuickstart/MQBasicDetails'
import MQForm from '@/modules/components/MinipoolQuickstart/MQForm'
import MQLogo from '@/modules/components/MinipoolQuickstart/MQLogo'
import MQSuccess from '@/modules/components/MinipoolQuickstart/MQSuccess'
import { SidebarNavbar } from '@/modules/components/SidebarNavbar/SidebarNavbar'
import { colors } from '@/theme/colors'
import { WEI_VALUE } from '@/utils/consts'

const CreateMinipool = () => {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { data: ggpPriceInAvax } = useGetGGPPrice()
  const [showDetails, setShowDetails] = useState(false)
  const [showHardwareCostLoading, setShowHardwareCostLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPriceDetails, setShowPriceDetails] = useState(false)
  const [apy, setApy] = useState(BigNumber.from('0'))
  const [ggpReward, setGgpReward] = useState(BigNumber.from('0'))
  const [formData, setFormData] = useState({
    location: '',
    validationLength: '',
    nodeRentalFee: '',
    deposit: '',
  })
  const [transactionData, setTransactionData] = useState({
    nodeID: '',
    hash: '',
  })

  const [showMinipoolQuickStart, setShowMinipoolQuickStart] = useState(false)
  const handleMinipoolQuickStartClick = () => {
    setShowMinipoolQuickStart(true)
  }

  useEffect(() => {
    if (!Object.values(formData).includes('')) {
      setShowDetails(true)
      setShowHardwareCostLoading(false)
    }
  }, [formData])

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if (query.get('one-click-relaunch') === 'true') {
      setShowMinipoolQuickStart(true)
    }
  }, [])

  useAsyncEffect(async () => {
    if (ggpPriceInAvax.gt(0) && address) {
      const { apy, ggpReward } = await postEstimator({
        ggpStaked: DEFAULT_GGP[chain?.id].div(ggpPriceInAvax).mul(WEI_VALUE),
        avaxStaked: DEFAULT_AVAX[chain?.id],
        walletAddress: address,
        chainId: chain?.id,
      })
      setApy(BigNumber.from(apy))
      setGgpReward(BigNumber.from(ggpReward))
    }
  }, [ggpPriceInAvax])

  if (showSuccess) {
    return (
      <MQBackground>
        <MQSuccess formData={formData} transactionData={transactionData} />
      </MQBackground>
    )
  }

  const detailsCard = () => {
    if (!showDetails) {
      return <MQLogo />
    }

    if (showPriceDetails) {
      return (
        <MQAdvancedDetails
          apy={apy}
          formData={formData}
          ggpReward={ggpReward}
          onBackToDetails={() => setShowPriceDetails(false)}
          onCreationSuccess={() => setShowSuccess(true)}
          setTransactionData={setTransactionData}
        />
      )
    }
    return (
      <MQBasicDetails
        apy={apy}
        formData={formData}
        onCreationSuccess={() => setShowSuccess(true)}
        onShowPriceDetails={() => setShowPriceDetails(true)}
        setTransactionData={setTransactionData}
      />
    )
  }

  return (
    <MQBackground>
      {showMinipoolQuickStart ? (
        <Box
          bg={colors.blue[500]}
          borderRadius="32px"
          display="flex"
          flexBasis={'1280px'}
          gap={'16px'}
          p={6}
        >
          <Flex maxW={'600px'} minW={'400px'} w={'50%'}>
            <MQForm
              formData={formData}
              setFormData={setFormData}
              showHardwareCostLoading={showHardwareCostLoading}
            />
          </Flex>
          <Flex maxW={'600px'} minW={'400px'} w={'50%'}>
            {detailsCard()}
          </Flex>
        </Box>
      ) : (
        <CreateMinipoolEntry onMinipoolQuickStartClick={handleMinipoolQuickStartClick} />
      )}
    </MQBackground>
  )
}

CreateMinipool.getLayout = function getLayout(page) {
  return <SidebarNavbar>{page}</SidebarNavbar>
}

export default CreateMinipool
