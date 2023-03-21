import {initializeWpApollo} from '@/lib/wordpress/connector'
import queryStates from '@/lib/wordpress/_query-partials/getStates'

/**
 * Get customer shipping data from WPGraphQL.
 *
 * @author DAP
 * @param  {string} token       Logged-in user auth token.
 * @param           countryCode
 * @param  {string} id          User's id.
 * @return {object}             Post data or error object.
 */
export default async function getStates(countryCode) {
  const apolloClient = initializeWpApollo()

  return apolloClient
    .query({
      query: queryStates,
      variables: {countryCode: countryCode || ''}
    })
    .then((response) => response)
    .catch((error) => {
      return {
        error: true,
        errorMessage: error.message
      }
    })
}
