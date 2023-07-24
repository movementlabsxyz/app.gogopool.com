import { ColorModeScript } from '@chakra-ui/react'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

import { CustomFonts } from '@/common/components/CustomFont'
import { Favicon } from '@/common/components/FavIcon'
import theme from '@/theme'
import { renderStatic } from '@/utils/renderer'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const page = await ctx.renderPage()
    const { css, ids } = await renderStatic(page.html)
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <style
          dangerouslySetInnerHTML={{ __html: css }}
          data-emotion={`css ${ids.join(' ')}`}
          key="emotion-style"
        />,
      ],
    }
  }

  render() {
    return (
      <Html className="h-full " lang="en">
        <Head>
          <CustomFonts key="custom-font" />
          <Favicon key="favicon" />
        </Head>
        <body className="h-full">
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
