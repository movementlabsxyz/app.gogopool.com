import { BigNumber, utils } from 'ethers'
import { FunctionComponent, useState } from 'react'

import { Divider, Flex, Spacer, Text } from '@chakra-ui/react'
import { formatEther } from 'ethers/lib/utils'
import { NumericFormat } from 'react-number-format'
import { useAccount, useBalance } from 'wagmi'

import { GGPPillUnit } from '../Dashboard/Cards/GGPPillUnit'
import ApproveButton from '../Wizard/components/ApproveButton'
import { MAX_RATIO } from '../Wizard/components/StakeButton'

import { Button } from '@/common/components/Button'
import { Title } from '@/common/components/Card'
import useGGPAllowance from '@/hooks/allowance'
import useTokenGGPContract from '@/hooks/contracts/tokenGGP'
import { useGetCollateralRatio } from '@/hooks/useGetCollateralRatio'

export interface ClaimAndRestakeModalProps {
  stake: any
  rewardsToClaim: any
  stakeAmount: any
  setStakeAmount: any
  isLoading: boolean
  isError: boolean
  onClose: any
  refetch?: any
}

export const StakeInput: FunctionComponent<ClaimAndRestakeModalProps> = ({
  isError,
  isLoading,
  onClose,
  refetch,
  rewardsToClaim,
  setStakeAmount,
  stake,
  stakeAmount,
}) => {
  const ratio = useGetCollateralRatio({ avaxAmount: 0, ggpAmount: stakeAmount }) // something to get the future ratio here
  const { address: account } = useAccount()
  const { address: ggpAddress } = useTokenGGPContract()
  const [approveStatus, setApproveStatus] = useState<'error' | 'loading' | 'success' | 'idle'>(
    'idle',
  )
  const { data: ggpAllowance } = useGGPAllowance(account)

  const { data: ggpBalanceMaybe } = useBalance({
    address: account,
    token: ggpAddress as `0x${string}`,
  })
  const allowance = (ggpAllowance as unknown as BigNumber) || BigNumber.from(0)
  const ggpBalance = Number(formatEther(ggpBalanceMaybe?.value || 0))
  const amountBN = utils.parseEther(`${stakeAmount || 0}`)

  return (
    <Flex direction="column" gap={2}>
      <div className="mb-4 border-b border-gray-200 pb-2">
        <Title className="!mb-0 !pb-0" fontSize={26}>
          Stake
        </Title>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">Amount to add to protocol</p>
      </div>

      <div className="flex items-center justify-between">
        <NumericFormat
          className="mr-2 w-full rounded-xl bg-gray-50 p-2"
          max={rewardsToClaim}
          min={0}
          onValueChange={({ floatValue }) => {
            setStakeAmount(floatValue)
          }}
          placeholder="0.0"
          thousandSeparator
          value={stakeAmount || 0}
        />
        <GGPPillUnit value={null} />
      </div>
      <Divider borderColor="grey.300" display={{ base: null, sm: 'none' }} mb="2" mt="2" />
      <div className="flex justify-between">
        <Button
          className="text-right text-xs font-bold hover:underline"
          onClick={() => {
            setStakeAmount(ggpBalance)
          }}
          variant="link"
        >
          Balance: {ggpBalance.toLocaleString()} GGP
        </Button>
        <div
          className={`text-right text-xs font-bold ${
            ratio < MAX_RATIO ? 'text-red-500' : 'text-green-700'
          }`}
        >
          Collateralization ratio: {(ratio || 0).toLocaleString()}%
        </div>
      </div>

      <div className="flex w-full flex-col content-center items-center justify-center rounded-xl bg-[#4139C2] p-8 text-white">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white">
            <svg
              fill="none"
              height="14"
              viewBox="0 0 10 14"
              width="10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3595_7296)">
                <path
                  d="M5.70181 11.3547L4.14653 11.3359C3.96127 11.3344 3.80888 11.4892 3.80739 11.6832L3.79842 12.4967C3.79095 13.1411 4.28398 13.6683 4.89952 13.6761C5.51506 13.6839 6.01854 13.1677 6.02601 12.5232L6.03498 11.7098C6.03647 11.5158 5.88856 11.3563 5.7033 11.3547H5.70181Z"
                  fill="#4139C2"
                />
                <path
                  d="M4.70229 0.286646C2.53446 0.39771 0.746109 2.24983 0.617623 4.51804C0.539934 5.88523 1.05089 7.1351 1.91294 8.01423H1.91593L1.92938 8.03143L2.22519 8.30206L3.47121 9.44555C3.60567 9.56913 3.77748 9.63639 3.95677 9.63639H5.87211C6.05139 9.63639 6.2232 9.56913 6.35767 9.44555L7.6485 8.26138L7.68735 8.22541L7.85318 8.07211L7.86215 8.06585C8.69731 7.24147 9.21872 6.07764 9.21872 4.7871C9.22022 2.22949 7.17041 0.161503 4.70229 0.286646ZM4.91593 2.68001C6.0245 2.68001 6.92838 3.6264 6.92838 4.78867C6.92838 5.95093 6.0245 6.89576 4.91593 6.89576C3.80737 6.89576 2.90348 5.94937 2.90348 4.78867C2.90348 3.62796 3.80737 2.68001 4.91593 2.68001Z"
                  fill="#4139C2"
                />
              </g>
              <defs>
                <clipPath id="clip0_3595_7296">
                  <rect
                    fill="white"
                    height="13.3934"
                    transform="translate(0.610352 0.282227)"
                    width="8.61006"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <p className="text-[22px]">
            {rewardsToClaim + (stakeAmount || 0) < 0 ? 0 : rewardsToClaim + (stakeAmount || 0)}
          </p>
        </div>
        <div>
          <Text color="#B7AFF8">Resulting amount in the protocol</Text>
        </div>
      </div>

      <Spacer />
      <div className="flex items-center justify-end space-x-6">
        <a className="underline" href="#" onClick={onClose}>
          Cancel
        </a>

        <>
          {allowance.gte(amountBN) || approveStatus === 'success' ? (
            <Button
              disabled={stakeAmount <= 0 || !stake || isLoading}
              isLoading={isLoading}
              onClick={stake}
              variant="primary"
            >
              Stake
            </Button>
          ) : (
            <ApproveButton
              amount={stakeAmount}
              setApproveStatus={(status) => {
                refetch?.()
                setApproveStatus(status)
              }}
            />
          )}
        </>
      </div>

      {/* {ratio > MAX_RATIO && <ErrorMessage message={`Ratio must be above ${MAX_RATIO}% to stake`} />} */}
    </Flex>
  )
}
