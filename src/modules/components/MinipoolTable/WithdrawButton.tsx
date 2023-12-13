import { useEffect } from 'react'

import { Button, useDisclosure } from '@chakra-ui/react'

import SurveyV2 from '../Modal/Survey/SurveyV2'

import { Tooltip } from '@/common/components/Tooltip'
import { useWithdrawMinipoolFunds } from '@/hooks/minipool'

const WithdrawButton = ({ isFinished, minipool }) => {
  const {
    prepareError: isPrepareErrorWithdraw,
    status,
    write: withdrawFunds,
  } = useWithdrawMinipoolFunds(minipool.nodeID)
  const { isOpen: surveyIsOpen, onClose: onCloseSurvey, onOpen: onOpenSurvey } = useDisclosure()

  let tooltipLabel = 'Withdraw funds'
  if (isFinished) tooltipLabel = 'Already withdrawn, no actions can be taken.'

  const enabled = !isFinished && !isPrepareErrorWithdraw

  useEffect(() => {
    const hasShownSurvey = localStorage.getItem('hasShownSurvey')
    if (!hasShownSurvey || hasShownSurvey === 'false') {
      if (status === 'success') {
        onOpenSurvey()
        localStorage.setItem('hasShownSurvey', 'true')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <>
      <SurveyV2 surveyClose={onCloseSurvey} surveyIsOpen={surveyIsOpen} />
      <Tooltip content={tooltipLabel} wrapperClassName="w-full">
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
    </>
  )
}

export default WithdrawButton
