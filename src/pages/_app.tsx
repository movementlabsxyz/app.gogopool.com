import "@/styles/globals.scss";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";
import Head from "next/head";

import { Accordion } from "@/common/components/Accordion";
import { CoreLayout } from "@/common/components/CoreLayout";
import { PageHead } from "@/common/components/PageHead";

export const App = ({ Component, pageProps }) => {
  const Layout = Component.layout ? Component.layout : CoreLayout;

  const customTheme = extendTheme(
    {
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
      colors: {
        paper: {
          start: "#F6F6F3",
          end: "#FFFFFF",
        },
        blue: {
          900: "#0D0959",
          800: "#15106C",
          700: "#201986",
          600: "#2E25A0",
          550: "#382EA8",
          500: "#3E33BB",
          400: "#6B61D6",
          300: "#8E84EA",
          200: "#B7AFF8",
          100: "#DBD7FB",
          50: "#EEEAFB",
        },
        green: {
          900: "#0E6F5B",
          800: "#178764",
          700: "#24A772",
          600: "#35C87D",
          550: "#1ADA66",
          500: "#49E988",
          400: "#75F199",
          300: "#89F1B2",
          200: "#B7FCBE",
          100: "#DBFDDB",
          50: "#E7FEE7",
        },
        orange: {
          900: "#7A070B",
          800: "#93120D",
          700: "#B72614",
          600: "#DB401D",
          500: "#FF5F29",
          400: "#FF845A",
          300: "#FFB17E",
          200: "#FFD1A9",
          100: "#FFEBD4",
          50: "#FFF3E5",
        },
        yellow: {
          900: "#7A3007",
          800: "#93430D",
          700: "#B75D14",
          600: "#E07138",
          500: "#FF9D29",
          400: "#FFBC5E",
          300: "#FFD07E",
          200: "#FFE3A9",
          100: "#FFF3D4",
          50: "#FFF8E5",
        },
        grey: {
          1000: "#000000",
          900: "#1A1C22",
          800: "#323441",
          700: "#404355",
          600: "#5D5D64",
          500: "#74747D",
          400: "#A7A7B1",
          300: "#CECED8",
          200: "#EBEBF2",
          100: "#F4F4F8",
          50: "#FDFDFE",
          0: "#FFFFFF",
        },
        success: {
          900: "#00270B",
          800: "#004D16",
          700: "#007421",
          600: "#009A2C",
          500: "#00C137",
          400: "#2BCD59",
          300: "#55DA7B",
          200: "#80E69D",
          100: "#AAF3BF",
          50: "#D5FFE1",
        },
        caution: {
          900: "#4C3E0D",
          800: "#776119",
          700: "#A28526",
          600: "#CDA832",
          500: "#F8CC3E",
          400: "#F9D665",
          300: "#FBE08B",
          200: "#FCEBB2",
          100: "#FEF5D8",
          50: "#FEFAEC",
        },
        error: {
          900: "#F90E0D",
          800: "#821B1B",
          700: "#AC2928",
          600: "#D53636",
          500: "#FF2A29",
          400: "#FF6969",
          300: "#FF8F8E",
          200: "#FFB4B4",
          100: "#FFDAD9",
          50: "#FFECEC",
        },
      },
    },
    withProse()
  );

  return (
    <ChakraProvider theme={customTheme}>
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
