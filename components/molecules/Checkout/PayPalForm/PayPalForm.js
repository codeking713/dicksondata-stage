import {MaskedRange} from 'imask'
import PropTypes from 'prop-types'
import React from 'react'
import {IMaskInput} from 'react-imask'
import styles from './PayPalForm.module.scss'

/**
 * Render the PayPalForm component.
 *
 * @param  {object}   props                PayPalForm component props.
 * @param  {Function} props.setPayFlowData Handle change
 * @param  {object}   props.payFlowData    Data of pay flow form
 * @param  {string}   props.errorMessage   Error message
 * @return {Element}                       The PayPalForm component.
 */
export default function PayPalForm({
  setPayFlowData,
  errorMessage,
  payFlowData
}) {
  const INVALID_COLOR = {
    color: '#dc3545'
  }

  //Mask the Expiration Date
  return (
    <>
      <form className={styles['form-container']}>
        <div className={styles['field-container']} style={{width: '100%'}}>
          <p>Pay with your credit card.</p>
        </div>
        <div className={styles['field-container']} style={{width: '100%'}}>
          <label htmlFor="cardnumber">
            Card Number <span style={INVALID_COLOR}>*</span>
          </label>
          <input
            id={styles['cardnumber']}
            value={payFlowData?.acct || ''}
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            onChange={({target}) =>
              setPayFlowData((prevStates) => {
                return {
                  ...prevStates,
                  acct: target?.value || ''
                }
              })
            }
          />
        </div>
        <div
          className={`${styles['field-container']} ${styles['field-container-date']}`}
        >
          <label htmlFor="expirationdate">
            Expiration (mm/yy) <span style={INVALID_COLOR}>*</span>
          </label>
          <IMaskInput
            mask="`M/`Y" // enable number mask
            value={payFlowData?.expdate || ''}
            blocks={{
              M: {
                mask: MaskedRange,
                from: 0,
                to: 12,
                maxLength: 2
              },
              Y: {
                mask: MaskedRange,
                from: 0,
                to: 99,
                maxLength: 2
              }
            }}
            placeholder="00/00"
            onComplete={(value) =>
              setPayFlowData((prevStates) => {
                return {
                  ...prevStates,
                  expdate: value
                }
              })
            }
          />
        </div>
        <div
          className={`${styles['field-container']} ${styles['field-container-cvv']}`}
        >
          <label htmlFor="securitycode">
            CVV <span style={INVALID_COLOR}>*</span>
          </label>
          <input
            id={styles['securitycode']}
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            maxLength={4}
            max={9999}
            value={payFlowData?.cvv || ''}
            onChange={({target}) =>
              setPayFlowData((prevStates) => {
                return {
                  ...prevStates,
                  cvv: target?.value || ''
                }
              })
            }
          />
        </div>
        {!!Object.keys(payFlowData)?.length && !!errorMessage?.length && (
          <div className={styles['notification--error']}>{errorMessage}</div>
        )}
      </form>
    </>
  )
}

PayPalForm.propTypes = {
  paymentMethod: PropTypes.oneOf([
    'custom_paypal_gateway',
    'custom_po_gateway'
  ]),
  setPayFlowData: PropTypes.func
}
