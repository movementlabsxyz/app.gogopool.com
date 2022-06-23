import Document, { Head, Html, Main, NextScript } from "next/document";

import { Favicon } from "@/common/components/FavIcon";
import { CustomFonts } from "@/common/components/CustomFont";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <CustomFonts />
          <Favicon />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
