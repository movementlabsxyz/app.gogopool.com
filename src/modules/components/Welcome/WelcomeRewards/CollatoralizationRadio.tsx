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
      <div className="flex basis-[400px] flex-col">
        <div>{radio}</div>
        <span className="flex text-default">{details}</span>
      </div>
    </div>
  )
}
