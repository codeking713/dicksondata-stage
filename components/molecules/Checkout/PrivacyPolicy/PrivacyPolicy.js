import Link from 'next/link'
import React from 'react'
import styles from './PrivacyPolicy.module.scss'

/**
 * Render the PrivacyPolicy component.
 *
 * @return {Element} The PrivacyPolicy component.
 */
export default function PrivacyPolicy() {
  return (
    <div className={styles.policy}>
      Your personal data will be used to process your order, support your
      experience throughout this website, and for other purposes described in
      our{' '}
      <Link href="/privacy-policy">
        <a target="_blank">privacy policy</a>
      </Link>
    </div>
  )
}

PrivacyPolicy.propTypes = {}
