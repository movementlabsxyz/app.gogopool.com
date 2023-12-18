import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { SafeConnector } from '@wagmi/connectors/safe'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'
import { configureChains, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

import chain from '@/config/chains'

export const configWagmiClient = () => {
  const { chains, provider } = configureChains([chain.avalanche, chain.fuji], [publicProvider()])

  const { connectors } = getDefaultWallets({
    appName: 'GoGoPool',
    chains,
    projectId: '14ced539274121ccca8d831af2c0a924',
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
      // see here for more info: https://wagmi.sh/core/connectors/walletConnect
      new WalletConnectConnector({
        chains,
        // why do we need to keep this? If I remove it I get an error
        options: {
          projectId: '14ced539274121ccca8d831af2c0a924',
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
