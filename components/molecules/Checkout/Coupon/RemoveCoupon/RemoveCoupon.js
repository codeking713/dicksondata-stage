import Icon from '@/components/atoms/Icon'
import REMOVE_COUPON from '@/lib/next-api/wordpress/checkout/remove-coupon'
import {useMutation} from '@apollo/client'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {v4} from 'uuid'
import styles from './RemoveCoupon.module.scss'

/**
 * Render the RemoveCoupon component.
 *
 * @param  {object}   props                      RemoveCoupon component props.
 * @param  {Function} props.couponActionCallback Handle post actions after coupon is applied
 * @param  {string}   props.appliedCouponCode    Coupon code for element
 * @return {Element}                             The RemoveCoupon component.
 */
export default function RemoveCoupon({
  appliedCouponCode,
  couponActionCallback
}) {
  const [processingCoupon, setProcessingCoupon] = useState(false)
  const handleRemoveCouponEvent = async (event, code) => {
    if (!code) {
      couponActionCallback({
        type: 'ERROR',
        message: 'Please enter a coupon code.',
        action: 'REMOVE'
      })
    } else {
      setProcessingCoupon(true)
      await removeCoupon()
    }
  }

  const [removeCoupon] = useMutation(REMOVE_COUPON, {
    variables: {
      input: {
        clientMutationId: v4(),
        codes: [appliedCouponCode]
      }
    },
    onCompleted: (data) => {
      couponActionCallback({
        type: 'SUCCESS',
        data: {cart: data.removeCoupons.cart},
        message: `Coupon code ${appliedCouponCode} removed.`,
        action: 'REMOVE'
      })
      setProcessingCoupon(false)
    },
    onError: (error) => {
      if (error) {
        couponActionCallback({
          type: 'ERROR',
          message: error?.graphQLErrors?.[0]?.message ?? '',
          action: 'REMOVE'
        })
      }
      setProcessingCoupon(false)
    }
  })

  return (
    <button
      type="button"
      className={styles.remove}
      onClick={(event) => handleRemoveCouponEvent(event, appliedCouponCode)}
      disabled={processingCoupon}
    >
      <Icon title="Remove Coupon" icon="bin" />
    </button>
  )
}

RemoveCoupon.propTypes = {
  code: PropTypes.string,
  couponActionCallback: PropTypes.func
}
