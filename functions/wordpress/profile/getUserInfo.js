import {initializeWpApollo} from '@/lib/wordpress/connector'
import queryUserInfo from '@/lib/wordpress/user/queryUserInfo'

/**
 * Get customer shipping data from WPGraphQL.
 *
 * @author DAP
 * @param  {string} token Logged-in user auth token.
 * @param  {string} id    User's id.
 * @return {object}       Post data or error object.
 */
export default async function getUserInfo(token, id) {
  const apolloClient = initializeWpApollo()

  return apolloClient
    .query({
      query: queryUserInfo,
      fetchPolicy: 'network-only',
      variables: {id},
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error(error)
      return {
        error: true,
        errorMessage: error.message
      }
    })
}
