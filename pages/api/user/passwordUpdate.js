import updateUserProfile from '@/functions/wordpress/profile/updateUserProfile'

/**
 * Update information of WP User.
 *
 * @author DAP
 * @param {object} req Instance of http.IncomingMessage.
 * @param {object} res Instance of http.ServerResponse.
 */
export default async function profileUpdate(req, res) {
  try {
    // Retrieve props from request body.
    const {firstname, lastname, username, id, email, token} = req.body

    // Basic check to see if the referer matches the host.
    // This is trivially easy to bypass, but it's a first step.
    if (
      !req.headers.referer ||
      !req.headers.referer.includes(req.headers.host)
    ) {
      throw new Error('Unauthorized access')
    }

    const profileUpdateResponse = await updateUserProfile(
      token,
      id,
      email,
      firstname,
      lastname,
      username
    )

    // Check for errors.
    if (profileUpdateResponse.error) {
      throw new Error(profileUpdateResponse.errorMessage)
    }

    // Remove Apollo client from return.
    delete profileUpdateResponse?.apolloClient

    res.status(200).send(profileUpdateResponse)
  } catch (error) {
    res
      .status(error?.status || 500)
      .end(
        error?.message ||
          'An error occurred while trying to update the profile information'
      )
  }
}
