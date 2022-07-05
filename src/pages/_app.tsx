import "@/styles/globals.scss";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";
import Head from "next/head";

import { Accordion } from "@/common/components/Accordion";
import { ThemeButton } from "@/common/components/Button";
import { CoreLayout } from "@/common/components/CoreLayout";
import { Colors } from "@/common/components/CustomColor";
import {
  ChakraFonts,
  Fonts,
  Heading,
  Text,
} from "@/common/components/CustomFont";
import { PageHead } from "@/common/components/PageHead";

export const App = ({ Component, pageProps }) => {
  const Layout = Component.layout ? Component.layout : CoreLayout;

  const customTheme = extendTheme(
    {
      fonts: Fonts,
      components: {
        Accordion: Accordion,
        Button: ThemeButton,
        Heading: Heading,
        Text: Text,
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
