import { InfoCircleIcon } from '@/common/components/CustomIcon'

export const SuccessMessage = ({ message }) => (
  <div className="mt-4 rounded-md bg-green-50 p-4">
    <div className="flex items-center">
      <InfoCircleIcon aria-hidden="true" className="h-5 w-5 fill-green-700" />
      <div className="ml-3 flex space-x-2 text-sm text-green-700">
        <b>Nice!</b>
        <span>{message}</span>
      </div>
    </div>
  </div>
)
