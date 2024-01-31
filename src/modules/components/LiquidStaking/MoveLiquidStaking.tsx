/* eslint-disable tailwindcss/no-custom-classname */
import { BigNumber, BigNumberish } from 'ethers'
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
import { formatEther, parseEther } from 'ethers/lib/utils.js'
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
import useTokenggMOVEContract from '@/hooks/contracts/tokenggMOVE'
import useDeposit from '@/hooks/deposit'
import useLiquidStakingData from '@/hooks/liquidStakingData'
import useRedeem from '@/hooks/redeem'
import useCeres from '@/hooks/useCeres'
import addToken from '@/utils/addToken'
import { WEI_VALUE } from '@/utils/consts'
import { formatEtherFixed } from '@/utils/formatEtherFixed'

const generateStatistics = (
  apy: number | string,
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
          <Tooltip content="The address of the ggMOVE token" placement="right">
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
          Annual Percentage Yield
          <Tooltip
            content="Estimated Percentage reward you get per year on your staked MOVE."
            placement="right"
          >
            <Box as="span">
              <InfoCircleIcon className="ml-1" fill="grey.600" />
            </Box>
          </Tooltip>
        </>
      ),
      value: typeof apy === 'string' ? apy : `~${apy.toFixed(2)}%`,
    },
    {
      label: (
        <>
          Exchange Rate
          <Tooltip content="Rate of exchange between MOVE and ggMOVE." placement="right">
            <Box as="span">
              <InfoCircleIcon className="ml-1" fill="grey.600" />
            </Box>
          </Tooltip>
        </>
      ),
      value: `1 MOVE = ${Number(formatEther(exchangeRate)).toFixed(6)} ggMOVE`,
    },
    {
      label: <># of Stakers</>,
      value: typeof stakers === 'string' ? stakers : stakers.toLocaleString(),
    },
    {
      label: <>Total MOVE Staked</>,
      value: `${formatEtherFixed(stakedAmount)} MOVE`,
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

  const [swapDirection, setSwapDirection] = useState(false) // false for MOVE -> ggMOVE, true for ggMOVE -> MOVE
  const [amount, setAmount] = useState<BigNumber>(parseEther('0')) // stake value
  const [reward, setReward] = useState<BigNumber>(parseEther('0')) // reward value

  const { address: account, isConnected } = useAccount()

  const { address: ggMOVEAddress } = useTokenggMOVEContract()

  const { data: ceresData } = useCeres()

  let apy = 0
  if (ceresData) {
    const { ggAVAXAPY } = ceresData
    apy = ggAVAXAPY.value as number
  }

  const {
    ggAvaxExchangeRate,
    isLoading: isLoadingStats,
    rewardsCycleLength,
    stakerCount,
    totalStakedAVAX,
  } = useLiquidStakingData()

  // MOVE balance
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    watch: true,
    address: account,
  })

  // ggMOVE balance
  const { data: ggMOVEBalance } = useBalance({
    watch: true,
    address: account,
    token: ggMOVEAddress,
  })

  // deposit the MOVE
  const {
    data: depositData,
    isError: isDepositError,
    isLoading: isDepositLoading,
    write: deposit,
  } = useDeposit(amount)

  // redeem ggMOVE
  const {
    data: redeemData,
    isError: isRedeemError,
    isLoading: isRedeemLoading,
    write: redeem,
  } = useRedeem(amount)

  const { status: redeemStatus } = useWaitForTransaction({
    hash: redeemData?.hash,
  })
  const { status: depositStatus } = useWaitForTransaction({
    hash: depositData?.hash,
  })

  const isLoading = isBalanceLoading || isDepositLoading || isLoadingStats || isRedeemLoading

  const statisticData = generateStatistics(
    apy,
    (ggAvaxExchangeRate as BigNumberish) || 0,
    (totalStakedAVAX as BigNumberish) || 0,
    (stakerCount as BigNumberish) || 0,
    (rewardsCycleLength as unknown as number) * 1000,
    ggMOVEAddress,
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
      setAmount(parseEther('0'))
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
      setAmount(parseEther('0'))
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
      if (!ggAvaxExchangeRate) {
        setReward(parseEther('0'))
      } else {
        const rewardAmount = amount.mul(WEI_VALUE).div(ggAvaxExchangeRate)
        setReward(rewardAmount)
      }
    } else {
      if (!ggAvaxExchangeRate) {
        setReward(parseEther('0'))
      } else {
        const rewardAmount = amount.mul(ggAvaxExchangeRate).div(WEI_VALUE)
        setReward(rewardAmount)
      }
    }
  }, [amount, ggAvaxExchangeRate, swapDirection])

  const displayButton = () => {
    const buttonText = swapDirection ? 'Redeem ggMOVE' : 'Deposit MOVE'
    const sufficientBalance = swapDirection
      ? ggMOVEBalance?.value.lt(amount)
      : balance?.value.lt(amount)

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
                      balance={ggMOVEBalance?.value || parseEther('0')}
                      header="Amount to redeem"
                      setAmount={setAmount}
                      setReward={setReward}
                      token="ggMOVE"
                    />
                  ) : (
                    <StakeForm
                      amount={amount}
                      balance={balance?.value || parseEther('0')}
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
                    balance={balance?.value || parseEther('0')}
                    reward={reward}
                    token="MOVE"
                  />
                ) : (
                  <RewardForm balance={ggMOVEBalance?.value || parseEther('0')} reward={reward} />
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
                  addToken(ggMOVEAddress, 'ggMOVE')
                }}
              >
                Add ggMOVE token to wallet
              </Link>
            </div>
          )}
        </Footer>
      </Card>
    </>
  )
}
