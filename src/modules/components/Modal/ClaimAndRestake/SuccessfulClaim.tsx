import { BigNumber } from 'ethers'
import { FunctionComponent } from 'react'

import { Button, Flex, Text } from '@chakra-ui/react'
import { useAccount, useBalance } from 'wagmi'

import { TransactionHash } from '../TransactionHash'

import { ThumbsUp } from '@/common/components/CustomIcon/ThumbsUp'
import useTokenGGPContract from '@/hooks/contracts/tokenGGP'
import { useGetGGPStake } from '@/hooks/useStake'
import { HexString } from '@/types/cryptoGenerics'
import { displayBN } from '@/utils/numberFormatter'

export interface SuccessfulClaimProps {
  transactionHash: HexString
  onClose: any
  staked?: BigNumber
  collateralization?: BigNumber
}

export const SuccessfulClaim: FunctionComponent<SuccessfulClaimProps> = ({
  collateralization,
  onClose,
  staked,
  transactionHash,
}) => {
  const { address } = useAccount()
  const { address: ggpAddress } = useTokenGGPContract()

  const { data: ggpBalanceMaybe } = useBalance({
    address,
    token: ggpAddress as `0x${string}`,
    watch: true,
  })
  const ggpBalance = ggpBalanceMaybe?.value ? ggpBalanceMaybe.value : BigNumber.from(0)

  const { data: ggpStake } = useGetGGPStake(address)

  return (
    <Flex align="center" direction="column" gap={2}>
      <ThumbsUp />
      <Text className="mb-4 font-domaine" fontSize={32} fontWeight="bold">
        Success!
      </Text>
      <div className="flex w-full flex-col space-y-4">
        <Text
          casing="uppercase"
          className="flex justify-between border-b border-dashed border-gray-400 pb-2"
          color="#5D5D64"
          fontSize={16}
          fontWeight={700}
          textAlign="center"
        >
          <span>GGP Balance</span>
          <span className="text-black">{displayBN(ggpBalance)}</span>
        </Text>
        {staked ? (
          <Text
            casing="uppercase"
            className="flex justify-between border-b border-dashed border-gray-400 pb-2"
            color="#5D5D64"
            fontSize={16}
            fontWeight={700}
            textAlign="center"
          >
            <span>Staked Amount</span>
            <span className="text-black">{displayBN(staked)}</span>
          </Text>
        ) : (
          <Text
            casing="uppercase"
            className="flex justify-between border-b border-dashed border-gray-400 pb-2"
            color="#5D5D64"
            fontSize={16}
            fontWeight={700}
            textAlign="center"
          >
            <span>Stake Amount</span>
            <span className="text-black">{displayBN(ggpStake)}</span>
          </Text>
        )}
        {collateralization && (
          <Text
            casing="uppercase"
            className="flex justify-between border-b border-dashed border-gray-400 pb-2"
            color="#5D5D64"
            fontSize={16}
            fontWeight={700}
            textAlign="center"
          >
            <span>Collateralization Ratio</span>
            <span className="text-black">{displayBN(collateralization) + '%'}</span>
          </Text>
        )}
      </div>
      <div className="pt-6">
        <TransactionHash transactionHash={transactionHash} />
      </div>
      {onClose && (
        <Button className="mt-6 !font-semibold underline" onClick={onClose} variant="link">
          Close
        </Button>
      )}
    </Flex>
  )
}
