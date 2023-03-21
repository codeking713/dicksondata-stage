import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Inputs/Text'
import Form from '@/components/molecules/Form'
import APPLY_COUPON from '@/lib/next-api/wordpress/checkout/apply-coupon'
import {useMutation} from '@apollo/client'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {v4} from 'uuid'
import styles from './ApplyCoupon.module.scss'

/**
 * Render the ApplyCoupon component.
 *
 * @param  {object}   props                      ApplyCoupon component props.
 * @param  {Function} props.couponActionCallback Handle post actions after coupon is applied
 * @return {Element}                             The ApplyCoupon component.
 */
export default function ApplyCoupon({couponActionCallback}) {
  const [couponCode, setCouponCode] = useState('')
  const [processingCoupon, setProcessingCoupon] = useState(false)

  const handleApplyCouponEvent = async (event) => {
    let couponCode = event.couponCode.trim()

    if (!couponCode) {
      couponActionCallback({
        type: 'ERROR',
        message: 'Please enter a coupon code.',
        action: 'APPLY'
      })
      setProcessingCoupon(false)
      setCouponCode('')
    } else {
      setProcessingCoupon(true)
      setCouponCode(couponCode)
    }
  }

  useEffect(() => {
    /**
     * Perform the coupon action
     */
    async function invokeCouponAction() {
      if (couponCode != '') {
        await applyCoupon()
      }
    }
    invokeCouponAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponCode])

  const [applyCoupon] = useMutation(APPLY_COUPON, {
    variables: {
      input: {
        clientMutationId: v4(),
        code: couponCode
      }
    },
    onCompleted: (data) => {
      couponActionCallback({
        type: 'SUCCESS',
        data: {cart: data.applyCoupon.cart},
        message: `Coupon code ${couponCode} applied.`,
        action: 'APPLY',
        coupon: {
          code: data?.applyCoupon?.cart?.appliedCoupons.find(
            (c) => c.code === couponCode
          )
        }
      })
      setProcessingCoupon(false)
      setCouponCode('')
    },
    onError: (error) => {
      if (error) {
        let message = error?.graphQLErrors?.[0]?.message

        //Hack to transform the error message
        //This line can be removed after https://github.com/wp-graphql/wp-graphql-woocommerce/issues/600 is fixed
        if (message === 'No coupon found with the code provided')
          message = `Coupon "${couponCode}" does not exist!`

        couponActionCallback({
          type: 'ERROR',
          message: message ?? '',
          action: 'APPLY'
        })
      }
      setProcessingCoupon(false)
      setCouponCode('')
    }
  })

  return (
    <Form
      onSubmit={(e) => handleApplyCouponEvent(e)}
      showSubmitButton={false}
      id="coupon"
      title="Coupon"
      formDefaults={{
        couponCode: couponCode
      }}
    >
      <div className={styles.coupon}>
        <div className={styles.coupon__fields}>
          <Text
            id="couponCode"
            className={styles.coupon__fields__code}
            label="Coupon Code"
            type="text"
            value={couponCode}
            isDisabled={processingCoupon}
          />
          <div>
            <Button
              size="sm"
              text="Apply coupon"
              className={styles.coupon__fields__btn}
              isSubmit={true}
              disabled={processingCoupon}
            />
          </div>
        </div>
      </div>
    </Form>
  )
}

ApplyCoupon.propTypes = {
  couponActionCallback: PropTypes.func
}
