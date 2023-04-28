import { FunctionComponent, ReactElement } from 'react'

import { AccordionButton, AccordionItem, AccordionPanel, Text } from '@chakra-ui/react'

import { Card } from '@/common/components/Card'
import { MinusIcon } from '@/common/components/CustomIcon/MinusIcon'
import { PlusIcon } from '@/common/components/CustomIcon/PlusIcon'

interface Props {
  label: string
  content: ReactElement
}

export const FaqsItem: FunctionComponent<Props> = ({ content, label }) => {
  return (
    <AccordionItem _last={{ mb: '0' }} mb="4">
      {({ isExpanded }) => (
        <Card
          borderColor={isExpanded ? 'blue.500' : 'grey.200'}
          borderWidth="1px"
          p="0"
          rounded="lg"
        >
          <AccordionButton>
            <Text flex="1" fontWeight="bold" size="md" textAlign="left">
              {label}
            </Text>
            {isExpanded ? <MinusIcon fontSize="12px" /> : <PlusIcon fontSize="12px" />}
          </AccordionButton>
          <AccordionPanel p="0rem 1rem 1rem 1rem">{content}</AccordionPanel>
        </Card>
      )}
    </AccordionItem>
  )
}
