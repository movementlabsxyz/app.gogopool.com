import { BigNumberish, utils } from 'ethers'
import { FunctionComponent, useEffect, useState } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useChainModal } from '@rainbow-me/rainbowkit'
import { formatEther } from 'ethers/lib/utils.js'
import ms from 'ms'
import { useAccount, useBalance, useNetwork, useWaitForTransaction } from 'wagmi'

import { RewardForm } from './RewardForm'
import { StakeForm } from './StakeForm'
import { Statistics } from './Statistics'

import { Address } from '@/common/components/Address'
import { Button } from '@/common/components/Button'
import { Card, Content, Footer, Title } from '@/common/components/Card'
import ConnectButton from '@/common/components/ConnectButton'
import { InfoCircleIcon } from '@/common/components/CustomIcon'
import { SwapIcon } from '@/common/components/CustomIcon/SwapIcon'
import { Tooltip } from '@/common/components/Tooltip'
import useTokenggAVAXContract from '@/hooks/contracts/tokenggAVAX'
import useDeposit from '@/hooks/deposit'
import useLiquidStakingData from '@/hooks/liquidStakingData'
import useRedeem from '@/hooks/redeem'
import addToken from '@/utils/addToken'
import { formatEtherFixed } from '@/utils/formatEtherFixed'
import { roundedBigNumber } from '@/utils/numberFormatter'

const generateStatistics = (
  apr: number | string,
  exchangeRate: BigNumberish,
  stakedAmount: BigNumberish,
  stakers: BigNumberish | string,
  rewardPeriod?: number | null | undefined,
  tokenAddress?: string | null | undefined,
) => {
  if (!rewardPeriod) {
    rewardPeriod = 84600000 * 14
  }

  return [
    {
      label: (
        <>
          Token Address
          <Tooltip content="The address of the ggAVAX token" placement="right">
            <Box as="span">
              <InfoCircleIcon className="ml-1" fill="grey.600" />
            </Box>
          </Tooltip>
        </>
      ),
      value: tokenAddress ? (
        <Address copyable fontWeight="bold">
          {tokenAddress}
        </Address>
      ) : (
        'Loading...'
      ),
    },
    {
      label: (
        <>
          Annual Percentage Rate
          <Tooltip
            content="Percentage reward you get per year on your staked AVAX."
            placement="right"
          >
            <Box as="span">
              <InfoCircleIcon className="ml-1" fill="grey.600" />
            </Box>
          </Tooltip>
        </>
      ),
      value: typeof apr === 'string' ? apr : `~${apr.toFixed(2)}%`,
    },
    {
      label: (
        <>
          Exchange Rate
          <Tooltip content="Rate of exchange between AVAX and ggAVAX." placement="right">
            <Box as="span">
              <InfoCircleIcon className="ml-1" fill="grey.600" />
            </Box>
          </Tooltip>
        </>
      ),
      value: `1 AVAX = ${Number(formatEther(exchangeRate)).toFixed(6)} ggAVAX`,
    },
    {
      label: <># of Stakers</>,
      value: typeof stakers === 'string' ? stakers : stakers.toLocaleString(),
    },
    {
      label: <>Total AVAX Staked</>,
      value: `${formatEtherFixed(stakedAmount)} AVAX`,
    },
    {
      label: (
        <>
          Reward Period
          <Tooltip content="The waiting period before rewards are gained" placement="right">
            <Box as="span">
              <InfoCircleIcon className="ml-1" fill="grey.600" />
            </Box>
          </Tooltip>
        </>
      ),
      value: ms(rewardPeriod, { long: true }),
    },
  ]
}

