import {initializeWpApollo} from '@/lib/wordpress/connector'
import {SUPPORT_PRODUCT_SEARCH} from '@/lib/wordpress/support/querySupportProductSearch'

/**
 * Get products with support artifacts.
 *
 * @author DAP
 * @param  {string} language   Language
 * @param  {string} searchText Search Text
 * @return {object}            Product Data
 */
export default async function getSupportProducts(searchText, language) {
  const apolloClient = initializeWpApollo()

  return apolloClient
    .query({
      query: SUPPORT_PRODUCT_SEARCH,
      fetchPolicy: 'network-only',
      variables: {
        searchText,
        language
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
