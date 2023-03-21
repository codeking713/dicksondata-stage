import {initializeWpApollo} from '@/lib/wordpress/connector'
import {queryProductCountByCategory} from '@/lib/wordpress/products/queryProductCountByCategory'

/**
 * Retrieve count of product by category.
 *
 * @author DAP
 * @param  {string} category Category name.
 * @return {object}          The object returning data or error.
 */
export default async function getProductCountByCategory(category) {
  const apolloClient = initializeWpApollo()

  return apolloClient
    .query({
      query: queryProductCountByCategory,
      variables: {
        category
      }
    })
    .then((response) => response)
    .catch((error) => {
      return {
        error: true,
        errorMessage: error.message
      }
    })
}
