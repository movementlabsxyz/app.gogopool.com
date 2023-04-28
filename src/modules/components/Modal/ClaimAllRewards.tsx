import React from 'react'

import { Center } from '@mantine/core'

import { Button } from '@/common/components/Button'

export const ClaimAllRewards = ({ claim, claimAmount, handleClaimAll, onCloseClaimAll }) => {
  console.log('claim', claim)
  console.log('claimAmount in claimall', claimAmount)
  return (
    <Center className="flex flex-col items-center justify-center gap-4 pt-8">
      <div className="text-[22px]">
        You are about to <b>claim all your rewards.</b>
      </div>
      <div className="flex flex-col items-center justify-center gap-16">
        <Button
          disabled={!claim || claimAmount <= 0}
          onClick={handleClaimAll}
          size="sm"
          width={200}
        >
          Confirm
        </Button>

        <a className="underline" href="#" onClick={onCloseClaimAll}>
          Back
        </a>
      </div>
    </Center>
  )
}
