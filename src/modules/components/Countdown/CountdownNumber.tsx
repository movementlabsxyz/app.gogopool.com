type Props = {
  number: number
  subtitle: 'DAYS' | 'HRS' | 'MINS' | 'SECS' | 'MS'
  font?: string
  fontSize?: `text-[${string}px]`
}

export default function CountdownNumber({
  font = 'font-domaine',
  fontSize = 'text-[32px]',
  number,
  subtitle,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center text-2xl">
      <span className={`${font} ${fontSize} pb-3`}>{number}</span>
      <span className="text-sm text-blue-500">{subtitle}</span>
    </div>
  )
}
