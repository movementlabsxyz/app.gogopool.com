import { ChevronRightIcon } from '@chakra-ui/icons'
import clsx from 'clsx'

import { Tooltip } from '@/common/components/Tooltip'
import { useCancelMinipool } from '@/hooks/minipool'

const CancelButton = ({ children, isFinished, nodeId }) => {
  const { prepareError: isPrepareErrorCancel, write: cancelMinipool } = useCancelMinipool(nodeId)

  const canCancel = !isPrepareErrorCancel
  let tooltipLabel = ''
  if (canCancel) {
    tooltipLabel = 'Cancel Minipool'
  }

  const enabled = canCancel || !isFinished

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
            ? cancelMinipool
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

export default CancelButton
