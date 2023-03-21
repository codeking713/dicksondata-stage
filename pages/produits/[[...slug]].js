import {getLangCode} from '@/functions/checkout/commonUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import {formatProductTagsByCategory} from '@/functions/product/productUtil'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import client from '@/lib/next-api/connectorWoo'
import {PRODUCT_CATEGORIES} from '@/lib/wordpress/filters/queryCategories'
import {PRODUCT_TAGS_LIST} from '@/lib/wordpress/filters/queryFilter'
import queryGlobalProductPage from '@/lib/wordpress/pages/queryGlobalProductPage'
import {isEmpty} from 'lodash'
import ProductsPage from '../products/[[...slug]]'

// Define route post type.
const postType = 'globalpageconfig'

/**
 * Render the ProductsPage component.
 *
 * @author DAP
 * @param  {object}  props                 The component attributes as props.
 * @param  {Array}   props.productTags     The product tags list
 * @param  {Array}   props.productDataList Category wise products
 * @param  {object}  props.pageConfig      Page configuration
 * @param  {string}  props.slug            Slug
 * @param  {object}  props.post            Post data from WordPress.
 * @return {Element}                       The ProductsPage component.
 */
export default function ProduitsPage({
  post,
  productDataList,
  productTags,
  pageConfig,
  slug
}) {
  return (
    <ProductsPage
      post={post}
      productDataList={productDataList}
      productTags={productTags}
      pageConfig={pageConfig}
      slug={slug}
    />
  )
}

/**
 * Get post static props.
 *
 * @param  {object} props             Get post static props
 * @param  {any}    props.params      Params
 * @param  {any}    props.params.slug Slug
 * @param  {string} props.locale      Locale
 * @author DAP
 * @return {object}                   Post props.
 */
export async function getStaticProps({params: {slug = null}, locale}) {
  const postData = await getPostTypeStaticProps(
    {slug: 'products'},
    postType,
    false,
    null,
    getLangCode(locale)
  )
  const pageConfig = postData?.props?.globalPageConfig
  if (!pageConfig || !pageConfig.categories)
    return {
      props: {
        post: postData || {}
      }
    }

  const {data: productTagsData} = await client.query({
    query: PRODUCT_TAGS_LIST
  })
  const categories = pageConfig?.categories?.map(
    (obj) => obj.category.databaseId
  )
  const {data: productDataList} = await client.query({
    query: PRODUCT_CATEGORIES,
    variables: {categoryIDs: categories}
  })

  return {
    props: {
      pageConfig: pageConfig || {},
      productDataList: productDataList?.productCategories?.nodes || {},
      tags: productTagsData?.productTags?.nodes,
      productTags:
        formatProductTagsByCategory(productTagsData?.productTags?.nodes) || {},
      ...postData?.props,
      slug
    },
    revalidate: Number(process.env.NEXT_STATIC_PROPS_REVALIDATE)
  }
}

ProduitsPage.propTypes = {
  ...getPagePropTypes(postType)
}

/**
 * Get post static paths.
 *
 * @author DAP
 * @return {object} Object consisting of array of paths and fallback setting.
 */
export async function getStaticPaths() {
  //Query only the selected categories
  const {data} = await client.query({
    query: queryGlobalProductPage,
    variables: {slug: 'products'}
  })

  const pathsData = []
  pathsData.push({params: {slug: null}})
  //We only need to get the category slugs configured on the products global post type. No need to waste resources by retriving all the product categories.
  data?.globalPageConfigBy?.globalPageConfig?.categories &&
    data.globalPageConfigBy.globalPageConfig.categories.map((cat) => {
      if (!isEmpty(cat?.category?.slug)) {
        pathsData.push({params: {slug: [cat.category?.slug]}})
      }
    })

  return {
    paths: pathsData,
    fallback: true
  }
}
