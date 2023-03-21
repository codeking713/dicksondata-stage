import {initializeWpApollo} from '@/lib/wordpress/connector'
import {querySupportProductByCategory} from '@/lib/wordpress/products/querySupportProductByCategory'

/**
 * Get product data by category from WPGraphQL.
 *
 * @author DAP
 * @param  {string} slug     Category slug
 * @param  {string} language Language
 * @param  {string} after    After hash for pagination
 * @return {object}          Product Data
 */
export default async function getSupportProductsByCategory(
  slug,
  after,
  language
) {
  const apolloClient = initializeWpApollo()

  return apolloClient
    .query({
      query: querySupportProductByCategory,
      variables: {category: slug, after: after, slug: slug, language: language}
    })
    .then((response) => response)
    .catch((error) => {
      return {
        error: true,
        errorMessage: error.message
      }
    })
}
