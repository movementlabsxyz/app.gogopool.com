import clsx from 'clsx'

import { Tooltip } from '@/common/components/Tooltip'
import { MinipoolStatus } from '@/types/minipool'

const DefaultButton = ({ children, status }) => {
  let tooltipLabel = ''
  if (status === MinipoolStatus.Finished) {
    tooltipLabel = 'Already withdrawn'
  } else if (status === MinipoolStatus.Canceled) {
    tooltipLabel = 'Minipool Cancelled'
  } else if (status === MinipoolStatus.Staking) {
    tooltipLabel = 'Cannot withdraw at this time - minipool is currently Staking'
  }

  return (
    <Tooltip content={tooltipLabel} wrapperClassName="w-full">
      <div
        className={clsx(
          'flex items-center',
          'overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6',
        )}
      >
        {children}
      </div>
    </Tooltip>
  )
}

export default DefaultButton
