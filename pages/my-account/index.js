import Container from '@/components/atoms/Container'
import Text from '@/components/atoms/Inputs/Text'
import RichText from '@/components/atoms/RichText'
import LayoutNew from '@/components/common/LayoutNew'
import Form from '@/components/molecules/Form'
import PageNotifications from '@/components/molecules/PageNotifications'
import SectionHead from '@/components/molecules/SectionHead'
import Login from '@/components/organisms/Login'
import UserAccount from '@/components/organisms/UserAccount'
import {getLangCode} from '@/functions/checkout/commonUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import cn from 'classnames'
import {signIn, useSession} from 'next-auth/client'
import React, {useEffect, useState} from 'react'
import styles from '../../styles/my-account.module.scss'

// Define route post type.
const postType = 'page'

/**
 * Render the My-Account component.
 *
 * @param  {object}  props      The component attributes as props.
 * @param  {object}  props.post Post data from WordPress.
 * @return {Element}            The My-Account component.
 */
export default function MyAccount({post}) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [registerNotification, setRegisterNotification] = useState(null)
  const [session, loading] = useSession()

  /* Redirect to Profile page if user already logged in.*/
  useEffect(() => {
    session && session.user ? setLoggedIn(true) : setLoggedIn(false)
  }, [session, loggedIn])

  const handleRegister = async ({email}) => {
    setRegisterNotification(null)
    const response = await signIn('wpRegister', {
      email: email,
      username: email,
      password: null,
      redirect: false
    })
    if (response.error) {
      setRegisterNotification({
        type: 'ERROR',
        message: response.error,
        open: true
      })
    } else {
      setRegisterNotification({
        type: 'SUCCESS',
        message:
          'Registration successful. Please check your email for next steps',
        open: true
      })
    }
  }

  if (loading) {
    return (
      <LayoutNew seo={{...post?.seo}}>
        <Container></Container>
      </LayoutNew>
    )
  }

  return (
    <LayoutNew seo={{...post?.seo}}>
      {!loggedIn ? (
        <Container className={styles.container}>
          <div className={styles.container__sectionhead}>
            <SectionHead alignment="left" heading="My Account" />
          </div>
          <Login headerText="Login" className={styles.container__login} />
          <div className={styles.container__register}>
            <RichText className={styles.container__heading} tag="h3">
              Register
            </RichText>
            <Form
              formDefaults={{
                email: ''
              }}
              buttonText="Register"
              onSubmit={handleRegister}
              className={styles['container--form']}
            >
              <Text
                id="email"
                type="text"
                label="Email address"
                isRequired={true}
              />
              <span className={styles['container__label--gray']}>
                A password will be sent to your email address.
              </span>
              <span
                className={cn(
                  styles['container__label--terms'],
                  styles['container__label--gray']
                )}
              >
                By signing up, we use your personal data for the following
                information: your profile information and your user content and
                behavioral information. To learn more about how your personal
                data is used visit our{' '}
                <span className={styles['container__label--termslink']}>
                  privacy policy.
                </span>
              </span>
              <PageNotifications
                {...registerNotification}
                closeNotification={() => setRegisterNotification(null)}
              />
            </Form>
          </div>
        </Container>
      ) : (
        <UserAccount />
      )}
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
    'myAccount',
    false,
    null,
    getLangCode(locale)
  )
}

MyAccount.propTypes = {
  ...getPagePropTypes(postType)
}
