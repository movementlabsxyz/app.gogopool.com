import { FunctionComponent, useState } from 'react'

import { Modal as ChakraModal, ModalContent, ModalOverlay } from '@chakra-ui/react'

import { GenericFailureModal } from '../GenericFailure/GenericFailureModal'
import { MinipoolCompleteModal } from './MinipoolCompleteModal'
import { SuccessfulMinipoolWithdrawModal } from './SuccessfulMinipoolWithdrawModal'
import { WithdrawMinipoolModal } from './WithdrawFullMinipool/WithdrawMinipoolModal'

import { HexString } from '@/types/cryptoGenerics'
import Minipool from '@/types/minipool'
interface WithdrawOptionsModalProps {
  onClose: () => void
  minipool: Minipool
  onOpen: () => void
}

export const WithdrawOptionsModal: FunctionComponent<WithdrawOptionsModalProps> = ({
  minipool,
  onClose,
}) => {
  const [showWithdrawMinipool, setShowWithdrawMinipool] = useState(false)
  const [showSuccessfulWithdraw, setShowSuccessfulWithdraw] = useState(false)
  const [withdrawError, setWithdrawError] = useState(false)
  const [transactionData, setTransactionData] = useState<HexString>()

  return (
    <ChakraModal closeOnOverlayClick={false} isCentered isOpen={true} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent border="0px" maxWidth="600px" p="0">
        {!showSuccessfulWithdraw && !showWithdrawMinipool && (
          <MinipoolCompleteModal
            minipool={minipool}
            onClose={onClose}
            setTransactionData={setTransactionData}
            showWithdrawMinipool={() => setShowWithdrawMinipool(true)}
          />
        )}
        {showWithdrawMinipool && !showSuccessfulWithdraw && !withdrawError && (
          <WithdrawMinipoolModal
            minipool={minipool}
            onClose={onClose}
            setShowSuccessfulWithdraw={setShowSuccessfulWithdraw}
            setShowWithdrawMinipool={setShowWithdrawMinipool}
            setTransactionData={setTransactionData}
            setWithdrawError={setWithdrawError}
          />
        )}
        {withdrawError && !showSuccessfulWithdraw && (
          <GenericFailureModal
            message="Withdraw Failed. Refresh the page and try again. For more details, copy the transaction hash below."
            transactionHash={transactionData}
          />
        )}
        {showSuccessfulWithdraw && !showWithdrawMinipool && (
          <SuccessfulMinipoolWithdrawModal
            minipool={minipool}
            onClose={onClose}
            transactionData={transactionData}
          />
        )}
      </ModalContent>
    </ChakraModal>
  )
}
