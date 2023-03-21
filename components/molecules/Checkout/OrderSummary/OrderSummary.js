import Radio from '@/components/atoms/Inputs/Radio'
import RemoveCoupon from '@/components/molecules/Checkout/Coupon/RemoveCoupon'
import ProductInfo from '@/components/molecules/Checkout/ProductInfo'
import {getFloatVal} from '@/functions/checkout/commonUtil'
import {isCompositeProductChild} from '@/functions/product/productUtil'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './OrderSummary.module.scss'

/**
 * Render the OrderSummary component.
 *
 * @param  {object}   props                        OrderSummary component props.
 * @param  {boolean}  props.showHeader             Display the header
 * @param  {object}   props.cart                   The cart context object
 * @param  {Function} props.couponActionCallback   Event handler for the coupon remove function
 * @param  {boolean}  props.showProducts           Show the product info
 * @param  {string}   props.styleType              Style type
 * @param  {string}   props.shippingMethods        Default Shipping method
 * @param  {Function} props.handleShippingOnChange Handler shipping option change
 * @return {Element}                               The OrderSummary component.
 */
export default function OrderSummary({
  cart,
  showHeader,
  styleType,
  couponActionCallback,
  showProducts,
  shippingMethods,
  handleShippingOnChange
}) {
  const renderShippingMethods = (rates) => {
    if (rates.length === 1) return ''

    return rates?.map((rate) => (
      <div key={rate.id}>
        <Radio
          id={rate.id}
          name="shippingMethods"
          value={rate.id}
          checked={rate.id === shippingMethods}
          label={`${rate.label}`}
          align="right"
          className={styles.summary__cell__shippingoptions}
          onChange={handleShippingOnChange}
        />
      </div>
    ))
  }

  const renderShippingAmount = (rates) => {
    return rates.length === 1 ? (
      <>
        <span>{cart.shippingTotal} </span>
        <span className={styles.summary__cell__shippingoptions__text}>
          ({rates[0].label})
        </span>
      </>
    ) : (
      cart.shippingTotal
    )
  }

  if (!cart) return 'Cart is empty'
  return (
    <>
      <table
        className={`${styles.summary} ${
          styleType == 'cart' && styles['summary--cart']
        }`}
      >
        {showHeader && (
          <thead>
            {styleType === 'checkout' && (
              <tr>
                <th scope="col" className={styles['summary--left']}>
                  Product
                </th>
                <th
                  scope="col"
                  className={`${styles['summary--right']} ${styles['summary--desktop']}`}
                >
                  Subtotal
                </th>
              </tr>
            )}
          </thead>
        )}
        <tbody>
          {showProducts &&
            cart &&
            cart.products &&
            cart.products.length > 0 &&
            cart.products.map((item) => (
              <tr key={item.productId}>
                <td>
                  <ProductInfo
                    product={item}
                    showQuantity={styleType === 'checkout'}
                    isCompositeChild={isCompositeProductChild(item)}
                  />
                </td>
                <td
                  className={`${styles.summary__content} ${styles['summary--desktop']}`}
                >
                  {getFloatVal(item.subtotal) > 0 && item.subtotal}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <table
        className={`${styles.summary} ${
          styleType == 'cart' && styles['summary--cart']
        }`}
      >
        {showHeader && (
          <thead>
            {styleType === 'cart' && (
              <tr>
                <th scope="col" colSpan={2} className={styles['summary--left']}>
                  Cart Totals
                </th>
              </tr>
            )}
          </thead>
        )}
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td className={`${styles.summary__content}`}>{cart.subtotal}</td>
          </tr>
          {cart?.appliedCoupons?.length > 0 &&
            cart?.appliedCoupons?.map((appliedCoupon) => (
              <tr key={appliedCoupon.code}>
                <td>Coupon: {appliedCoupon.code}</td>
                <td className={`${styles.summary__content}`}>
                  <div className={styles.summary__content__coupon}>
                    <div className={styles.summary__content__coupon__values}>
                      <div>Discount: {appliedCoupon.discountAmount}</div>
                      {appliedCoupon &&
                        getFloatVal(appliedCoupon.discountTax) > 0 && (
                          <div>Tax: {appliedCoupon.discountTax}</div>
                        )}
                    </div>
                    <RemoveCoupon
                      appliedCouponCode={appliedCoupon.code}
                      couponActionCallback={couponActionCallback}
                    />
                  </div>
                </td>
              </tr>
            ))}
          <tr>
            <td>Shipping</td>
            <td>
              <div className={styles.summary__content}>
                {cart.availableShippingMethods &&
                cart.availableShippingMethods.length > 0 &&
                cart.availableShippingMethods[0]?.rates?.length > 0 ? (
                  <>
                    {renderShippingAmount(
                      cart.availableShippingMethods[0]?.rates
                    )}
                    {styleType == 'checkout' &&
                      renderShippingMethods(
                        cart.availableShippingMethods[0]?.rates
                      )}
                  </>
                ) : (
                  <div className={styles.summary__cell__note}>
                    Shipping will be calculated at checkout
                  </div>
                )}
              </div>
            </td>
          </tr>
          {/* {cart.shippingTaxRaw > 0 && (
            <tr>
              <td>Shipping Tax</td>
              <td className={`${styles.summary__cell__note}`}>
                <div className={styles.summary__content}>
                  {cart.shippingTax}
                </div>
              </td>
            </tr>
          )} */}
          <tr>
            <td>Tax</td>
            <td className={`${styles.summary__cell__note}`}>
              {styleType == 'cart' && !cart.totalTax ? (
                <div className={styles.summary__cell__note}>
                  Taxes will be calculated at checkout
                </div>
              ) : (
                <div className={styles.summary__content}>{cart.totalTax}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td className={`${styles.summary__content}`}>{cart.total}</td>
          </tr>
          {cart.discountTotalRaw > 0 && (
            <tr>
              <td>You Saved</td>
              <td className={`${styles.summary__content}`}>
                {cart.discountTotal}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

OrderSummary.propTypes = {
  cart: PropTypes.object,
  showHeader: PropTypes.bool,
  couponActionCallback: PropTypes.func,
  showProducts: PropTypes.bool,
  styleType: PropTypes.oneOf(['cart', 'checkout']),
  shippingMethods: PropTypes.string
}
