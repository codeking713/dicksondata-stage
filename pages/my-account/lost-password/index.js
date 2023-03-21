import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import {Text} from '@/components/atoms/Inputs'
import LayoutNew from '@/components/common/LayoutNew'
import Form from '@/components/molecules/Form'
import PageNotifications from '@/components/molecules/PageNotifications'
import SectionHead from '@/components/molecules/SectionHead'
import {getLangCode} from '@/functions/checkout/commonUtil'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import sendResetPasswordEmail from '@/functions/wordpress/profile/sendResetPasswordEmail'
import {useState} from 'react'
import styles from './reset.module.scss'
import LostPasswordSkeleton from './Skeleton/LostPasswordSkeleton'

/**
 * Render the ResetLostPassword component.
 *
 * @author DAP
 * @return {Element} The ResetLostPassword component.
 */
export default function ResetLostPassword() {
  const [loading, setLoading] = useState(false)
  const [resetPasswordNotification, setResetPasswordNotification] =
    useState(null)
  const handleForgetPassword = async ({username}) => {
    setLoading(true)
    setResetPasswordNotification(null)

    //TODO: add validation
    const response = await sendResetPasswordEmail(username)

    if (response.error) {
      setResetPasswordNotification({
        type: 'ERROR',
        message: response.errorMessage,
        open: true
      })
    } else {
      setResetPasswordNotification({
        type: 'SUCCESS',
        message: 'A reset password link has been sent to your email address',
        open: true
      })
    }
    setLoading(false)
  }

  return (
    <LayoutNew>
      <Container>
        <div className={styles.reset}>
          <Form
            id="forget-form"
            title="Forget Form"
            buttonText="Reset Password"
            onSubmit={handleForgetPassword}
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
                  ''
                ) : (
                  <>
                    <p>
                      Lost your password? Please enter your username or email
                      address. You will receive a link to create a new password
                      via email.
                    </p>
                    <Text
                      id="username"
                      label="Username or email"
                      isRequired
                      type="text"
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
    'lostPassword',
    false,
    null,
    getLangCode(locale)
  )
}
