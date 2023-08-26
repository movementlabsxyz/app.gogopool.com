import { ChevronRightIcon } from '@chakra-ui/icons'
import clsx from 'clsx'

import { Tooltip } from '@/common/components/Tooltip'
import { useWithdrawMinipoolFunds } from '@/hooks/minipool'

function mapMinipoolError(err: string): string {
  switch (err) {
    case 'EC1':
      return 'Error cycling minipool'
    case 'E1':
      return 'Already validating'
    case 'E2':
      return 'Error determining node status'
    case 'E3':
      return 'Error staking node'
    default:
      return 'Unknown Error'
  }
}

const ErrorButton = ({ children, isFinished, minipool }) => {
  const { prepareError: isPrepareErrorWithdraw, write: withdrawFunds } = useWithdrawMinipoolFunds(
    minipool.nodeID,
  )

  const minipoolError = mapMinipoolError(minipool.errorCode)
  let tooltipLabel = `An error occurred with your minipool: ${minipoolError}. However, nothing is at risk, click here to withdraw your funds.`
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
        onClick={enabled ? withdrawFunds : undefined}
      >
        {children}
        {enabled && (
          <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
        )}
      </div>
    </Tooltip>
  )
}

export default ErrorButton
