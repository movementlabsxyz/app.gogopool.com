import React from 'react'

import { Button } from '@/common/components/Button'

export const ClaimAndRestakeTwo = ({ onOpenClaim, onOpenClaimAll }) => (
  <div>
    <div className="mb-6 flex items-center justify-between border-b border-dashed border-gray-400 pb-6">
      <div className="max-w-[221px] text-[16px] text-gray-500">
        Claim all your reweards and restake them.
      </div>
      <div>
        <Button onClick={onOpenClaim} size="sm" variant="secondary-filled" width={200}>
          Claim and Restake
        </Button>
      </div>
    </div>
    <div className="flex items-center justify-between pb-6">
      <div className="max-w-[221px] text-[16px] text-gray-500">Claim all your rewards.</div>
      <div>
        <Button onClick={onOpenClaimAll} size="sm" variant="secondary-filled" width={200}>
          Claim
        </Button>
      </div>
    </div>
  </div>
)
