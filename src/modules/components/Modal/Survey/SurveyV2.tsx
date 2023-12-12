import { FormEvent, useState } from 'react'

import { Box, Button, ButtonGroup, FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import { useAccount } from 'wagmi'

import { Title } from '@/common/components/Card'
import { Modal } from '@/common/components/Modal'

enum RatingButtonState {
  NOT_RATED,
  VERY_UNLIKELY,
  UNLIKELY,
  LIKELY,
  VERY_LIKELY,
}

const RatingDisplay: { [key in RatingButtonState]: string } = {
  [RatingButtonState.NOT_RATED]: 'Not Rated',
  [RatingButtonState.VERY_UNLIKELY]: 'Very Unlikely',
  [RatingButtonState.UNLIKELY]: 'Unlikely',
  [RatingButtonState.LIKELY]: 'Likely',
  [RatingButtonState.VERY_LIKELY]: 'Very Likely',
}

enum SurveyState {
  NOT_SUBMITTED,
  SUBMITTED,
  ERROR,
}

type Props = {
  surveyClose: () => void
  surveyIsOpen: boolean
}

export default function SurveyV2({ surveyClose, surveyIsOpen }: Props) {
  return (
    <Modal isOpen={surveyIsOpen} onClose={surveyClose}>
      <Title>Feedback</Title>
      <FeedbackForm close={surveyClose} />
    </Modal>
  )
}

type RatingButtonProps = {
  rating: RatingButtonState
  setRating: (rating: RatingButtonState) => void
}

const RatingButtons = ({ rating, setRating }: RatingButtonProps) => {
  return (
    <ButtonGroup flexWrap="wrap" justifyContent="center" width="full">
      {Object.keys(RatingButtonState)
        .filter((key) => Number(key)) // do not display a "not rated" button
        .map((key) => {
          const r = Number(key)
          return (
            <Button
              // isDisabled={rating === r}
              key={key}
              onClick={() => setRating(r)}
              size="sm"
              variant={rating === r ? 'secondary-filled' : 'primary'}
            >
              {RatingDisplay[r]}
            </Button>
          )
        })}
    </ButtonGroup>
  )
}

const FeedbackForm = ({ close }: { close: () => void }) => {
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [surveyState, setSurveyState] = useState<SurveyState>(SurveyState.NOT_SUBMITTED)
  const [surveyRating, setSurveyRating] = useState<RatingButtonState>(RatingButtonState.NOT_RATED)
  const { address } = useAccount()

  const handleSubmit = async (e: FormEvent<HTMLDivElement> & FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('https://survey.gogopool.com', {
        rating: RatingDisplay[surveyRating],
        comment: feedback,
        address: address || '0x',
      })

      if (res.status === 200) {
        localStorage.setItem('hasShownSurvey', 'true')
        setSurveyState(SurveyState.SUBMITTED)
      } else {
        console.error(res.data)
        setSurveyState(SurveyState.ERROR)
      }
    } catch (err) {
      console.error(err)
      setSurveyState(SurveyState.ERROR)
    }
    setLoading(false)
  }

  if (surveyState === SurveyState.SUBMITTED) {
    return (
      <Box py={4}>
        <p>Thank you for your feedback!</p>
        <Button mt={4} onClick={close}>
          Close
        </Button>
      </Box>
    )
  }

  if (surveyState === SurveyState.ERROR) {
    return (
      <Box py={4}>
        <p>Something went wrong. Please try again later.</p>
        <Button mt={4} onClick={close}>
          Close
        </Button>
      </Box>
    )
  }

  return (
    <Box as="form" onSubmit={handleSubmit} p={0}>
      <FormControl id="rating" mb={4}>
        <FormLabel>How likely are you to recommend our product to a friend or colleague?</FormLabel>
        <RatingButtons rating={surveyRating} setRating={setSurveyRating} />
      </FormControl>
      <FormControl id="feedback" mb={4}>
        <FormLabel>
          Are you willing to have a follow up for feedback? If so, leave your best contact
          information below (eg Discord/Twitter/Telegram/Email) and we will be in touch!
        </FormLabel>
        <Textarea
          borderColor="blue.400"
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here"
          value={feedback}
        />
      </FormControl>
      <FormControl display="flex" justifyContent="end" width="full">
        <Button isLoading={loading} type="submit">
          Submit
        </Button>
      </FormControl>
    </Box>
  )
}
