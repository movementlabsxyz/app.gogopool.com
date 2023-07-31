import { HiExclamationTriangle } from 'react-icons/hi2'

export const ErrorMessage = ({ message }) => (
  <div className="mt-4 rounded-md bg-yellow-50 p-4">
    <div className="ml-3 space-x-2 text-sm text-yellow-700">
      <b>
        <HiExclamationTriangle aria-hidden="true" className="inline h-5 w-5 text-yellow-400" />{' '}
        Whoops.
      </b>
      <span>{message}</span>
    </div>
  </div>
)
