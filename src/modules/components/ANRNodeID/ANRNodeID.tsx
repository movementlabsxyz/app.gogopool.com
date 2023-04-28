import { Box, Skeleton } from '@chakra-ui/react'

import { Address } from '@/common/components/Address'
import { Button } from '@/common/components/Button'
import useANRNodes from '@/hooks/useANRNodes'

const ANRNodeID = () => {
  const { isError, isLoading, nodeID } = useANRNodes()

  if (isLoading) {
    return (
      <Box gap="0.25rem">
        <Skeleton height="20px" width="315px" />
      </Box>
    )
  }

  if (isError || !nodeID) {
    return <div>Error. Please try again later.</div>
  }

  return (
    <Address copyIfClicked copyable={{ text: nodeID }} hasIcon={false} truncate={false}>
      <Button className="truncate" size="xs" variant="secondary-outline">
        <svg
          fill="none"
          height="16"
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            height="7.5"
            rx="1.25"
            stroke="#2E25A0"
            strokeWidth="1.5"
            width="7.5"
            x="2.75"
            y="5.75"
          />
          <path
            d="M6.58823 2.75H12C12.6904 2.75 13.25 3.30964 13.25 4V9C13.25 9.69036 12.6904 10.25 12 10.25H10.25V7C10.25 6.30964 9.69036 5.75 9 5.75H5.75V3.58824C5.75 3.12529 6.12529 2.75 6.58823 2.75Z"
            stroke="#2E25A0"
            strokeWidth="1.5"
          />
        </svg>

        <span>{nodeID}</span>
      </Button>
    </Address>
  )
}

export default ANRNodeID
