import { ChevronRightIcon } from '@chakra-ui/icons'
import clsx from 'clsx'
import { useWaitForTransaction } from 'wagmi'

import { Tooltip } from '@/common/components/Tooltip'
import { useCancelMinipool, useWithdrawMinipoolFunds } from '@/hooks/minipool'

const WithdrawButton = ({ children, isFinished, nodeId }) => {
  // if the minipool is finished we want to disable the button
  const {
    data: withdrawData,
    prepareError: isPrepareErrorWithdraw,
    write: withdrawFunds,
  } = useWithdrawMinipoolFunds(nodeId)
  // if the minipool is finished we want to disable the button
  const {
    data: cancelMinipoolData,
    prepareError: isPrepareErrorCancel,
    write: cancelMinipool,
  } = useCancelMinipool(nodeId)

  const { isSuccess: transactionSuccess } = useWaitForTransaction({
    hash: withdrawData?.hash,
  })

  const canCancel = !isPrepareErrorCancel
  let tooltipLabel = ''
  if (canCancel) {
    tooltipLabel = 'Cancel Minipool'
  }
  if (!isPrepareErrorWithdraw) {
    tooltipLabel = 'Withdraw funds'
  }
  if (!canCancel && isPrepareErrorWithdraw) {
    tooltipLabel = 'Cannot withdraw at this time - minipool is currently Staking'
  }
  if (isFinished) tooltipLabel = 'Already withdrawn, no actions can be taken.'

  const enabled = canCancel || (!isFinished && !isPrepareErrorWithdraw)

  return (
    <Tooltip content={tooltipLabel} wrapperClassName="w-full">
      <div
        className={clsx(
          'flex items-center',
          'overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6',
          enabled &&
            'cursor-pointer border-2 border-transparent p-4 transition-all hover:border-indigo-100 hover:shadow-lg',
          !enabled && 'cursor-default hover:bg-white',
        )}
        onClick={
          enabled
            ? cancelMinipool || withdrawFunds
            : () => {
                // empty
              }
        }
      >
        {children}
        {enabled && (
          <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
        )}
      </div>
    </Tooltip>
  )
}

export default WithdrawButton
