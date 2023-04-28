import { BigNumber, utils } from 'ethers'
import { Dispatch, FunctionComponent, SetStateAction } from 'react'

import { Flex, Text } from '@chakra-ui/react'
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useNetwork, useWaitForTransaction } from 'wagmi'

import { StakeInput } from '../StakeInput'

import { Button } from '@/common/components/Button'
import ConnectButton from '@/common/components/ConnectButton'
import { AvalancheIcon } from '@/common/components/CustomIcon/AvalancheIcon'
import { DEFAULT_AVAX } from '@/constants/chainDefaults'
import { useCreateMinipool } from '@/hooks/minipool'
import { nodeID } from '@/utils'
import { roundedBigNumber } from '@/utils/numberFormatter'

export interface WizardStepThreeProps {
  amount: number
  setAmount: Dispatch<SetStateAction<number>>
  nodeId: string
  timeRangeSeconds: number
  setTxID: Dispatch<SetStateAction<string>>
  setCreateMinipoolStatus: Dispatch<'error' | 'loading' | 'success' | 'idle'>
}

export const WizardCreateMinipool: FunctionComponent<WizardStepThreeProps> = ({
  amount,
  nodeId,
  setCreateMinipoolStatus,
  setTxID,
  timeRangeSeconds,
}): JSX.Element => {
  const { openConnectModal } = useConnectModal()
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { openChainModal } = useChainModal()

  const defaultAVAXAmount = DEFAULT_AVAX[chain?.id] || 0

  const {
    data: depositData,
    isLoading: isCreateMinipoolLoading,
    write: createMinipool,
  } = useCreateMinipool({
    nodeId: nodeID(nodeId),
    amount: utils.parseEther(amount?.toString() || '0'),
    // These need to be made user changeable in the future
    fee: BigNumber.from(20000),
    duration: timeRangeSeconds,
  })

  const { isLoading: isLoadingDepositTransaction, isSuccess: isSuccessDepositTransaction } =
    useWaitForTransaction({
      hash: depositData?.hash,
      onSuccess(data) {
        if (data?.transactionHash && data?.status) {
          setTxID(data.transactionHash)
          setCreateMinipoolStatus('success')
        } else {
          setCreateMinipoolStatus('error')
        }
      },
      onError(err) {
        setCreateMinipoolStatus('error')
      },
    })

  const { data: AVAXBalance } = useBalance({
    watch: true,
    address,
  })

  return (
    <Flex className="space-y-4" direction="column">
      {/* <WeekInput
        title="Staking Duration (Weeks)"
        value={stakingPeriod}
        setValue={setStakingPeriod}
        disabled
      />
      */}
      <StakeInput
        amount={defaultAVAXAmount}
        balance={roundedBigNumber(AVAXBalance?.value || BigNumber.from(0))}
        currencySymbol="$"
        disabled
        icon={<AvalancheIcon />}
        title="DEPOSIT AVAX"
        token="AVAX"
      />
      {/* Wallet is connected and createMinipool callStatic worked */}
      {isConnected && createMinipool && (
        <Button
          data-testid="deposit-avax"
          disabled={
            AVAXBalance?.value.lt(utils.parseEther(defaultAVAXAmount.toString())) ||
            isCreateMinipoolLoading ||
            isLoadingDepositTransaction
          }
          full
          isLoading={isCreateMinipoolLoading || isLoadingDepositTransaction}
          onClick={createMinipool}
        >
          Deposit {defaultAVAXAmount.toString()} AVAX
        </Button>
      )}
      {/* Wallet is connected but the createMinipool callStatic failed */}
      {!chain?.unsupported && isConnected && !createMinipool && (
        <Button disabled full mt={4} variant="destructive-outline">
          {AVAXBalance?.value.lt(utils.parseEther(defaultAVAXAmount.toString()))
            ? 'Insufficient AVAX balance'
            : 'Cannot deposit AVAX right now.'}
        </Button>
      )}
      {chain?.unsupported && (
        <Button full onClick={openChainModal} variant="destructive-outline">
          Wrong network
        </Button>
      )}
      {/* Wallet is not connected */}
      {!isConnected && <ConnectButton />}
      <Text className="mt-6 text-right text-gray-400" size="sm">
        Currently we only support minipools of{' '}
        <b>{defaultAVAXAmount?.toLocaleString() || 0} AVAX</b>
      </Text>
    </Flex>
  )
}
