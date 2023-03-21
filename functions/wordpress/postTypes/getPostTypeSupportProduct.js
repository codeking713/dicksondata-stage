import processProductTypeQuery from '@/functions/wordpress/postTypes/processProductTypeQuery'
import {PRODUCT_SUPPORT_ARTIFACTS} from '@/lib/wordpress/support/queryProductSupportArtifacts'

/**
 * Retrieve single page set via Headless Config.
 *
 * @author DAP
 * @param  {string} slug   Page slug
 * @param  {object} params Parameters
 * @return {object}        Object containing Apollo client instance and post data or error object.
 */
export default async function getPostTypeSupportProduct(slug, params) {
  const data = await processProductTypeQuery(
    slug,
    PRODUCT_SUPPORT_ARTIFACTS,
    params,
    null
  )

  return data
}
