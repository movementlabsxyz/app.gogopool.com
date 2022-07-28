import "@/styles/globals.scss";
import "@/styles/components.scss";
import "@rainbow-me/rainbowkit/styles.css";

import { ChakraProvider } from "@chakra-ui/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { CoreLayout } from "@/common/components/CoreLayout";
import { ChakraFonts } from "@/common/components/CustomFont";
import { PageHead } from "@/common/components/PageHead";
import chain from "@/config/chains";
import { wrapper } from "@/store";
import theme from "@/theme";

const { chains, provider } = configureChains(
  [chain.avalanche, chain.fuji, /*chain.local,*/ chain.anr],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "GoGoPool",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const App = ({ Component, pageProps }) => {
  const Layout = Component.layout ? Component.layout : CoreLayout;

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider theme={theme}>
          <ChakraFonts />
          <Head>
            <meta
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
              name="viewport"
            />
            <PageHead />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default wrapper.withRedux(App);
