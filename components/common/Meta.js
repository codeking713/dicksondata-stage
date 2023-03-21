import Head from 'next/head'

const SNAPENGAGE_URL =
  'https://storage.googleapis.com/code.snapengage.com/js/b08f5f13-a03c-44b9-8209-b563b9aece4a.js'

/**
 * Render extra meta tags in the document head.
 *
 * @author DAP
 * @return {Element} The Meta component.
 */
export default function Meta() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="msapplication-TileColor" content="#fffff" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#fff" />
      <meta name="format-detection" content="telephone=no" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <script async defer src={SNAPENGAGE_URL} />
    </Head>
  )
}
