import { createContext, useContext } from 'react'

import { WCardInfo } from './WelcomeCard'

const WelcomeCardContext = createContext<WCardInfo | null>(null)

export function useWelcomeCardContext() {
  const context = useContext(WelcomeCardContext)
  if (!context) {
    throw new Error('WelcomeStepCard component must be rendered as a child of the WelcomeStepCard')
  }
  return context
}

export default WelcomeCardContext
