// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, {Head, Html, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400&family=Assistant:wght@400;600;700&&display=swap"
            rel="stylesheet"
          />
          <link
            rel="alternate"
            hrefLang="en-us"
            href="https://dicksondata.com"
          />
          <link
            rel="alternate"
            hrefLang="en-gb"
            href="https://dicksondata.com/en-gb"
          />
          <link
            rel="alternate"
            hrefLang="fr-fr"
            href="https://dicksondata.com/fr-fr"
          />
        </Head>
        <body>
          {/* <!-- Start of HubSpot Embed Code --> */}

          <script
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src="//js.hs-scripts.com/5565834.js"
          ></script>

          {/* <!-- End of HubSpot Embed Code --> */}
          <div id="modal-root"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
