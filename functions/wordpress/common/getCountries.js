import {initializeWpApollo} from '@/lib/wordpress/connector'
import queryCountries from '@/lib/wordpress/_query-partials/getCountries'

/**
 * Get customer shipping data from WPGraphQL.
 *
 * @author DAP
 * @return {object} Country list.
 */
export default async function getCountries() {
  const apolloClient = initializeWpApollo()

  return apolloClient
    .query({
      query: queryCountries
    })
    .then((response) => response)
    .catch((error) => {
      return {
        error: true,
        errorMessage: error.message
      }
    })
}
