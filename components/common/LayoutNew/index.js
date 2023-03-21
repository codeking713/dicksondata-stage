import Container from '@/components/atoms/Container'
import GlobalHeader from '@/components/organisms/GlobalHeader'
import { seoPropTypes } from '@/functions/getPagePropTypes'
import Meta from 'components/common/Meta'
import { BlogJsonLd, NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useState } from 'react'

import css from './layout.module.scss'
const Footer = dynamic(() => import('@/components/organisms/Footer/'), {
  ssr: false
})

const Layout = ({ children, seo, hasJsonLd, injectContainer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { locale } = useRouter()
  // temp solution to disallow GB pages from indexing
  const languagesToDisallow = ['en-gb']
  console.log(injectContainer, "injectContainer")

  return (
    <>
      <NextSeo
        title={seo?.title}
        description={seo?.metaDesc}
        openGraph={{
          title: seo?.title,
          description: seo?.metaDesc,
          images: [{ url: seo?.opengraphImage?.sourceUrl }],
          url: seo?.canonical
        }}
        nofollow={
          languagesToDisallow.includes(locale)
            ? true
            : 'follow' !== seo?.metaRobotsNofollow
        }
        noindex={
          languagesToDisallow.includes(locale)
            ? true
            : 'index' !== seo?.metaRobotsNoindex
        }
      />
      {!!hasJsonLd && (
        <BlogJsonLd
          url={seo?.canonical}
          title={seo?.title}
          images={[seo?.opengraphImage?.sourceUrl]}
          datePublished={seo?.opengraphPublishedTime}
          dateModified={seo?.opengraphModifiedTime}
          authorName={seo?.opengraphAuthor}
          description={seo?.metaDesc}
        />
      )}
      <Meta />
      <div
        className={
          mobileMenuOpen
            ? `${css.parent} ${css['parent--noscroll']}`
            : css.parent
        }
      >
        <GlobalHeader
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <main className={css.parent__main}>
          {injectContainer ? <Container>{children}</Container> : children}
        </main>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hasJsonLd: PropTypes.bool,
  ...seoPropTypes
}

export default Layout
