import PageNotifications from '@/components/molecules/PageNotifications'
import ProfileDashboardSkeleton from '@/components/organisms/ProfileDashboard/Skeleton/ProfileDashboardSkeleton'
import getUserInfo from '@/functions/wordpress/profile/getUserInfo'
import {signOut, useSession} from 'next-auth/client'
import {useEffect, useState} from 'react'
import styles from './ProductDashboard.module.scss'

/**
 * Render the ProfileDasboard component.
 *
 * @param  {object}   props           ProfileDashboard component props.
 * @param  {Function} props.changeTab callback to change tabs as per link type
 * @author DAP
 * @return {Element}                  The ProfileDashboard component.
 */
const ProfileDashboard = ({changeTab}) => {
  const [session] = useSession()
  const [loading, setLoading] = useState(true)
  const [formNickname, setFormNickname] = useState()
  const [formUsername, setFormUsername] = useState()
  const [dashboardNotification, setDashboardNotification] = useState()

  useEffect(() => {
    /**
     * Invoke Get User Info
     */
    async function invokeGetUserInfo() {
      await getUserInfo(session?.user.accessToken, session?.user.id)
        .then((response) => {
          setFormNickname(response.data.user.nickname)
          setFormUsername(response.data.user.username)
          setLoading(false)
        })
        .catch((e) => {
          console.error(e)
          setDashboardNotification({
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

  const getDisplayName = () => {
    var displayName = ''
    if (formNickname) {
      displayName = formNickname
    } else {
      displayName = formUsername
    }

    return displayName?.trim()
  }

  return (
    <>
      {loading ? (
        <ProfileDashboardSkeleton />
      ) : (
        <div className={styles.container}>
          <PageNotifications
            {...dashboardNotification}
            closeNotification={() => setDashboardNotification(null)}
            className={styles['section--notification']}
          />
          <h4>
            Hello {getDisplayName()} - not {getDisplayName()}?{' '}
            <span onClick={signOut} className={styles.container__link}>
              {' '}
              Log out{' '}
            </span>
          </h4>

          <p>
            From your account dashboard you can view your{' '}
            <span
              onClick={() => changeTab('/my-account/orders')}
              className={styles.container__link}
            >
              recent orders
            </span>{' '}
            manage your{' '}
            <span
              onClick={() => changeTab('/my-account/addresses')}
              className={styles.container__link}
            >
              {' '}
              shipping and billing addresses
            </span>
            , and{' '}
            <span
              onClick={() => changeTab('/my-account/account-details')}
              className={styles.container__link}
            >
              {' '}
              edit your password and account details
            </span>
          </p>
        </div>
      )}
    </>
  )
}

export default ProfileDashboard
