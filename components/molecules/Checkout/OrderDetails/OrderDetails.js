import ProductInfo from '@/components/molecules/Checkout/ProductInfo'
import ProductAddonPrice from '@/components/molecules/ProductAddonPrice'
import {formatCurrency, getFloatVal} from '@/functions/checkout/commonUtil'
import {isCompositeProductChild} from '@/functions/product/productUtil'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './OrderDetails.module.scss'

/**
 * Render the OrderDetails component.
 *
 * @param  {object}  props       OrderDetails component props.
 * @param  {object}  props.order The order context object
 * @return {Element}             The OrderDetails component.
 */
export default function OrderDetails({order}) {
  if (!order) return 'Order is empty'
  const columns = [
    {fullName: 'Product', shortName: 'Product'},
    {fullName: 'Price', shortName: 'Price'},
    {fullName: 'Quantity', shortName: 'Qty'},
    {fullName: 'Total', shortName: 'Total'}
  ]
  return (
    <div className={styles.section__order}>
      <table className={styles.section__order__products}>
        <colgroup>
          <col width="50%" />
        </colgroup>
        <thead>
          <tr>
            <th
              className={`${styles['section__order__products__cell--left']}`}
              scope="col"
            >
              {columns[0].fullName}
            </th>
            <th
              scope="col"
              className={`${styles['section__order__products__cell--center']}`}
            >
              {columns[1].fullName}
            </th>
            <th
              scope="col"
              className={`${styles['section__order__products__cell--center']}`}
            >
              {columns[2].fullName}
            </th>
            <th
              className={`${styles['section__order__products__cell--right']}`}
              scope="col"
            >
              {columns[3].fullName}
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.products?.length > 0 &&
            order.products.map((item) => (
              <tr key={item.productId}>
                <td>
                  <ProductInfo
                    product={item}
                    showImage={true}
                    productHeadingClassName={
                      styles.section__order__products__cell__product
                    }
                    showProductDescription={false}
                    isCompositeChild={isCompositeProductChild(item)}
                  />
                </td>
                <td data-title={columns[1].shortName}>
                  <div
                    className={`${styles.section__order__products__cell__price}`}
                  >
                    {!isCompositeProductChild(item) && (
                      <>
                        {item.price}
                        <ProductAddonPrice addons={item.addons} type="ORDER" />
                      </>
                    )}
                  </div>
                </td>
                <td data-title={columns[2].shortName}>
                  <div
                    className={`${styles.section__order__products__cell__quantity}`}
                  >
                    {item.qty}
                  </div>
                </td>
                <td data-title={columns[3].shortName}>
                  <div
                    className={`${styles.section__order__products__cell__total}`}
                  >
                    {getFloatVal(item.subtotal) &&
                      formatCurrency(item.subtotal, order.currency)}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <table className={`${styles.section__order__summary}`}>
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td className={`${styles.section__order__summary__content}`}>
              {order.subtotal}
            </td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td>
              <div className={styles.section__order__summary__content}>
                {order.shippingTotal}
              </div>
            </td>
          </tr>
          {/* {order.shippingTaxRaw > 0 && (
            <tr>
              <td>Shipping Tax</td>
              <td className={`${styles.section__order__summary__cell__note}`}>
                <div className={styles.section__order__summary__content}>
                  {order.shippingTax}
                </div>
              </td>
            </tr>
          )} */}
          <tr>
            <td>Tax</td>
            <td className={`${styles.section__order__summary__cell__note}`}>
              <div className={styles.section__order__summary__content}>
                {order.totalTax}
              </div>
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td className={`${styles.section__order__summary__content}`}>
              {order.total}
            </td>
          </tr>
          {order.discountTotalRaw > 0 && (
            <tr>
              <td>You Saved</td>
              <td className={`${styles.section__order__summary__content}`}>
                {order.discountTotal}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

OrderDetails.propTypes = {
  order: PropTypes.object
}
