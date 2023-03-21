import Radio from '@/components/atoms/Inputs/Radio'
import Text from '@/components/atoms/Inputs/Text'
import {getFieldID} from '@/functions/checkout/checkoutUtil'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import PayPalForm from '../PayPalForm'
import styles from './PaymentModes.module.scss'

/**
 * Render the PaymentModes component.
 *
 * @param  {object}   props                              PaymentModes component props.
 * @param  {string}   props.paymentMethod                The default/selected payment method
 * @param  {boolean}  props.showPOFields                 Display the PO fields
 * @param  {object}   props.payFlowData                  Data of pay flow form
 * @param  {object}   props.setPayFlowData               Set data of pay flow form
 * @param  {Function} props.handleOnPaymentModeChange    Handle change payment method type
 * @param  {string}   props.paypalPayflowErrorMessage    Error message of paypal payflow
 * @param  {Function} props.setPaypalPayFlowErrorMessage set paypal payflow error message
 * @param  {boolean}  props.enablePaypal                 Enable paypal option
 * @return {Element}                                     The PaymentModes component.
 */
export default function PaymentModes({
  paymentMethod,
  showPOFields,
  payFlowData,
  setPayFlowData,
  handleOnPaymentModeChange,
  paypalPayflowErrorMessage,
  setPaypalPayFlowErrorMessage,
  enablePaypal
}) {
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(paymentMethod)
  const formType = 'payment'
  const payFlowType = 'payFlow'
  const handlePaymentModeChange = (event) => {
    setPayFlowData({})
    setPaypalPayFlowErrorMessage('')
    setSelectedPaymentMode(event.target.value)
    handleOnPaymentModeChange(event.target.value)
  }

  return (
    <div className={styles.payments}>
      {enablePaypal && (
        <div
          key="custom_paypal_payflow_gateway"
          className={`${styles.payments__payment} ${
            'custom_paypal_payflow_gateway' === selectedPaymentMode &&
            styles['payments__payment-credit--selected']
          }`}
        >
          <Radio
            id={getFieldID('custom_paypal_payflow_gateway', payFlowType)}
            name={getFieldID('custom_paypal_gateway', payFlowType)}
            value="custom_paypal_payflow_gateway"
            checked={'custom_paypal_payflow_gateway' === selectedPaymentMode}
            label={
              <div className={styles['credit-label']}>
                <span className={styles['credit-label-text']}>Credit card</span>
                <div className={styles['credit-label-icon']}>
                  <img src="/images/visa.png" alt="visa" />
                  <img
                    src="/images/mastercard_logo.png"
                    alt="mastercard_logo"
                  />
                  <img src="/images/maestro.png" alt="maestro" />
                  <img src="/images/discover.png" alt="discover" />
                  <img
                    style={{width: '60px', height: '36px'}}
                    src="/images/american_express.png"
                    alt="american_express"
                  />
                </div>
              </div>
            }
            onChange={(event) => handlePaymentModeChange(event)}
            className={styles['payments__payment__selector--radio']}
          />
          <div className={styles.payments__payment__fields}>
            <PayPalForm
              setPayFlowData={setPayFlowData}
              payFlowData={payFlowData}
              errorMessage={paypalPayflowErrorMessage}
            />
          </div>
        </div>
      )}
      <div
        key="custom_po_gateway"
        className={`${styles.payments__payment} ${
          'custom_po_gateway' === selectedPaymentMode &&
          styles['payments__payment--selected']
        }`}
      >
        <Radio
          id={getFieldID('custom_po_gateway', formType)}
          name={getFieldID('custom_po_gateway', formType)}
          value="custom_po_gateway"
          checked={'custom_po_gateway' === selectedPaymentMode}
          label="Pay by Purchase Order"
          onChange={(event) => handlePaymentModeChange(event)}
          className={styles['payments__payment__selector--radio']}
        />
        <div className={styles.payments__payment__fields}>
          <div className={`${styles['grid']} ${styles['gap-lg']}`}>
            <div className={styles['col-12']}>
              Please include a Purchase Order (PO) number when checking out.
              We’ll invoice your company and you can pay by check or credit
              card.
            </div>
            {showPOFields && (
              <>
                <div className={styles['col-6']}>
                  <Text
                    id={getFieldID('poNumber', formType)}
                    label="Purchase Order Number"
                    isRequired={
                      showPOFields &&
                      'custom_po_gateway' === selectedPaymentMode
                    }
                    type="text"
                  />
                </div>
                <div className={styles['col-6']}>
                  <Text
                    id={getFieldID('customerNumber', formType)}
                    label="Customer Number"
                    isRequired={
                      showPOFields &&
                      'custom_po_gateway' === selectedPaymentMode
                    }
                    type="text"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

PaymentModes.propTypes = {
  paymentMethod: PropTypes.oneOf([
    'custom_po_gateway',
    'custom_paypal_gateway'
  ]),
  handleOnChange: PropTypes.func
}
