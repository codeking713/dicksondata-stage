import {initializeWpApollo} from '@/lib/wordpress/connector'
import mutationUpdateUser from '@/lib/wordpress/user/mutationUpdateUser'

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
 * @param  {string} token     Logged-in user auth token.
 * @param  {string} id        ID for the username.
 * @param  {string} firstName Firstname of the user.
 * @param  {string} lastName  Lastname of the user.
 * @param  {string} email     Email of the user.
 * @param  {string} nickname  Nickname of the user.
 * @param  {string} password  Password of the user.
 * @return {object}           User data or error object.
 */
export default async function updateUserProfile(
  token,
  id,
  firstName,
  lastName,
  email,
  nickname,
  password
) {
  // Get/create Apollo instance.
  const apolloClient = initializeWpApollo()

  // Set up return object.
  const response = {
    apolloClient
  }

  // Determine query variables.
  const variables = {
    lastName,
    email,
    nickname,
    id,
    firstName,
    password
  }

  try {
    // Execute query.
    const user = await apolloClient.mutate({
      mutation: mutationUpdateUser,
      variables,
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    })
    const {updateUser} = user.data

    // Set error props if data not found.
    if (!updateUser) {
      response.error = true
      response.errorMessage =
        'An error occurred while trying to update the user profile.'
      return
    }
    response.error = false
    response.user = updateUser.user
  } catch (error) {
    response.error = true
    response.errorMessage = error.message
  }

  return response
}
