import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Container from '@/components/atoms/Container'
import LayoutNew from '@/components/common/LayoutNew'
import ProductSupportSkeleton from '@/components/molecules/Support/Skeleton/ProductSupportSkeleton'
import A2LASection from '@/components/organisms/A2LASection'
import AcfContactForm from '@/components/organisms/AcfContactForm'
import AcfNewsletterForm from '@/components/organisms/AcfNewsletterForm'
import AcfSupportContactSection from '@/components/organisms/AcfSupportContactSection'
import FAQSection from '@/components/organisms/FAQSection'
import SupportArticles from '@/components/organisms/Support/SupportArticles'
import SupportArtifacts from '@/components/organisms/Support/SupportArtifacts'
import SupportHero from '@/components/organisms/Support/SupportHero'
import SupportProductHeader from '@/components/organisms/Support/SupportProductHeader'
import {getLangCode} from '@/functions/checkout/commonUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import {getTranslation} from '@/functions/utility'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import client from '@/lib/next-api/connectorWoo'
import {PRODUCT_SLUGS} from '@/lib/wordpress/products/queryProductBySlug'
import {useWordPressContext} from 'components/common/WordPressProvider'
import {isEmpty} from 'lodash'
import {useRouter} from 'next/router'
import {useState} from 'react'
import styles from './support.module.scss'

// Define route post type.
const postType = 'supportproduct'

/**
 * Render the Support Article component.
 *
 * @author DAP
 * @param  {object}  props            Props
 * @param  {object}  props.post       Post data
 * @param  {object}  props.pageConfig Post config data
 * @return {Element}                  The Support Article component.
 */
export default function SupportArticle({post, pageConfig}) {
  const {headlessConfig} = useWordPressContext()
  const router = useRouter()
  var breadcrumbs = []
  breadcrumbs.push({
    text: getTranslation(headlessConfig, 'SUPPORT'),
    url: '/support'
  })
  if (post) breadcrumbs.push({text: post.name, url: `/support/${post.slug}`})

  const [activeArticleIndex, setActiveArticleIndex] = useState(0)
  const articleClickHandler = (articleIndex) => {
    setActiveArticleIndex(articleIndex)
  }

  var artifacts = post?.supportProductLink?.supportArtifacts
  var faqs = post?.supportProductLink?.supportArtifacts?.filter(
    (a) => a.contentTypeName === 'support_faqs'
  )

  return (
    <LayoutNew seo={{...post?.seo}}>
      <SupportHero
        heading={getTranslation(headlessConfig, 'SUPPORT')}
        sub_heading={getTranslation(headlessConfig, 'SUPPORT_INTRO')}
        language={getLangCode(router.locale).toLowerCase()}
      />
      {post?.databaseId ? (
        <>
          <Container
            className={`${styles.artifacts} ${
              !artifacts && styles['artifacts--nopadding']
            }`}
          >
            {!!breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
            <SupportProductHeader
              name={post?.name}
              media={post?.featuredImage?.node}
            />
            {artifacts?.length > 0 && (
              <div
                className={`${styles['artifacts__content']} ${styles['grid']} ${styles['gap-md']}`}
              >
                <div className={`${styles['col-3@md']}`}>
                  <SupportArtifacts
                    product={post}
                    articleClickHandler={articleClickHandler}
                    headlessConfig={headlessConfig}
                  />
                </div>
                <div
                  className={`${styles.products__filter} ${styles['col-9@md']}`}
                >
                  <SupportArticles
                    supportArticles={artifacts}
                    activeArticleIndex={activeArticleIndex}
                    // notifyActiveArticleChange={notifyActiveArticleChange}
                  />
                </div>
              </div>
            )}
          </Container>
          {faqs && faqs.length > 0 && (
            <FAQSection
              showCta={true}
              heading={
                pageConfig?.faqSection?.header &&
                (pageConfig?.faqSection?.header).replace(
                  '[PRODUCT]',
                  post?.name
                )
              }
              faqs={faqs}
              cta={pageConfig?.faqSection?.cta}
              defaultCtaText={getTranslation(headlessConfig, 'READ_MORE')}
            />
          )}
          <AcfSupportContactSection
            heading={pageConfig?.supportContactSection?.header}
            copy={pageConfig?.supportContactSection?.copy}
            items={pageConfig?.supportContactSection?.items.map((item) => {
              return {
                link: item.link,
                linkType: item.linkType,
                title: item.title,
                imageMeta: {
                  altText: item.image?.altText,
                  mediaItemUrl: item.image?.mediaItemUrl
                }
              }
            })}
          />
          <A2LASection
            heading={pageConfig?.a2laSection?.header}
            cta={pageConfig?.a2laSection?.cta}
            image={pageConfig?.a2laSection?.image}
            defaultCtaText={getTranslation(headlessConfig, 'SEE_A2_DOC')}
          />
          <AcfContactForm
            message_heading={pageConfig?.contactFormSection?.header}
            message_copy={pageConfig?.contactFormSection?.subheader}
            message_submit_text={getTranslation(headlessConfig, 'SUBMIT')}
            showLocation={false}
          />
          <AcfNewsletterForm
            section_copy={pageConfig?.newsLetterSection?.subheader}
            section_heading={pageConfig?.newsLetterSection?.header}
            signup_opt_in_text={pageConfig?.newsLetterSection?.signupOptInText}
          />
        </>
      ) : (
        <Container>
          <ProductSupportSkeleton></ProductSupportSkeleton>
        </Container>
      )}
    </LayoutNew>
  )
}

/**
 * Get post static paths.
 *
 * @author DAP
 * @return {object} Object consisting of array of paths and fallback setting.
 */
export async function getStaticPaths() {
  const {data} = await client.query({
    query: PRODUCT_SLUGS
  })

  const pathsData = []

  data?.products?.nodes &&
    data?.products?.nodes.map((product) => {
      if (!isEmpty(product?.slug)) {
        pathsData.push({params: {slug: product?.slug}})
      }
    })

  return {
    paths: pathsData,
    fallback: true
  }
}

/**
 * Get post static props.
 *
 * @author DAP
 * @param  {object}  context             Context for current post.
 * @param  {object}  context.params      Route parameters for current post.
 * @param  {boolean} context.preview     Whether requesting preview of post.
 * @param  {object}  context.previewData Post preview data.
 * @return {object}                      Post props.
 */
export async function getStaticProps(context) {
  const {
    params: {slug},
    locale,
    defaultLocale
  } = context

  let globalPostData = await getPostTypeStaticProps(
    {slug: 'support-product'},
    'globalpageconfig',
    false,
    null,
    getLangCode(locale),
    getLangCode(defaultLocale)
  )
  const postData = await getPostTypeStaticProps(
    {slug: slug},
    postType,
    false,
    null,
    getLangCode(locale)
  )
  return {
    props: {
      ...postData?.props,
      pageConfig: globalPostData?.props?.globalPageConfig?.supportProduct || {}
    },
    revalidate: Number(process.env.NEXT_STATIC_PROPS_REVALIDATE),
    notFound: postData?.notFound
  }
}

SupportArticle.propTypes = {
  ...getPagePropTypes(postType)
}
