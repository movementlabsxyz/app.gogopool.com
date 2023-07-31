import { ReactNode } from 'react'

type Props = {
  checked: boolean
  radio: ReactNode
  details: string
}
export default function CollatoralizationRadio({ checked, details, radio }: Props) {
  return (
    <div
      className={`flex rounded-xl border transition-colors duration-300 ${
        checked ? 'bg-white' : 'bg-[#F7F9FF]'
      } p-7`}
    >
      <div className="flex flex-col">
        <div>{radio}</div>
        <span className="text-default">{details}</span>
      </div>
    </div>
  )
}
