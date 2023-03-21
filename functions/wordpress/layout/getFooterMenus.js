import {initializeWpApollo} from '@/lib/wordpress/connector'
import queryMenuByLocation from '@/lib/wordpress/_query-partials/queryMenuByLocation'

/**
 * Get menu data for footer from WPGraphQL.
 *
 * @author DAP
 * @return {object} Post data or error object.
 */
export default async function getFooterMenus() {
  const apolloClient = initializeWpApollo()

  return apolloClient
    .query({
      query: queryMenuByLocation
    })
    .then((response) => response)
    .catch((error) => {
      return {
        error: true,
        errorMessage: error.message
      }
    })
}
