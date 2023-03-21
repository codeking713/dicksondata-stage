import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import {Text} from '@/components/atoms/Inputs'
import LayoutNew from '@/components/common/LayoutNew'
import Form from '@/components/molecules/Form'
import PageNotifications from '@/components/molecules/PageNotifications'
import SectionHead from '@/components/molecules/SectionHead'
import {getLangCode} from '@/functions/checkout/commonUtil'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import updateUserPassword from '@/functions/wordpress/profile/updateUserPassword'
import {useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import {useState} from 'react'
import styles from './reset.module.scss'
import LostPasswordSkeleton from './Skeleton/LostPasswordSkeleton'

/**
 * Render the ResetPassword component.
 *
 * @author DAP
 * @return {Element} The ResetPassword component.
 */
export default function ResetPassword() {
  const [session] = useSession()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [resetPasswordNotification, setResetPasswordNotification] =
    useState(null)

  const handleUpdatePassword = async ({newPassword, confirmPassword}) => {
    const {key, login} = router.query

    setResetPasswordNotification(null)

    if (!key || !login) {
      setResetPasswordNotification({
        type: 'ERROR',
        message: 'Invalid URL',
        open: true
      })
    } else if (newPassword !== confirmPassword) {
      setResetPasswordNotification({
        type: 'ERROR',
        message: 'Passwords do not match',
        open: true
      })
    } else {
      setLoading(true)
      const token = session?.user.accessToken
      await updateUserPassword(token, key, login, newPassword).then(
        (response) => {
          if (response.error) {
            setResetPasswordNotification({
              type: 'ERROR',
              message: response.errorMessage,
              open: true
            })
          } else {
            setResetPasswordNotification({
              type: 'SUCCESS',
              message:
                'Your password has been successfully reset. Please login.',
              open: true
            })
          }
          setLoading(false)
        }
      )
    }
  }

  return (
    <LayoutNew>
      <Container>
        <div className={styles.reset}>
          <Form
            id="forget-form"
            title="Forget Form"
            buttonText="Reset Password"
            onSubmit={handleUpdatePassword}
            showSubmitButton={false}
          >
            <SectionHead
              heading="Reset Your Password"
              className={styles.reset__heading}
              alignment="left"
            />
            {loading ? (
              <LostPasswordSkeleton />
            ) : (
              <>
                <PageNotifications
                  {...resetPasswordNotification}
                  closeNotification={null}
                />
                {resetPasswordNotification?.type === 'SUCCESS' ? (
                  <Button
                    text="Login"
                    type="primary"
                    size="sm"
                    className={styles.reset__btn}
                    isSubmit={false}
                    url="/my-account"
                  />
                ) : (
                  <>
                    <p>Enter your new password</p>
                    <Text
                      id="newPassword"
                      label="New Password"
                      isRequired
                      type="password"
                      className={styles.reset__input}
                    />
                    <Text
                      id="confirmPassword"
                      label="Confirm Password"
                      isRequired
                      type="password"
                      className={styles.reset__input}
                    />
                    <Button
                      text="Reset Password"
                      type="primary"
                      size="sm"
                      className={styles.reset__btn}
                      isSubmit={true}
                    />
                  </>
                )}
              </>
            )}
          </Form>
        </div>
      </Container>
    </LayoutNew>
  )
}

/**
 * Get post static props.
 *
 * @author DAP
 * @param  {object} context        Context for current post.
 * @param  {string} context.locale Locale
 * @return {object}                Post props.
 */
export async function getStaticProps({locale}) {
  return await getPostTypeStaticProps(
    null,
    'resetPassword',
    false,
    null,
    getLangCode(locale)
  )
}
