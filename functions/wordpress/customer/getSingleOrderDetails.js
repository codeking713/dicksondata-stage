import {initializeWpApollo} from '@/lib/wordpress/connector'
import querySingleOrderDetails from './../../../lib/wordpress/customer/querySingleOrderDetails'

/**
 * Get single order details from WPGraphQL.
 *
 * @author DAP
 * @param  {string} token   Logged-in user auth token.
 * @param  {number} orderID Order id.
 * @return {object}         Post data or error object.
 */
export default async function getSingleOrderDetails(token, orderID) {
  const apolloClient = initializeWpApollo()

  return apolloClient
    .query({
      query: querySingleOrderDetails,
      variables: {orderID},
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
