import Checkbox from '@/components/atoms/Inputs/Checkbox'
import Link from 'next/link'
import React from 'react'
import styles from './AcceptTermsConditions.module.scss'

/**
 * Render the AcceptTermsConditions component.
 *
 * @param  {object}   props                         AcceptTermsConditions component props.
 * @param  {boolean}  props.termConditionsAgreement Indicate if the terms are selected
 * @param  {Function} props.handleOnChange          Handle the terms conditions selection
 * @return {Element}                                The AcceptTermsConditions component.
 */
export default function AcceptTermsConditions({
  termConditionsAgreement,
  handleOnChange
}) {
  return (
    <div className={styles.agreement}>
      <Checkbox
        type="checkbox"
        label={
          <p>
            I have read and agree to the website
            <Link href="/terms-of-sale">
              <a target="_blank" className={styles.agreement__link}>
                terms and conditions
              </a>
            </Link>
            <span className={styles['agreement--required']}>*</span>
          </p>
        }
        id="agreeToTermsAndConditions"
        name="agreeToTermsAndConditions"
        checked={termConditionsAgreement}
        onChange={(e) => {
          handleOnChange(e)
        }}
      />
    </div>
  )
}

AcceptTermsConditions.propTypes = {}
