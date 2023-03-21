import {Text} from '@/components/atoms/Inputs'
import Form from '@/components/molecules/Form'
import sendResetPasswordEmail from '@/functions/wordpress/profile/sendResetPasswordEmail'
import updateUserProfile from '@/functions/wordpress/profile/updateUserProfile'
import {getSession, useSession} from 'next-auth/client'
import {useState} from 'react'
import styles from './ProfileView.module.scss'

/**
 * Render the ProfileView component.
 *
 * @author DAP
 * @return {Element} The ProfileView component.
 */
const ProfileView = () => {
  const [message, setMessage] = useState('') // eslint-disable-line no-unused-vars
  const [error, setError] = useState('') // eslint-disable-line no-unused-vars
  const [disabled, setDisabled] = useState(true)
  const [buttonText, setButtonText] = useState('Update')
  const [session] = useSession()
  const {email, lastName, firstName, username} = session.user
  // Form Defaults
  const [formUsername, setFormUsername] = useState(username || '')
  const [formFirstName, setFormFirstName] = useState(firstName || '')
  const [formLastName, setFormLastName] = useState(lastName || '')
  const [formEmail, setFormEmail] = useState(email || '')
  const [userChanged, setUserChanged] = useState(false)

  /**
   * Handle user profile update.
   *
   * @author DAP
   * @param {object}   values                Form values.
   * @param {object}   actions               Formik form actions.
   * @param {Function} actions.setSubmitting Toggle form submitting state.
   */

  const handleChangeSubmit = async (values, {setSubmitting}) => {
    setDisabled(false)
    setButtonText('Submit')

    if (disabled) return

    const {username, firstName, lastName, email} = values

    const response = await updateUserProfile(
      session?.user.accessToken,
      session?.user.id,
      firstName,
      lastName,
      email,
      username
    )

    if (response?.error) {
      setMessage(response.errorMessage)
      setSubmitting(false)
      return
    }

    // if (response?.user) {
    // }

    setUserChanged(response.user)

    {
      const {username, firstName, lastName, email} = userChanged
      setFormUsername(username)
      setFormFirstName(firstName)
      setFormLastName(lastName)
      setFormEmail(email)
      setDisabled(true)
      setButtonText('Update')
      await getSession()
      setSubmitting(false)
    }
  }

  // Handle send password reset email.
  const handleForgetPasswordSubmit = () =>
    sendResetPasswordEmail(session?.user.accessToken, formUsername)

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.changeForm}>
          <div className={styles.formContainer}>
            <Form
              className={styles['login-form']}
              id="change-form"
              title="Change Form"
              buttonText={buttonText}
              formDefaults={{
                username: `${formUsername}`,
                firstName: `${formFirstName}`,
                lastName: `${formLastName}`,
                email: `${formEmail}`
              }}
              onSubmit={handleChangeSubmit}
            >
              <p>{error}</p>
              <Text
                className={styles.textfield}
                id="username"
                label="Username*"
                isDisabled={disabled}
                isRequired
                type="text"
              />
              <Text
                className={styles.textfield}
                id="firstName"
                label="First name*"
                isDisabled={disabled}
                isRequired
                type="text"
              />
              <Text
                className={styles.textfield}
                id="lastName"
                label="Last name*"
                isDisabled={disabled}
                isRequired
                type="text"
              />
              <Text
                className={styles.textfield}
                id="email"
                label="Email*"
                isDisabled={disabled}
                isRequired
                type="text"
              />
            </Form>
          </div>
        </div>
        <span className={styles.vl}></span>
        <div className={styles.forgetForm}>
          <div className={styles.formContainer}>
            <Form
              className={styles['login-form']}
              id="forget-form"
              title="Forget Form"
              buttonText="Reset Password"
              onSubmit={handleForgetPasswordSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileView
