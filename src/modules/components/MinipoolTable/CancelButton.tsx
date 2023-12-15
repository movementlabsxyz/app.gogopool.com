import { Button } from '@chakra-ui/react'

import { Tooltip } from '@/common/components/Tooltip'
import { useCancelMinipool } from '@/hooks/minipool'
const CancelButton = ({ isFinished, minipool }) => {
  const { prepareError: isPrepareErrorCancel, write: cancelMinipool } = useCancelMinipool(
    minipool.nodeID,
  )

  const canCancel = !isPrepareErrorCancel
  let tooltipLabel = ''
  if (canCancel) {
    tooltipLabel = 'Cancel Minipool'
  }

  const enabled = canCancel || !isFinished

  return (
    <Tooltip content={tooltipLabel} placement="top" wrapperClassName="w-full">
      <div>
        <Button
          onClick={enabled ? cancelMinipool : undefined}
          size="sm"
          variant="secondary-outline"
          w="full"
        >
          Cancel
        </Button>
      </div>
    </Tooltip>
  )
}

export default CancelButton
