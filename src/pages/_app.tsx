import "@/styles/globals.scss";
import "@/styles/components.scss";
import "@rainbow-me/rainbowkit/styles.css";

import { ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import dynamic from "next/dynamic";
import Head from "next/head";
import { WagmiConfig } from "wagmi";

import { CoreLayout } from "@/common/components/CoreLayout";
import { ChakraFonts } from "@/common/components/CustomFont";
import { PageHead } from "@/common/components/PageHead";
import configWagmiClient from "@/config/wagmi";
import { wrapper } from "@/store";
import theme from "@/theme";

const { wagmiClient, chains } = configWagmiClient();

const CrispWithNoSSR = dynamic(
  () => import("@/common/components/crisp/crisp.js"),
  {
    ssr: false,
  }
);

export const App = ({ Component, pageProps }) => {
  const Layout = Component.layout ? Component.layout : CoreLayout;

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default wrapper.withRedux(App);
