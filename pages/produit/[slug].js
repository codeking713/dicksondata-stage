import {getLangCode} from '@/functions/checkout/commonUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import client from '@/lib/next-api/connectorWoo'
import {queryProductAddons} from '@/lib/wordpress/products/queryProductAddons'
import {PRODUCT_SLUGS} from '@/lib/wordpress/products/queryProductBySlug'
import {isEmpty} from 'lodash'
import ProductPost from '../product/[slug]'

// Define route post type.
const postType = 'product'

/**
 * Render the ProductPost component.
 *
 * @author DAP
 * @param  {object}  props                       The component attributes as props.
 * @param  {object}  props.post                  Product data from WooComerce.
 * @param  {Array}   props.productAddons         Product addons
 * @param  {object}  props.supportContactSection Global support contact data.
 * @return {Element}                             The ProductPost component.
 */
export default function ProduitPost({
  post,
  supportContactSection,
  productAddons
}) {
  return (
    <ProductPost
      post={post}
      supportContactSection={supportContactSection}
      productAddons={productAddons}
    />
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

  const postData = await getPostTypeStaticProps(
    {slug: slug},
    postType,
    false,
    null,
    getLangCode(locale),
    getLangCode(defaultLocale)
  )

  const supportData = await getPostTypeStaticProps(
    {slug: 'support-product'},
    'globalpageconfig',
    false,
    null,
    getLangCode(locale)
  )

  //Consolidate all product id's including the ids of sub products
  //Important: If the addons belong composite product children, we will need to add the composite databaseId also into the addon, for identification purposes
  //If we do not do this, if the same product falls into 2 composite parents we will not be able to uniquely identify them.
  //For composit product addons, we send the the array data in the following format
  //productdatabaseid-compositdatabaseid
  const addonProductIds = []
  if (
    postData?.props?.post?.type === 'SIMPLE' ||
    postData?.props?.post?.type === 'VARIABLE'
  ) {
    addonProductIds.push(postData?.props?.post?.productId)
  }

  postData?.props?.post?.compositeComponents?.map((comp) => {
    comp?.options?.nodes?.map((prod) => {
      addonProductIds.push(`${prod?.databaseId}-${comp.databaseId}`)
    })
  })

  //Get the product id of bundle children
  //consolidate the product id's of bundled products
  postData?.props?.post?.bundleItems?.edges?.map((bundleItem) => {
    addonProductIds.push(
      `${bundleItem?.node?.databaseId}-${bundleItem.databaseId}`
    )
  })

  const {data: addons} = await client.query({
    query: queryProductAddons,
    variables: {
      productIds: addonProductIds.join(',')
    }
  })

  return {
    props: {
      ...postData?.props,
      productAddons: addons.productAddOns.addons,
      supportContactSection:
        supportData?.props?.globalPageConfig?.supportProduct
          ?.supportContactSection || {}
    },
    revalidate: Number(process.env.NEXT_STATIC_PROPS_REVALIDATE),
    notFound: postData?.notFound
  }
}

ProduitPost.propTypes = {
  ...getPagePropTypes(postType)
}
