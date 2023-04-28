import '@/styles/globals.scss'
import '@/styles/components.scss'
import '@rainbow-me/rainbowkit/styles.css'

import { ChakraProvider } from '@chakra-ui/react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import NoSSR from 'react-no-ssr'
import { WagmiConfig } from 'wagmi'

import { ChakraFonts } from '@/common/components/CustomFont'
import { PageHead } from '@/common/components/PageHead'
import configWagmiClient from '@/config/wagmi'
import { wrapper } from '@/store'
import theme from '@/theme'

const { chains, wagmiClient } = configWagmiClient()

const CrispWithNoSSR = dynamic(() => import('@/common/components/crisp/crisp.js'), {
  ssr: false,
})

export const App = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <NoSSR>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} showRecentTransactions>
          <ChakraProvider theme={theme}>
            <ChakraFonts />
            <CrispWithNoSSR />
            <Head>
              <meta
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                name="viewport"
              />
              <PageHead />
            </Head>
            {getLayout(<Component {...pageProps} />)}
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </NoSSR>
  )
}

export default wrapper.withRedux(App)
