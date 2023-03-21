import {initializeWpApollo} from '@/lib/wordpress/connector'
import mutationUpdateCustomerBilling from '@/lib/wordpress/user/mutationUpdateCustomerBilling'

/**
 *
 * Update the customer's information. Follows established WordPress
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
 * @param  {string} firstName First name of the user.
 * @param  {string} lastName  Last name of the user.
 * @param  {string} company   Company of the user.
 * @param  {string} address1  Address1 of the user.
 * @param  {string} address2  Address2 of the user.
 * @param  {string} postcode  Post code of the user.
 * @param  {string} city      City of the user.
 * @param  {string} country   Country of the user.
 * @param  {string} email     Email of the user.
 * @param  {string} state     State of the user.
 * @param  {string} phone     Phone of the user.
 * @return {object}           User data or error object.
 */
export default async function updateCustomerBilling(
  token,
  id,
  firstName,
  lastName,
  company,
  address1,
  address2,
  postcode,
  city,
  country,
  email,
  state,
  phone
) {
  // Get/create Apollo instance.
  const apolloClient = initializeWpApollo()

  // Set up return object.
  const response = {
    apolloClient
  }

  // Determine query variables.
  const variables = {
    id,
    firstName,
    lastName,
    company,
    address1,
    address2,
    postcode,
    city,
    country,
    email,
    state,
    phone
  }

  try {
    // Execute query.
    /* eslint-disable */
    const user = await apolloClient.mutate({
      mutation: mutationUpdateCustomerBilling,
      variables,
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    })
    /* eslint-enable */

    response.error = false
  } catch (error) {
    response.error = true
    response.errorMessage = error.message
  }

  return response
}
