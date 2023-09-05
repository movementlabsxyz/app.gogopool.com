type Props = {
  number: number
  subtitle: 'DAYS' | 'HRS' | 'MINS' | 'SECS' | 'MS'
  font?: string
}

export default function CountdownNumber({ font = 'font-domaine', number, subtitle }: Props) {
  return (
    <div className="flex flex-col items-center text-center text-2xl">
      <span className={`${font} pb-3 text-[32px]`}>{number}</span>
      <span className="text-sm text-blue-500">{subtitle}</span>
    </div>
  )
}
