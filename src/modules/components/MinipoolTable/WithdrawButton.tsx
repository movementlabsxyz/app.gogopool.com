import { useEffect } from 'react'

import { ChevronRightIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
import clsx from 'clsx'

import SurveyV2 from '../Modal/Survey/SurveyV2'

import { Tooltip } from '@/common/components/Tooltip'
import { useWithdrawMinipoolFunds } from '@/hooks/minipool'

const WithdrawButton = ({ children, isFinished, minipool }) => {
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
    </>
  )
}

export default WithdrawButton
