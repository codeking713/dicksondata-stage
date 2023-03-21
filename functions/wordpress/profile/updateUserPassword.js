import {initializeWpApollo} from '@/lib/wordpress/connector'
import mutationResetPassword from '@/lib/wordpress/user/mutationResetPassword'

/**
 *
 * Update the user's information. Follows established WordPress
 * behavior for posting comments:
 *
 * If this is an authenticated request (i.e. "logged in"), the `author`
 * fields will be ignored in favor of the logged-in user's information.
 *
 * If comment moderation is turned on, the `data.createComment.comment`
 * object may be `null`. This does not necessarily indicate an error;
 * the comment may be held for moderation.
 *
 * If the comment does not need manual approval, it will be returned
 * with this query.
 *
 * @author DAP
 * @param  {string} token           Logged-in user auth token.
 * @param  {string} username        Usrename of the user.
 * @return {object}                 User data or error object.
 */
export default async function updateUserPassword(token, key, login, password) {
  // Get/create Apollo instance.
  const apolloClient = initializeWpApollo()

  // Set up return object.
  const response = {
    apolloClient
  }

  // Determine query variables.
  const variables = {
    key,
    login,
    password
  }

  try {
    // Execute query.
    const user = await apolloClient.mutate({
      mutation: mutationResetPassword,
      variables,
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    })

    response.error = false
  } catch (error) {
    response.error = true
    response.errorMessage = error.message
  }

  return response
}
