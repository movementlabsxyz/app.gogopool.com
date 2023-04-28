import { Global } from '@emotion/react'

/**
 * Custom Fonts for tailwindcss.config
 */
export const CustomFonts = (): JSX.Element => {
  return (
    <>
      <link
        as="font"
        crossOrigin="anonymous"
        href="/assets/fonts/Jost/Jost-Italic-VariableFont_wght.ttf"
        rel="preload"
        type="font/ttf"
      ></link>
      <link
        as="font"
        crossOrigin="anonymous"
        href="/assets/fonts/Jost/Jost-VariableFont_wght.ttf"
        rel="preload"
        type="font/ttf"
      ></link>
      <link
        as="font"
        crossOrigin="anonymous"
        href="/assets/fonts/Domaine/domaine-display-extrabold.woff2"
        rel="preload"
        type="font/woff2"
      ></link>
      <link
        as="font"
        crossOrigin="anonymous"
        href="/assets/fonts/Domaine/domaine-display-medium.woff2"
        rel="preload"
        type="font/woff2"
      ></link>
    </>
  )
}

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
)