export const LiquidStaking: FunctionComponent = () => {
  const toast = useToast()

  const { openChainModal } = useChainModal()

  const { chain } = useNetwork()

  const [swapDirection, setSwapDirection] = useState(false) // false for AVAX -> ggAVAX, true for ggAVAX -> AVAX
  const [amount, setAmount] = useState<number>() // stake value
  const [reward, setReward] = useState<number>(0) // reward value

  const { address: account, isConnected } = useAccount()

  const { address: ggAVAXAddress } = useTokenggAVAXContract()

  const {
    apr,
    ggAvaxExchangeRate,
    isLoading: isLoadingStats,
    rewardsCycleLength,
    stakerCount,
    totalStakedAVAX,
  } = useLiquidStakingData()

  // AVAX balance
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    watch: true,
    address: account,
  })

  // ggAVAX balance
  const { data: ggAVAXBalance } = useBalance({
    watch: true,
    address: account,
    token: ggAVAXAddress,
  })

  // deposit the AVAX
  const {
    data: depositData,
    isError: isDepositError,
    isLoading: isDepositLoading,
    write: deposit,
  } = useDeposit(utils.parseEther(amount?.toString() || '0'))

  // redeem ggAVAX
  const {
    data: redeemData,
    isError: isRedeemError,
    isLoading: isRedeemLoading,
    write: redeem,
  } = useRedeem(utils.parseEther(amount?.toString() || '0'))

  const { status: redeemStatus } = useWaitForTransaction({
    hash: redeemData?.hash,
  })
  const { status: depositStatus } = useWaitForTransaction({
    hash: depositData?.hash,
  })

  const isLoading = isBalanceLoading || isDepositLoading || isLoadingStats || isRedeemLoading

  const statisticData = generateStatistics(
    apr,
    (ggAvaxExchangeRate as BigNumberish) || 0,
    (totalStakedAVAX as BigNumberish) || 0,
    (stakerCount as BigNumberish) || 0,
    (rewardsCycleLength as unknown as number) * 1000,
    ggAVAXAddress,
  )

  const handleSwap = () => {
    const temporaryAmount = amount
    const temporaryReward = reward
    setSwapDirection(!swapDirection)
    setAmount(temporaryReward)
    setReward(temporaryAmount)
  }

  useEffect(() => {
    if (depositStatus === 'success') {
      toast({
        position: 'top',
        title: 'Success',
        status: 'success',
        duration: 15000,
        description: <span>Deposited!</span>,
      })
      setAmount(0)
      return
    }
    if (depositStatus === 'error') {
      toast({
        position: 'top',
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
      })
      return
    }
  }, [depositStatus, toast])

  useEffect(() => {
    if (redeemStatus === 'success') {
      toast({
        position: 'top',
        title: 'Success',
        status: 'success',
        description: 'Redeemed!',
      })
      setAmount(0)
      return
    }
    if (redeemStatus === 'error') {
      toast({
        position: 'top',
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
      })
      return
    }
  }, [redeemStatus, toast])

  useEffect(() => {
    if (swapDirection) {
      const rate = Number(utils.formatEther((ggAvaxExchangeRate as BigNumberish) || 0))

      const rewardAmount = amount / rate
      if (isNaN(rewardAmount)) {
        setReward(0)
      } else {
        setReward(rewardAmount)
      }
    } else {
      const rate = Number(utils.formatEther((ggAvaxExchangeRate as BigNumberish) || 0))
      const rewardAmount = rate * amount
      if (isNaN(rewardAmount)) {
        setReward(0)
      } else {
        setReward(rewardAmount)
      }
    }
  }, [amount, ggAvaxExchangeRate, swapDirection])

  const displayButton = () => {
    const buttonText = swapDirection ? 'Redeem ggAVAX' : 'Deposit AVAX'
    const sufficientBalance = swapDirection
      ? ggAVAXBalance?.value.lt(utils.parseEther(amount?.toString() || '0'))
      : balance?.value.lt(utils.parseEther(amount?.toString() || '0'))

    if (!isConnected) {
      return <ConnectButton />
    }
    if (chain?.unsupported) {
      return (
        <Button full onClick={openChainModal} variant="destructive-outline">
          Wrong Network
        </Button>
      )
    }
    if (sufficientBalance) {
      return (
        <Button disabled full variant="destructive-outline">
          Insufficient Funds
        </Button>
      )
    }

    return (
      <Tooltip
        content="Enter an amount to stake first"
        isDisabled={amount ? true : false}
        placement="top"
      >
        <Button
          disabled={
            (swapDirection && isRedeemError) ||
            (!swapDirection && isDepositError) ||
            !amount ||
            isLoading ||
            depositStatus === 'loading' ||
            redeemStatus === 'loading'
          }
          full
          onClick={swapDirection ? redeem : deposit}
        >
          {isLoading || depositStatus === 'loading' || redeemStatus === 'loading'
            ? 'Loading...'
            : buttonText}
        </Button>
      </Tooltip>
    )
  }

  return (
    <>
      <Card outer>
        <Title className="pb-4">Liquid Staking</Title>
        <Content>
          <FormControl>
            <Box position="relative">
              <Card backgroundColor="grey.100" mb="2">
                <Content>
                  {swapDirection ? (
                    <StakeForm
                      amount={amount}
                      balance={roundedBigNumber(ggAVAXBalance?.value || 0)}
                      header="Amount to redeem"
                      setAmount={setAmount}
                      setReward={setReward}
                      token="ggAVAX"
                    />
                  ) : (
                    <StakeForm
                      amount={amount}
                      balance={roundedBigNumber(balance?.value || 0)}
                      setAmount={setAmount}
                      setReward={setReward}
                    />
                  )}
                </Content>
              </Card>
              <Box
                alignItems="center"
                bgColor="green.500"
                borderRadius="md"
                className="left-[calc(50%-16px)] bottom-[-16px] cursor-pointer transition-colors hover:border hover:border-solid hover:border-green-600 hover:bg-green-200"
                display="flex"
                h="6"
                justifyContent="center"
                onClick={handleSwap}
                position="absolute"
                w="8"
              >
                <SwapIcon size="16px" />
              </Box>
            </Box>
            <Card backgroundColor="grey.100" mb="4" p="1rem 1.5rem">
              <Content>
                {swapDirection ? (
                  <RewardForm
                    balance={roundedBigNumber(balance?.value || 0)}
                    reward={reward}
                    token="AVAX"
                  />
                ) : (
                  <RewardForm
                    balance={roundedBigNumber(ggAVAXBalance?.value || 0)}
                    reward={reward}
                  />
                )}
              </Content>
            </Card>
            <Card
              backgroundColor="white.100"
              className="border border-gray-300"
              hidden={!isConnected}
              mb="2"
              p="0"
              rounded="12px"
            >
              <Content>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton data-testid="liquid-staking-accordion-action" p="1rem 1.5rem">
                      <Text flex="1" fontWeight="bold" size="md" textAlign="left">
                        View liquid staking statistics
                      </Text>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p="0 1.5rem 1rem 1.5rem">
                      <Statistics data={statisticData} />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Content>
            </Card>
          </FormControl>
        </Content>
        <Footer>
          {displayButton()}

          {isConnected && (
            <div className="mt-4 text-xs">
              <Link
                onClick={() => {
                  addToken(ggAVAXAddress, 'ggAVAX')
                }}
              >
                Add ggAVAX token to wallet
              </Link>
            </div>
          )}
        </Footer>
      </Card>
    </>
  )
}
