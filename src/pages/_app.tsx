import '@/styles/globals.scss'
import '@/styles/components.scss'
import '@rainbow-me/rainbowkit/styles.css'

import { ChakraProvider } from '@chakra-ui/react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { BrowserTracing } from '@sentry/browser'
import * as Sentry from '@sentry/nextjs'
import { Analytics } from 'dappling-analytics/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { PostHogProvider } from 'posthog-js/react'
import NoSSR from 'react-no-ssr'
import { WagmiConfig } from 'wagmi'

import { ChakraFonts } from '@/common/components/CustomFont'
import { PageHead } from '@/common/components/PageHead'
import configWagmiClient from '@/config/wagmi'
import { POSTHOG_API_HOST, POSTHOG_PUBLIC_KEY } from '@/constants/posthog'
import theme from '@/theme'

const { chains, wagmiClient } = configWagmiClient()

const CrispWithNoSSR = dynamic(() => import('@/common/components/crisp/crisp.js'), {
  ssr: false,
})

const ph_options = {
  api_host: POSTHOG_API_HOST,
  opt_in_site_apps: true,
}

export const App = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  Sentry.init({
    dsn: 'https://5ca2aff3aa594b4e9c2a867a0d6a7a7d@o1287706.ingest.sentry.io/6619501',
    integrations: [
      new BrowserTracing({
        // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ['localhost', /^https:\/\/app.gogopool\.com\//],
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  })

  return (
    <NoSSR>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} showRecentTransactions>
          <PostHogProvider apiKey={POSTHOG_PUBLIC_KEY} options={ph_options}>
            <ChakraProvider theme={theme}>
              <ChakraFonts />
              <CrispWithNoSSR />
              <Analytics />
              <Head>
                <meta
                  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                  name="viewport"
                />
                <PageHead />
              </Head>
              {getLayout(<Component {...pageProps} />)}
            </ChakraProvider>
          </PostHogProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </NoSSR>
  )
}

export default App
