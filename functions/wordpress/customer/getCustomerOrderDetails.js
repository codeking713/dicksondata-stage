import {initializeWpApollo} from '@/lib/wordpress/connector'
import queryCustomerOrderDetails from '@/lib/wordpress/customer/queryCustomerOrderDetails'

/**
 * Get customer order details from WPGraphQL.
 *
 * @author DAP
 * @param  {string} token Logged-in user auth token.
 * @return {object}       Post data or error object.
 */
export default async function getCustomerOrderDetails(token) {
  const apolloClient = initializeWpApollo()

  return apolloClient
    .query({
      query: queryCustomerOrderDetails,
      fetchPolicy: 'network-only',
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
