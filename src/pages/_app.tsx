import "@/styles/globals.scss";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";
import Head from "next/head";

import { Accordion } from "@/common/components/Accordion";
import { CoreLayout } from "@/common/components/CoreLayout";
import { Colors } from "@/common/components/CustomColor";
import { ChakraFonts, Fonts } from "@/common/components/CustomFont";
import { PageHead } from "@/common/components/PageHead";

export const App = ({ Component, pageProps }) => {
  const Layout = Component.layout ? Component.layout : CoreLayout;

  const customTheme = extendTheme(
    {
      fonts: Fonts,
      components: {
        Accordion: Accordion,
        Heading: {
          sizes: {
            h1: {
              fontFamily: "Domaine",
              fontSize: "80px",
              lineHeigh: "88px",
            },
            h2: {
              fontFamily: "Domaine",
              fontSize: "60px",
              lineHeigh: "66px",
            },
            h3: {
              fontFamily: "Domaine",
              fontSize: "48px",
              lineHeigh: "52px",
            },
            h4: {
              fontFamily: "Domaine",
              fontSize: "36px",
              lineHeigh: "40px",
            },
            h5: {
              fontFamily: "Domaine",
              fontSize: "32px",
              lineHeigh: "40px",
            },
          },
        },
        Text: {
          sizes: {
            xxl: {
              fontFamily: "Jost",
              fontSize: "32px",
              lineHeight: "40px",
            },
            xl: {
              fontFamily: "Jost",
              fontSize: "24px",
              lineHeight: "36px",
            },
            lg: {
              fontFamily: "Jost",
              fontSize: "18px",
              lineHeight: "28px",
            },
            md: {
              fontFamily: "Jost",
              fontSize: "16px",
              lineHeight: "24px",
            },
            sm: {
              fontFamily: "Jost",
              fontSize: "14px",
              lineHeight: "22px",
            },
            xs: {
              fontFamily: "Jost",
              fontSize: "12px",
              lineHeight: "18px",
            },
          },
        },
      },
      colors: Colors,
    },
    withProse()
  );

  return (
    <ChakraProvider theme={customTheme}>
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
  );
};

export default App;
