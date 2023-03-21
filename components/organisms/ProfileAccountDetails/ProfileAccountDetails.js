import Text from '@/components/atoms/Inputs/Text'
import Form from '@/components/molecules/Form'
import PageNotifications from '@/components/molecules/PageNotifications'
import getUserInfo from '@/functions/wordpress/profile/getUserInfo'
import updateUserProfile from '@/functions/wordpress/profile/updateUserProfile'
import {useSession} from 'next-auth/client'
import {useEffect, useState} from 'react'
import styles from './ProfileAccountDetails.module.scss'
import ProfileAccountDetailsSkeleton from './Skeleton/ProfileAccountDetailsSkeleton'
/**
 * Render the ProfileAccountDetails component.
 *
 * @author DAP
 * @return {Element} The ProfileAccountDetails component.
 */
export default function ProfileAccountDetails() {
  const [session] = useSession()
  // Form Defaults
  const [loading, setLoading] = useState(true)
  const [formNickname, setFormNickname] = useState('')
  const [formFirstName, setFormFirstName] = useState('')
  const [formLastName, setFormLastName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [accountDetailNotification, setAccountDetailNotification] =
    useState(null)

  useEffect(() => {
    /**
     * Invoke Get User Info
     */
    async function invokeGetUserInfo() {
      await getUserInfo(session?.user.accessToken, session?.user.id)
        .then((response) => {
          setFormFirstName(response.data.user.firstName ?? '')
          setFormLastName(response.data.user.lastName ?? '')
          setFormEmail(response.data.user.email ?? '')
          setFormNickname(response.data.user.nickname ?? '')
          setLoading(false)
        })
        .catch((e) => {
          console.error(e)
          setAccountDetailNotification({
            type: 'ERROR',
            message: 'Something went wrong. unable to retrive user information',
            open: true
          })
          setLoading(false)
        })
    }
    invokeGetUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async ({
    formFirstName,
    formLastName,
    formEmail,
    formDisplayName,
    formNewPassword,
    formConfirmPassword
  }) => {
    setAccountDetailNotification(null)
    if (formNewPassword !== formConfirmPassword) {
      setAccountDetailNotification({
        type: 'ERROR',
        message: 'New password and confirm password do not match',
        open: true
      })
      return
    }
    setLoading(true)
    const response = await updateUserProfile(
      session?.user.accessToken,
      session?.user.id,
      formFirstName,
      formLastName,
      formEmail,
      formDisplayName,
      formNewPassword
    )
    if (response.error) {
      //if the update fail, we display a error to the user
      setAccountDetailNotification({
        type: 'ERROR',
        message: response.errorMessage,
        open: true
      })
      setLoading(false)
    } else {
      //if the update is successful,
      //1. we need to update the session object with the new information - firstName, lastName, displayName, email
      setFormNickname(response.user.nickname)
      setFormFirstName(response.user.firstName)
      setFormLastName(response.user.lastName)
      setFormEmail(response.user.email)
      setLoading(false)

      //2. we show a update successful notification to the user
      setAccountDetailNotification({
        type: 'SUCCESS',
        message: 'Account was updated successfully',
        open: true
      })
    }
  }

  if (loading) return <ProfileAccountDetailsSkeleton />

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>Account Details</div>
      <PageNotifications
        {...accountDetailNotification}
        closeNotification={() => setAccountDetailNotification(null)}
        className={styles['section--notification']}
      />
      <Form
        shouldEnableReinitialize={true}
        formDefaults={{
          formDisplayName: `${formNickname}`,
          formFirstName: `${formFirstName}`,
          formLastName: `${formLastName}`,
          formEmail: `${formEmail}`
        }}
        className={styles.container__form}
        buttonText="Save changes"
        onSubmit={handleSubmit}
      >
        <div className={styles['container__input--flex']}>
          <Text id="formFirstName" label="First name" type="text" />
          <Text id="formLastName" label="Last name" type="text" />
        </div>

        <Text id="formDisplayName" label="Display name" type="text" />
        <p className={styles.container__note}>
          This will be how your name will be displayed in the account section
          and in reviews
        </p>
        <Text
          id="formEmail"
          label="Email address"
          type="email"
          isRequired={true}
        />
        <Text
          id="formCurrentPassword"
          label="Current Password (leave blank to leave unchanged)"
          type="password"
        />
        <Text
          id="formNewPassword"
          label="New Password (leave blank to leave unchanged)"
          type="password"
        />
        <Text
          id="formConfirmPassword"
          label="Confirm new password"
          type="password"
        />
      </Form>
    </div>
  )
}
