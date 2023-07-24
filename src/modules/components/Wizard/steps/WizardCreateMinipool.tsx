import { BigNumber, utils } from 'ethers'
import { Dispatch, FunctionComponent, SetStateAction } from 'react'

import { Flex, Text, useToast } from '@chakra-ui/react'
import { useChainModal } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useNetwork, useWaitForTransaction } from 'wagmi'

import { Button } from '@/common/components/Button'
import ConnectButton from '@/common/components/ConnectButton'
import { AvalancheIcon } from '@/common/components/CustomIcon/AvalancheIcon'
import { DEFAULT_AVAX } from '@/constants/chainDefaults'
import { useCreateMinipool } from '@/hooks/minipool'
import { StakeInput } from '@/modules/components/Wizard/StakeInput'
import { HexString } from '@/types/cryptoGenerics'
import { roundedBigNumber } from '@/utils/numberFormatter'

export interface WizardStepThreeProps {
  amount: number
  setAmount: Dispatch<SetStateAction<number>>
  timeRangeSeconds: number
  setTxID: Dispatch<SetStateAction<string>>
  nextStep: () => void
  formattedNodeId: HexString
}

export const WizardCreateMinipool: FunctionComponent<WizardStepThreeProps> = ({
  amount,
  formattedNodeId,
  nextStep,
  setTxID,
  timeRangeSeconds,
}): JSX.Element => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { openChainModal } = useChainModal()

  const defaultAVAXAmount = DEFAULT_AVAX[chain?.id] || 0
  const toast = useToast()

  const {
    data: depositData,
    isLoading: isCreateMinipoolLoading,
    write: createMinipool,
  } = useCreateMinipool({
    formattedId: formattedNodeId,
    amount: utils.parseEther(amount?.toString() || '0'),
    // These need to be made user changeable in the future
    fee: BigNumber.from(20000),
    duration: timeRangeSeconds,
  })

  const { isLoading: isLoadingDepositTransaction } = useWaitForTransaction({
    hash: depositData?.hash,
    onSuccess(data) {
      if (data?.transactionHash && data?.status) {
        setTxID(data.transactionHash)
        nextStep()
        toast({
          position: 'top',
          description: 'Create minipool successful',
          status: 'success',
        })
      } else {
        toast({
          position: 'top',
          description: 'Error when sending the create minipool transaction',
          status: 'error',
        })
      }
    },
    onError() {
      toast({
        position: 'top',
        description: 'Error when sending the create minipool transaction',
        status: 'error',
      })
    },
  })

  const { data: AVAXBalance } = useBalance({
    watch: true,
    address,
  })

  return (
    <Flex className="space-y-4" direction="column">
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
