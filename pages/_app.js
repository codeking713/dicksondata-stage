import WordPressProvider from '@/components/common/WordPressProvider'
import {AppProvider} from '@/components/context/AppContext'
import {ModalProvider} from '@/components/context/ModalContext'
import {useWpApollo} from '@/lib/wordpress/connector'
import '@/styles/main.scss'
import {ApolloProvider} from '@apollo/client'
import {Provider as NextAuthProvider} from 'next-auth/client'
import {DefaultSeo} from 'next-seo'
import Error from 'next/error'
import Link from 'next/link'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {StrictMode, useEffect, useState} from 'react'
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: 'GTM-WZSD2TM'
}
//gtmId: 'GTM-NTL3CJ5'
/**
 * Render the App component.
 *
 * @author DAP
 * @param  {object}  props           The component attributes as props.
 * @param  {object}  props.Component Page component to display.
 * @param  {boolean} props.pageProps Page component props.
 * @return {Element}                 The App component.
 */
export default function App({Component, pageProps}) {
  /**
   * Wrap the app in the ApolloProvider component.
   *
   * @see https://www.apollographql.com/docs/react/api/react/hooks/#the-apolloprovider-component
   */
  const apolloClient = useWpApollo(pageProps)

  const router = useRouter()
  let canonicalUrl = process.env.FRONTEND_URL.slice(0, -1)

  if (router.defaultLocale !== router.locale) {
    canonicalUrl = canonicalUrl + '/' + router.locale
  }

  if (router.asPath !== '/') {
    canonicalUrl = canonicalUrl + router.asPath
  }

  canonicalUrl = canonicalUrl.split('?')[0]

  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])

  // Redirect from WP blog archive to FE posts archive.
  useEffect(() => {
    if (!pageProps?.post?.isPostsPage) {
      return
    }

    router.push('/blog')
  }, [pageProps, router])

  // Check for errors.
  const error = pageProps?.error
  let errorMessage = pageProps?.errorMessage ?? 'An unknown error occurred.'
  // Trim trailing period - added via Error component.
  errorMessage = errorMessage.replace(/\.$/g, '')

  // Extract specific props from page props.
  const {
    defaultSeo: {social, ...defaultSeoData} = {},
    menus,
    headlessConfig,
    algolia,
    preview,
    session,
    ...passThruProps
  } = pageProps

  const componentProps = {
    ...passThruProps,
    post: {
      ...passThruProps?.post,
      seo: {
        ...passThruProps?.post?.seo,
        siteTitle: defaultSeoData?.openGraph?.siteName,
        siteDescription: defaultSeoData?.description,
        social
      }
    }
  }

  // Initialize state for WordPress context provider.
  const [wp, setWp] = useState({
    algolia: {
      indexName: algolia?.indexName
    },
    menus: menus,
    headlessConfig: headlessConfig
  })

  //When ever the menus, headlessConfig or algolia change, we need to update the context
  useEffect(() => {
    setWp({
      algolia: {
        indexName: algolia?.indexName
      },
      menus: menus,
      headlessConfig: headlessConfig
    })
  }, [menus, headlessConfig, algolia])

  return (
    <StrictMode>
      <AppProvider>
        <NextAuthProvider
          session={session}
          options={{
            clientMaxAge: Number(process.env.NEXT_PUBLIC_SESSION_REFRESH)
          }}
        >
          <ApolloProvider client={apolloClient}>
            <WordPressProvider value={wp}>
              <ModalProvider>
                {error ? (
                  <Error statusCode={500} title={errorMessage} />
                ) : (
                  <>
                    {!!defaultSeoData && (
                      <DefaultSeo
                        {...defaultSeoData}
                        canonical={canonicalUrl}
                      />
                    )}
                    {!!preview && (
                      // TODO -- abstract this to a component.
                      <p>
                        This page is a preview.{' '}
                        <Link href="/api/exit-preview">
                          <a>Exit preview mode</a>
                        </Link>
                      </p>
                    )}
                    <Component {...componentProps} />
                  </>
                )}
              </ModalProvider>
            </WordPressProvider>
          </ApolloProvider>
        </NextAuthProvider>
      </AppProvider>
    </StrictMode>
  )
}

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired
}
