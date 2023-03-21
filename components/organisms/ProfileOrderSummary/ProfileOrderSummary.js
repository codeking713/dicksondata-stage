import ProductAddonPrice from '@/components/molecules/ProductAddonPrice'
import {formatCurrency, getFloatVal} from '@/functions/checkout/commonUtil'
import {isCompositeProductChild} from '@/functions/product/productUtil'
import styles from './ProfileOrderSummary.module.scss'

/**
 * @param  {object}  props           Component props
 * @param  {object}  props.orderData Order info
 * @param  {string}  props.header    Header text
 * @return {Element}                 The ProfileOrderSummary component.
 */
export default function ProfileOrderSummary({orderData, header}) {
  return (
    <div>
      <h4 className={styles.header}>{header}</h4>
      <table className={styles.table}>
        <thead>
          <tr className={styles.table__header}>
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderData?.products?.map((product, index) => {
            return (
              <tr key={index}>
                <td>
                  <div
                    className={`${
                      isCompositeProductChild(product) &&
                      styles['table--compositechild']
                    }`}
                  >
                    <div>{`${product?.name} x ${product?.qty}`}</div>
                    <ProductAddonPrice addons={product.addons} type="ORDER" />
                  </div>
                </td>
                <td>
                  {getFloatVal(orderData.subtotal) &&
                    formatCurrency(product.subtotal, orderData.currency)}
                </td>
              </tr>
            )
          })}
          <tr>
            <td>Subtotal</td>
            <td>{orderData?.subtotal}</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td>{orderData?.shippingTotal}</td>
          </tr>
          {/* {orderData.shippingTaxRaw > 0 && (
            <tr>
              <td>Shipping Tax</td>
              <td>{orderData.shippingTax}</td>
            </tr>
          )} */}
          <tr>
            <td>Tax</td>
            <td>{orderData?.totalTax}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{orderData?.total}</td>
          </tr>
          {orderData.discountTotalRaw > 0 && (
            <tr>
              <td>You Saved</td>
              <td>{orderData.discountTotal}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
