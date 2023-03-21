import {initializeWpApollo} from '@/lib/wordpress/connector'
import queryCustomerInfo from '@/lib/wordpress/user/queryCustomerInfo'

/**
 * Get customer shipping data from WPGraphQL.
 *
 * @author DAP
 * @param  {string} token Logged-in user auth token.
 * @param  {string} id    User's id.
 * @return {object}       Post data or error object.
 */
export default async function getCustomerInfo(token, id) {
  const apolloClient = initializeWpApollo()

  return apolloClient
    .query({
      query: queryCustomerInfo,
      fetchPolicy: 'network-only',
      variables: {id},
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
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
