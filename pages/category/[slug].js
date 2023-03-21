import Breadcrumbs from '@/components/atoms/Breadcrumbs'
import Container from '@/components/atoms/Container'
import LayoutNew from '@/components/common/LayoutNew'
import PageNotifications from '@/components/molecules/PageNotifications'
import A2LASection from '@/components/organisms/A2LASection'
import AcfContactForm from '@/components/organisms/AcfContactForm'
import AcfNewsletterForm from '@/components/organisms/AcfNewsletterForm'
import AcfSupportContactSection from '@/components/organisms/AcfSupportContactSection'
import FAQSection from '@/components/organisms/FAQSection'
import ProductCategoryGrid from '@/components/organisms/ProductCategoryGrid/'
import SupportHero from '@/components/organisms/Support/SupportHero'
import {
  getLangCode,
  getReverseLangCode,
  resolvePostLocale
} from '@/functions/checkout/commonUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import {getTranslation} from '@/functions/utility'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import getSupportProductsByCategory from '@/functions/wordpress/products/getSupportProductsByCategory'
import client from '@/lib/next-api/connectorWoo'
import {CATEGORY_SLUGS} from '@/lib/wordpress/categories/queryCategorySlug'
import {querySupportProductByCategory} from '@/lib/wordpress/products/querySupportProductByCategory'
import querySupportFAQsByCategory from '@/lib/wordpress/support/querySupportFAQsByCategory'
import {useWordPressContext} from 'components/common/WordPressProvider'
import {isEmpty} from 'lodash'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import styles from './category.module.scss'

// Define route post type.
const postType = 'globalpageconfig'
/**
 * Render the Support Category component.
 *
 * @author DAP
 * @param  {object}  props Props
 * @return {Element}       The Support Category component.
 */
