import { Button } from '@chakra-ui/react'

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

const ErrorButton = ({ isFinished, minipool }) => {
  const { prepareError: isPrepareErrorWithdraw, write: withdrawFunds } = useWithdrawMinipoolFunds(
    minipool.nodeID,
  )

  const minipoolError = mapMinipoolError(minipool.errorCode)
  let tooltipLabel = `An error occurred with your minipool: ${minipoolError}. However, nothing is at risk, click here to withdraw your funds.`
  if (isFinished) tooltipLabel = 'Already withdrawn, no actions can be taken.'

  const enabled = !isFinished && !isPrepareErrorWithdraw

  return (
    <Tooltip content={tooltipLabel} placement="top" wrapperClassName="w-full">
      <div>
        <Button
          onClick={enabled ? withdrawFunds : undefined}
          size="sm"
          variant="secondary-filled"
          w="full"
        >
          Withdraw
        </Button>
      </div>
    </Tooltip>
  )
}

export default ErrorButton
