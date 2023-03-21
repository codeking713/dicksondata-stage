import {initializeWpApollo} from '@/lib/wordpress/connector'
import {PRODUCT_TAGS_LIST} from '@/lib/wordpress/filters/queryFilter'

/**
 * Retrieve getProductTags
 *
 * @author DAP
 * @return {object} Object containing Apollo client instance and post data or error object.
 */
export default async function getProductTags() {
  // Get/create Apollo instance.
  const apolloClient = initializeWpApollo()

  // Execute query.
  const productTags = await apolloClient
    .query({
      query: PRODUCT_TAGS_LIST
    })
    .then((productTags) => {
      return productTags?.data?.productTags ?? null
    })
    .catch((error) => {
      return {
        isError: true,
        message: error.message
      }
    })

  return productTags
}
