import processProductTypeQuery from '@/functions/wordpress/postTypes/processProductTypeQuery'
import {PRODUCT_BY_SLUG_QUERY} from '@/lib/wordpress/products/queryProductBySlug'

/**
 * Retrieve single product page.
 *
 * @author DAP
 * @param  {string} slug   Page slug
 * @param  {object} params Parameters
 * @return {object}        Object containing Apollo client instance and post data or error object.
 */
export default async function getPostTypeProduct(slug, params) {
  const data = await processProductTypeQuery(
    slug,
    PRODUCT_BY_SLUG_QUERY,
    {
      ...params
    },
    null
  )

  //Check if there is a translated version and override the default version with the relavent translated version

  return data
}