export default function SupportCategory(props) {
  const router = useRouter()
  const activePageConfig = resolvePostLocale(router.locale, props)
    ?.globalPageConfig?.supportProduct //A solution to see if the post/page translation issue is sorted
  const {productData, post, faqData, slug} = props
  const {headlessConfig} = useWordPressContext()
  const formatProducts = (categoryData, slug) => {
    var productList = categoryData?.products?.edges?.map((item) => {
      return {
        name: item?.node?.name,
        slug: item?.node?.slug,
        image: {
          mediaItemUrl: item?.node?.featuredImage?.node?.mediaItemUrl,
          altText: item?.node?.featuredImage?.node?.altText
        },
        otherCategories: item?.node?.productCategories?.nodes,
        category: {
          slug: slug
        }
      }
    })

    return productList?.filter((a) =>
      a?.otherCategories?.find((x) => x.slug === slug)
    )
  }

  //This will take of refreshing the products when language is changed
  useEffect(() => {
    setProducts(formatProducts(productData, slug))
  }, [productData, slug])

  const [isFetchProducts, setIsFetchProducts] = useState(false)
  const [productPageInfo, setProductPageInfo] = useState(
    productData?.products?.pageInfo
  )
  const category = productData?.productCategory
  const [products, setProducts] = useState(formatProducts(productData, slug))
  var breadcrumbs = []
  breadcrumbs.push({
    text: getTranslation(headlessConfig, 'SUPPORT'),
    url: '/support'
  })
  if (slug) breadcrumbs.push({text: category.name, url: `/support/${slug}`})

  const openProduct = (slug) => {
    router.push(`/support/${slug}`)
  }

  const handleLoadMoreProducts = async () => {
    setIsFetchProducts(true)
    await getSupportProductsByCategory(
      slug,
      productPageInfo.endCursor,
      getLangCode(router.locale)
    )
      .then((response) => {
        var pageInfo = response?.data?.products?.pageInfo
        if (pageInfo?.endCursor) {
          var newProducts = JSON.parse(JSON.stringify(products))
          var moreProducts = formatProducts(response?.data, slug)
          moreProducts.map((value) => {
            newProducts.push(value)
          })
          setProducts(newProducts)
          setProductPageInfo(pageInfo)
          setIsFetchProducts(false)
        }
      })
      .catch((error) => {
        console.error(error)
        setIsFetchProducts(false)
      })
  }

  return (
    <LayoutNew seo={{...post?.seo}}>
      <SupportHero
        heading={getTranslation(headlessConfig, 'SUPPORT')}
        sub_heading={getTranslation(headlessConfig, 'SUPPORT_INTRO')}
        language={getLangCode(router.locale).toLowerCase()}
      />
      {products ? (
        <>
          <Container className={`${styles.artifacts}`}>
            {!!breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
            {products && (
              <>
                <ProductCategoryGrid
                  header={getTranslation(headlessConfig, 'SELECT_PRODUCT')}
                  items={products}
                  itemOnClick={openProduct}
                  skeletonTileCount={8}
                  hasNextPage={productPageInfo?.hasNextPage}
                  appendLoading={isFetchProducts}
                  handleLoadMoreItem={handleLoadMoreProducts}
                  type="PRODUCT"
                />
              </>
            )}
          </Container>
          {faqData && faqData.length > 0 && (
            <FAQSection
              heading={
                activePageConfig?.faqSection?.header &&
                (activePageConfig?.faqSection?.header).replace(
                  '[PRODUCT]',
                  category?.name
                )
              }
              faqs={faqData.map((item) => {
                return item?.node
              })}
              cta={activePageConfig?.faqSection?.cta}
              defaultCtaText={getTranslation(headlessConfig, 'READ_MORE')}
            />
          )}
          <AcfSupportContactSection
            heading={activePageConfig?.supportContactSection?.header}
            copy={activePageConfig?.supportContactSection?.copy}
            items={activePageConfig?.supportContactSection?.items.map(
              (item) => {
                return {
                  link: item.link,
                  linkType: item.linkType,
                  title: item.title,
                  imageMeta: {
                    altText: item.image?.altText,
                    mediaItemUrl: item.image?.mediaItemUrl
                  }
                }
              }
            )}
          />
          <A2LASection
            heading={activePageConfig?.a2laSection?.header}
            cta={activePageConfig?.a2laSection?.cta}
            image={activePageConfig?.a2laSection?.image}
            defaultCtaText={getTranslation(headlessConfig, 'SEE_A2_DOC')}
          />
          <AcfContactForm
            message_heading={activePageConfig?.contactFormSection?.header}
            message_copy={activePageConfig?.contactFormSection?.subheader}
            message_submit_text={getTranslation(headlessConfig, 'SUBMIT')}
            showLocation={false}
          />
          <AcfNewsletterForm
            section_copy={activePageConfig?.newsLetterSection?.subheader}
            section_heading={activePageConfig?.newsLetterSection?.header}
            signup_opt_in_text={
              activePageConfig?.newsLetterSection?.signupOptInText
            }
          />
        </>
      ) : (
        <Container>
          <PageNotifications
            message="Unable to load products in category"
            type="ERROR"
            open={true}
          />
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
    query: CATEGORY_SLUGS
  })

  const pathsData = []

  data?.productCategories?.nodes &&
    data?.productCategories?.nodes.map((category) => {
      if (!isEmpty(category?.slug)) {
        pathsData.push({
          params: {slug: category?.slug},
          locale: getReverseLangCode(category?.language?.locale)
        })
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
    locale
  } = context
  const {data: productData} = await client.query({
    query: querySupportProductByCategory,
    variables: {
      category: slug,
      after: null,
      slug: slug,
      language: getLangCode(locale)
    }
  })

  const {data: faqData} = await client.query({
    query: querySupportFAQsByCategory,
    variables: {limit: 4, slug: slug}
  })

  const postData = await getPostTypeStaticProps(
    {slug: 'category'},
    postType,
    false,
    null,
    getLangCode(locale)
  )

  return {
    props: {
      ...postData?.props,
      faqData: faqData?.supportFaqs?.edges || {},
      productData: productData || {},
      slug: slug
    },
    revalidate: Number(process.env.NEXT_STATIC_PROPS_REVALIDATE)
  }
}

SupportCategory.propTypes = {
  ...getPagePropTypes(postType)
}
