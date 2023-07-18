type Props = {
  avaxDeposited: number
  avaxRewards: number
  collatPercent: number
  ggpRewards: number
  ggpStaked: number
  roi: number
}

export default function CollatDetails({
  avaxDeposited,
  avaxRewards,
  collatPercent,
  ggpRewards,
  ggpStaked,
  roi,
}: Props) {
  return (
    <div className="flex w-96 flex-col rounded-xl border bg-blue-900 py-10 px-14">
      <div className="text-white">GGP Collatoralization: {collatPercent}%</div>
      <div className="flex flex-col text-caution-500">
        <span>Validation Length: 15 days</span>
        <span>GGP Staked: {ggpStaked} GGP</span>
        <span>AVAX Deposited: {avaxDeposited} AVAX</span>
      </div>
      <div className="pt-8 text-white">Results after 30 day cycle</div>
      <div className="flex flex-col text-success-500">
        <span>Monthly ROI: {roi}%</span>
        <span>GGP Rewards: {ggpRewards} GGP</span>
        <span>AVAX Rewards: {avaxRewards} AVAX</span>
      </div>
    </div>
  )
}
