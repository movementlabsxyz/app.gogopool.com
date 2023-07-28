import { ChevronRightIcon } from '@chakra-ui/icons'
import clsx from 'clsx'

import { Tooltip } from '@/common/components/Tooltip'
import { useWithdrawMinipoolFunds } from '@/hooks/minipool'

const WithdrawButton = ({ children, isFinished, nodeId }) => {
  const { prepareError: isPrepareErrorWithdraw, write: withdrawFunds } =
    useWithdrawMinipoolFunds(nodeId)

  let tooltipLabel = 'Withdraw funds'
  if (isFinished) tooltipLabel = 'Already withdrawn, no actions can be taken.'

  const enabled = !isFinished && !isPrepareErrorWithdraw

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
        onClick={enabled && withdrawFunds}
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
