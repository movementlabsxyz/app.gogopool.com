import { FunctionComponent } from 'react'

import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useNetwork } from 'wagmi'

import { wizardSteps } from './data'

import { DEFAULT_AVAX } from '@/constants/chainDefaults'

export interface WizardContentProps {
  step: number
}

export const WizardContent: FunctionComponent<WizardContentProps> = ({ step }): JSX.Element => {
  const { chain } = useNetwork()
  const defaultAvax = DEFAULT_AVAX[chain?.id] || 0
  const wizard = wizardSteps({ defaultAvax }).find((wizard) => wizard.step === step)

  return (
    <Box alignItems="center" display="flex" flexDirection="column" gap="32px" mb="24px" mt="40px">
      <Image alt={`wizard-step-${step}`} src={wizard.image} {...wizard.size} />
      <Stack alignItems="center" direction="column" gap="3px">
        <Heading as="h5" textAlign="center">
          {wizard.title}
        </Heading>
        {wizard.description && (
          <Text align="center" color="grey.800" size={{ md: 'md', base: 'sm' }}>
            {wizard.description}
          </Text>
        )}
      </Stack>
    </Box>
  )
}
