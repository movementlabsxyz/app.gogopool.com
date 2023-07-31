import { ReactNode } from 'react'

export default function CircleButton({ content }: { content: ReactNode }) {
  return (
    <div className="cursor-pointer rounded-full border-2 border-[#3e33bb] p-2 px-4 font-bold text-[#3e33bb]">
      {content}
    </div>
  )
}
