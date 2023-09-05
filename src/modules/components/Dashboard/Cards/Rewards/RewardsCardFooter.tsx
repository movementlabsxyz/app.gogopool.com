type Props = {
  nextCycleDate: Date
}
export default function RewardsCardFooter({ nextCycleDate }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-y-4 pt-6 align-middle text-sm font-bold text-blue-500 xs:justify-between">
      <span>
        NEXT REWARD DATE:{' '}
        <span className="text-blue-900">
          {nextCycleDate.toLocaleDateString()} AT {nextCycleDate.toLocaleTimeString()}
        </span>
      </span>
    </div>
  )
}
