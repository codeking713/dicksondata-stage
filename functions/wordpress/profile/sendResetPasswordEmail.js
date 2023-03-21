import {initializeWpApollo} from '@/lib/wordpress/connector'
import resetPasswordEmail from '@/lib/wordpress/user/resetPasswordEmail'

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
 * @param  {string} username Usrename of the user.
 * @param  {string} token    Logged-in user auth token.
 * @return {object}          User data or error object.
 */
export default async function sendResetPasswordEmail(username, token) {
  // Get/create Apollo instance.
  const apolloClient = initializeWpApollo()

  // Set up return object.
  const response = {
    apolloClient
  }

  // Determine query variables.
  const variables = {
    username
  }

  try {
    // Execute query.
    const user = await apolloClient.mutate({
      mutation: resetPasswordEmail,
      variables,
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    })

    // Set error props if data not found.
    if (!user.data) {
      response.error = true
      response.errorMessage =
        'An error occurred while trying to send password reset email'
      return
    }
    response.error = false
  } catch (error) {
    response.error = true
    response.errorMessage = error.message
  }

  return response
}
