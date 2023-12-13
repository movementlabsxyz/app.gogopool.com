import { Button } from '@chakra-ui/react'

import { Tooltip } from '@/common/components/Tooltip'
import { MinipoolStatus } from '@/types/minipool'

const StakingButton = ({ status }) => {
  let tooltipLabel = ''
  if (status === MinipoolStatus.Finished) {
    tooltipLabel = 'Already withdrawn'
  } else if (status === MinipoolStatus.Canceled) {
    tooltipLabel = 'Minipool Cancelled'
  } else if (status === MinipoolStatus.Staking || MinipoolStatus.Launched) {
    tooltipLabel = 'Cannot withdraw at this time - minipool is currently Staking'
  }

  return (
    <Tooltip content={tooltipLabel} placement="top" wrapperClassName="w-full">
      <div>
        <Button
          disabled
          size="sm"
          sx={{
            _hover: {
              bgColor: 'blue.500',
            },
          }}
          variant="secondary-filled"
          w="full"
        >
          Withdraw
        </Button>
      </div>
    </Tooltip>
  )
}

export default StakingButton
