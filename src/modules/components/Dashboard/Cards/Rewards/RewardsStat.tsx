import { FiInfo } from 'react-icons/fi'

import { Tooltip } from '@/common/components/Tooltip'

export default function RewardsStat({ item }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="flex items-center gap-1 py-4 text-sm font-bold text-blue-500">
        <dt>{item.name}</dt>
        <span className="hidden sm:block">
          <Tooltip content={item.tooltip} placement="right">
            <FiInfo color="#867FA6" />
          </Tooltip>
        </span>
      </span>
      {item.stat === '0.00 GGP' || item.stat === '0.00 %' ? (
        <dd className="lds-dual-ring flex self-center"></dd>
      ) : (
        <dd className="flex items-center justify-end text-sm font-bold text-blue-900">
          {item.stat}
        </dd>
      )}
    </div>
  )
}
