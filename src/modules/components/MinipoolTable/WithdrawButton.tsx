import { Button } from '@chakra-ui/react'

import { Tooltip } from '@/common/components/Tooltip'

type Props = {
  isFinished: boolean
  onOpen: () => void
}

const WithdrawButton = ({ isFinished, onOpen }: Props) => {
  // const { isOpen: surveyIsOpen, onClose: onCloseSurvey, onOpen: onOpenSurvey } = useDisclosure()
  let tooltipLabel = 'Withdraw funds'
  if (isFinished) tooltipLabel = 'Already withdrawn, no actions can be taken.'

  // useEffect(() => {
  //   const hasShownSurvey = localStorage.getItem('hasShownSurvey')
  //   if (!hasShownSurvey || hasShownSurvey === 'false') {
  //     if (status === 'success') {
  //       onOpenSurvey()
  //       localStorage.setItem('hasShownSurvey', 'true')
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [status])

  return (
    <>
      {/* <SurveyV2 surveyClose={onCloseSurvey} surveyIsOpen={surveyIsOpen} /> */}
      <Tooltip content={tooltipLabel} placement="top" wrapperClassName="w-full">
        <>
          <Button onClick={onOpen} size="sm" variant="secondary-filled" w="full">
            Withdraw
          </Button>
        </>
      </Tooltip>
    </>
  )
}

export default WithdrawButton
