import Text from '@/components/atoms/Inputs/Text'
import RichText from '@/components/atoms/RichText'
import Form from '@/components/molecules/Form'
import PageNotifications from '@/components/molecules/PageNotifications'
import cn from 'classnames'
import {Field} from 'formik'
import {signIn} from 'next-auth/client'
import Link from 'next/link'
import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import styles from './Login.module.scss'

/**
 * Render the login component.
 *
 * @author DAP
 * @param  {object}   props                   Component props.
 * @param  {string}   props.headerText        Component header text
 * @param  {boolean}  props.isTwoColumnLayout Indicate whether to render 2 column or single column layout for fields
 * @param  {string}   props.className         Container tyle class
 * @param  {Function} props.openNotification  Notify parent if the notification panel is open
 * @return {Element}                          The login component.
 */

const Login = ({
  headerText,
  isTwoColumnLayout,
  className,
  openNotification
}) => {
  const [userName, setUserName] = useState('')
  const [loginNotification, setLoginNotification] = useState(null)
  // const [error, setError] = useState('')
  // const [message, setMessage] = useState('')
  const input = useRef(null)

  /* Fetches username from LocalStorage for formDefault */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('DicksonUserName')
      setUserName(item)
    }
  }, [setUserName])

  /* Login User Function */
  const handleLogin = async ({username, password, rememberMe}) => {
    setLoginNotification(null)
    rememberMe && localStorage.setItem('DicksonUserName', username)
    const response = await signIn('wpLogin', {
      username,
      password,
      redirect: false
    })

    if (response.error) {
      setLoginNotification({
        type: 'ERROR',
        message: response.error,
        open: true
      })
    }
  }

  return (
    <div className={className}>
      {headerText && (
        <RichText className={styles.container__heading} tag="h3">
          {headerText}
        </RichText>
      )}
      <Form
        formDefaults={{
          username: userName || '',
          password: ''
        }}
        onSubmit={handleLogin}
        buttonText="Log in"
        className={styles['container--form']}
        shouldEnableReinitialize={true}
      >
        <div
          className={`${styles.container__fields} ${
            isTwoColumnLayout && styles['container__fields--2col']
          }`}
        >
          <Text
            id="username"
            getDomElement={(element) => {
              input.current = element
            }}
            type="text"
            isRequired={true}
            label="Username or email"
          />
          <Text
            id="password"
            type="password"
            isRequired={true}
            label="Password"
          />
        </div>

        <div className={styles['container__checkbox--labels']}>
          <div>
            <Field type="checkbox" name="rememberMe" />
            <span
              className={cn(
                styles['container__label--padding'],
                styles['container__label--gray']
              )}
            >
              Remember me?
            </span>
          </div>
          <Link href="/my-account/lost-password">
            <a
              alt="Reset your lost password"
              title="Lost your password?"
              className={styles['container__label--bluebold']}
            >
              Lost your password?
            </a>
          </Link>
        </div>
        <PageNotifications
          {...loginNotification}
          closeNotification={() => setLoginNotification(null)}
          openNotification={openNotification}
        />
      </Form>
      <Link href="/my-account/lost-password">
        <a
          alt="Reset your lost password"
          title="Lost your password?"
          className={styles['container__label--mobile']}
        >
          Lost your password?
        </a>
      </Link>
    </div>
  )
}

Login.propTypes = {
  headerText: PropTypes.string,
  isTwoColumnLayout: PropTypes.bool,
  className: PropTypes.string
}

export default Login
