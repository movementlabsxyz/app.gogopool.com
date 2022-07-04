import { ComponentStyleConfig } from "@chakra-ui/react";
import { Global } from "@emotion/react";

/**
 * Custom Fonts for tailwindcss.config
 */
export const CustomFonts = (): JSX.Element => {
  return (
    <>
      <link
        rel="preload"
        href="/assets/fonts/Jost/Jost-Italic-VariableFont_wght.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      ></link>
      <link
        rel="preload"
        href="/assets/fonts/Jost/Jost-VariableFont_wght.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      ></link>
      <link
        rel="preload"
        href="/assets/fonts/Domaine/domaine-display-extrabold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      ></link>
      <link
        rel="preload"
        href="/assets/fonts/Domaine/domaine-display-medium.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      ></link>
    </>
  );
};

/**
 * Custom Fonts for Chakra-UI theme
 */
export const Fonts = {
  heading: "'Domaine', sans-serif",
  body: "'Jost', sans-serif",
};

export const ChakraFonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: "Jost";
      font-style: normal;
      font-weight: normal;
      font-display: swap;
      src: url(/assets/fonts/Jost/Jost-VariableFont_wght.ttf) format("truetype");
    }
    
    @font-face {
      font-family: "Jost";
      font-style: italic;
      font-weight: normal;
      font-display: swap;
      src: url(/assets/fonts/Jost/Jost-Italic-VariableFont_wght.ttf)
        format("truetype");
    }
    
    @font-face {
      font-family: "Jost";
      font-style: normal;
      font-weight: bold;
      font-display: swap;
      src: url(/assets/fonts/Jost/Jost-Bold-VariableFont_wght.ttf)
        format("truetype");
    }
    
    @font-face {
      font-family: "Domaine";
      font-style: normal;
      font-weight: normal;
      font-display: swap;
      src: url(/assets/fonts/Domaine/domaine-display-medium.woff2)
        format("truetype");
    }
    
    @font-face {
      font-family: "Domaine";
      font-style: normal;
      font-weight: bold;
      font-display: swap;
      src: url(/assets/fonts/Domaine/domaine-display-extrabold.woff2)
        format("truetype");
    }
      `}
  />
);

export const Heading: ComponentStyleConfig = {
  sizes: {
    h1: {
      fontSize: "80px",
      lineHeight: "88px",
    },
    h2: {
      fontSize: "60px",
      lineHeight: "66px",
    },
    h3: {
      fontSize: "48px",
      lineHeight: "52px",
    },
    h4: {
      fontSize: "36px",
      lineHeight: "40px",
    },
    h5: {
      fontSize: "32px",
      lineHeight: "40px",
    },
  },
};

export const Text: ComponentStyleConfig = {
  sizes: {
    xxl: {
      fontSize: "32px",
      lineHeight: "40px",
    },
    xl: {
      fontSize: "24px",
      lineHeight: "36px",
    },
    lg: {
      fontSize: "18px",
      lineHeight: "28px",
    },
    md: {
      fontSize: "16px",
      lineHeight: "24px",
    },
    sm: {
      fontSize: "14px",
      lineHeight: "22px",
    },
    xs: {
      fontSize: "12px",
      lineHeight: "18px",
    },
    xxs: {
      fontSize: "10px",
      lineHeight: "16px",
    },
  },
};
