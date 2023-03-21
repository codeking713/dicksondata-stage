import {initializeWpApollo} from '@/lib/wordpress/connector'
import {PRODUCT_BY_ID_QUERY} from '@/lib/wordpress/products/queryProductByproductId'

/**
 * Retrieve product details by ID.
 *
 * @author DAP
 * @param  {number} id The product's database ID.
 * @return {object}    Object containing Apollo client instance and post data or error object.
 */
export default async function getProductByID(id) {
  // No ID? Bail...
  if (!id) {
    return {}
  }

  // Get/create Apollo instance.
  const apolloClient = initializeWpApollo()

  // Execute query.
  const product = await apolloClient
    .query({
      query: PRODUCT_BY_ID_QUERY,
      variables: {
        id: id
      }
    })
    .then((product) => {
      return product?.data?.product ?? null
    })
    .catch((error) => {
      return {
        isError: true,
        message: error.message
      }
    })

  return product
}
