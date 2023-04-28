import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { SafeConnector } from '@wagmi/connectors/safe'
import { configureChains, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

import chain from '@/config/chains'

export const configWagmiClient = () => {
  const { chains, provider } = configureChains([chain.fuji, chain.avalanche], [publicProvider()])

  const { connectors } = getDefaultWallets({
    appName: 'GoGoPool',
    chains,
  })

  const wagmiClient = createClient({
    autoConnect: true,
    provider,
    connectors: [
      ...connectors(),
      new SafeConnector({
        chains,
        options: {
          allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
          debug: false,
        },
      }),
    ],
  })

  return {
    wagmiClient,
    chains,
  }
}

export default configWagmiClient
