import { FunctionComponent, MutableRefObject } from 'react'

import { Box, Divider, Stack, Text, useBreakpointValue, useTheme } from '@chakra-ui/react'
import { useNetwork } from 'wagmi'

import { wizardSteps } from './data'

import { WizardIcon } from '@/common/components/CustomIcon/WizardIcon'
import { DEFAULT_AVAX } from '@/constants/chainDefaults'

export interface WizardHeaderProps {
  step: number
  headerRef: MutableRefObject<HTMLDivElement>
}

export const WizardHeader: FunctionComponent<WizardHeaderProps> = ({
  headerRef,
  step,
}): JSX.Element => {
  const { colors } = useTheme()
  const size = useBreakpointValue({ base: 16, md: 21 })
  const { chain } = useNetwork()
  const defaultAvax = DEFAULT_AVAX[chain?.id] || 0

  return (
    <Box
      border={`1px solid ${colors.grey[200]}`}
      borderRadius="16px"
      overflow="hidden"
      ref={headerRef}
      w="full"
    >
      <Stack
        direction="row"
        justify="space-between"
        minWidth={{ md: '696px', base: '420px' }}
        position="relative"
        px="16px"
        py="12px"
        width="100%"
      >
        {wizardSteps({ defaultAvax }).map((wizard) => (
          <Stack
            bg="#ffffff"
            className="flex items-center"
            direction="row"
            key={wizard.title}
            pl={wizard.step !== 1 ? 2 : 0}
            pr={wizard.step !== 4 ? 2 : 0}
            px={2}
            zIndex={2}
          >
            <WizardIcon
              active={wizard.step === step}
              complete={wizard.step < step}
              height={size}
              step={wizard.step}
              width={size}
            />
            <Text fontWeight={wizard.step === step ? 700 : 400} size={{ md: 'sm', base: 'xxs' }}>
              {wizard.header}
            </Text>
          </Stack>
        ))}
        <Divider
          borderColor={colors.grey[300]}
          orientation="horizontal"
          position="absolute"
          top="50%"
          variant="dashed"
          width="600px"
          zIndex={1}
        />
      </Stack>
    </Box>
  )
}
