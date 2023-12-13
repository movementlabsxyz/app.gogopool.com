import { Button, useDisclosure } from '@chakra-ui/react'

import { RewardFaqModal } from '../Modal/RewardFaq/RewardFaqModal'
import CountdownTimerHeader from './CountdownTimerHeader'

import { colors } from '@/theme/colors'
import { Ceres } from '@/types/ceres'

export type Props = {
  ceresData: Ceres
}

export default function DashboardHeader({ ceresData }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure()
  if (ceresData === undefined) {
    return null
  }
  return (
    <>
      {isOpen && <RewardFaqModal onClose={onClose} />}
      <div className="flex items-center justify-between border-b border-b-grey-300 bg-[#F7F9FF] py-6 align-middle">
        <CountdownTimerHeader ceresData={ceresData} />
        <a className="hidden xs:flex">
          <Button
            background={'none'}
            border={'1px'}
            borderColor={colors.blue[100]}
            onClick={onOpen}
            size="sm"
            variant="tertiary"
          >
            How do rewards work?
          </Button>
        </a>
        <a className="flex xs:hidden">
          <Button
            background={'none'}
            border={'1px'}
            borderColor={colors.blue[100]}
            onClick={onOpen}
            paddingX={'2px'}
            size="sm"
            variant="tertiary"
          >
            ?
          </Button>
        </a>
      </div>
    </>
  )
}
