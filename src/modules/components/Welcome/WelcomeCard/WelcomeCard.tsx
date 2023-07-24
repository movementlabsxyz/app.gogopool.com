//Excellent video explaining this pattern:
//https://www.youtube.com/watch?v=vPRdY87_SH0
import { ReactNode } from 'react'

import WelcomeCardContext, { useWelcomeCardContext } from './WelcomeCardContext'

export type WCardInfo = {
  image: ReactNode
  step: number
  summary: ReactNode
  title: 'Register' | 'Match' | 'Launch'
}

type Props = {
  info: WCardInfo
}

export default function WelcomeCard({ info }: Props) {
  return (
    <WelcomeCardContext.Provider value={info}>
      <div className="flex w-64 flex-col items-center">
        <WelcomeCard.Image />
        <WelcomeCard.Details>
          <WelcomeCard.Step />
          <WelcomeCard.Title />
          <WelcomeCard.Summary />
        </WelcomeCard.Details>
      </div>
    </WelcomeCardContext.Provider>
  )
}

WelcomeCard.Image = WCardImage
WelcomeCard.Details = WCardDetails
WelcomeCard.Step = WCardStep
WelcomeCard.Title = WCardTitle
WelcomeCard.Summary = WCardSummary

function WCardImage() {
  const info = useWelcomeCardContext()
  return <>{info.image}</>
}
function WCardDetails({ children }) {
  return <div className="flex flex-col">{children}</div>
}
function WCardStep() {
  const info = useWelcomeCardContext()
  return <div className="font-bold text-default">STEP {info.step}</div>
}
function WCardTitle() {
  const info = useWelcomeCardContext()
  return <div className="text-xl font-bold text-subtitle">{info.title}</div>
}
function WCardSummary() {
  const info = useWelcomeCardContext()
  return <div className="text-default">{info.summary}</div>
}
