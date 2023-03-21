import {getFloatVal} from '@/functions/checkout/commonUtil'
import {PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import styles from './PayPal.module.scss'

/**
 * Render the PayPal component.
 *
 * @param  {object}   props                   PayPal component props.
 * @param  {Function} props.handleCheckout    Handle order checkout action -> this will create the order on the woocommerce side
 * @param  {object}   props.customerData      Customer data for checkout purposes
 * @param  {Function} props.handleOrderUpdate Handle the order update action on the woocommerce side after the paypal order/payment is created
 * @param  {Function} props.handleError       Handle the payment error
 * @return {Element}                          The PayPal component.
 */
export default function PayPal({
  handleCheckout,
  customerData,
  handleOrderUpdate,
  handleError
}) {
  const [payPalInitialized, setPayPalInitialized] = useState(false)
  // creates a paypal order
  const createOrder = (data, actions) => {
    //1. Create a order in woocommerce using checkout mutation
    //2. Create a paypal order and process payment
    //3. Handle call back actions
    //    * Error: do, nothing, we can allow the user to retry paypal or other payment type. At this point the woo order is already created and is in pending payment state
    //    * Cancel: do, nothing, we can allow the user to retry paypal or other payment type. At this point the woo order is already created and is in pending payment state
    //    * Approve: Clear cart, Redirect the user to the order confirmation page
    const checkoutPromis = Promise.resolve(
      handleCheckout(customerData).then((response) => {
        if (response == null) {
          return null
        }
        let checkoutResult = response.data.checkout
        if (actions.order && checkoutResult.order.status === 'PENDING') {
          return actions.order.create({
            payer: {
              name: {
                given_name: checkoutResult.order.billing.firstName,
                surname: checkoutResult.order.billing.lastName
              },
              address: {
                address_line_1: checkoutResult.order.billing.address1,
                address_line_2: checkoutResult.order.billing.address2,
                admin_area_2: checkoutResult.order.billing.city,
                postal_code: checkoutResult.order.billing.postcode,
                country_code: checkoutResult.order.billing.country
              },
              email_address: checkoutResult.order.billing.email
            },
            purchase_units: [
              {
                description: generateProductDescription(checkoutResult.order),
                amount: {
                  currency_code: checkoutResult.order.currency,
                  value: getFloatVal(checkoutResult.order.total)
                  // breakdown: {
                  //   item_total: {
                  //     value: getFloatVal(checkoutResult.order.total),
                  //     currency_code: checkoutResult.order.currency
                  //   }
                  // }
                },
                invoice_id: checkoutResult.order.databaseId
                // items: generateLineItems(checkoutResult.order)
                //TODO: include taxes
                //TODO: inclide discounts
                //TODO: include shipping
              }
            ],
            // remove the applicaiton_context object if you need your users to add a shipping address
            application_context: {
              shipping_preference: 'NO_SHIPPING'
            }
          })
        } else {
          return actions.close()
        }
      })
    )
    return checkoutPromis
  }

  const generateProductDescription = (order) => {
    return order.orderNumber
  }

  // const generateLineItems = (order) => {
  //   var productLines = []
  //   for (let i = 0; i < order.lineItems.nodes.length; i++) {
  //     var givenProduct = order.lineItems.nodes[i]
  //     var productLine = {
  //       name: givenProduct.product.name,
  //       quantity: givenProduct.quantity,
  //       sku: givenProduct.product.sku,
  //       unit_amount: {
  //         currency_code: order.currency,
  //         value: getFloatVal(givenProduct.subtotal)
  //       }
  //     }
  //     productLines.push(productLine)
  //   }

  //   return productLines
  // }

  // handles when a payment is confirmed for paypal
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      Promise.resolve(
        handleOrderUpdate(
          Number(details.purchase_units[0].invoice_id),
          'PROCESSING',
          true,
          null,
          null
        )
      )
    })
  }
  // handles payment errors
  const onError = (err) => {
    //https://developer.paypal.com/docs/checkout/standard/customize/handle-errors/
    //This error handler is a catch-all. Errors at this point are not expected to be handled beyond showing a generic error message or page.
    handleError(err.message)
    console.error(err)
  }

  const onInit = () => {
    setPayPalInitialized(true)
  }

  const initialOptions = {
    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY,
    intent: 'capture'
  }

  return (
    <div className={styles.paypal}>
      {!payPalInitialized && (
        <div className={styles['paypal--loading']}>Loading...</div>
      )}
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={(data, actions) => createOrder(data, actions)}
          onInit={(data, actions) => onInit(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
          onError={onError}
          forceReRender={[customerData]}
        />
      </PayPalScriptProvider>
    </div>
  )
}

PayPal.propTypes = {
  handleCheckout: PropTypes.func,
  customerData: PropTypes.object,
  handleOrderUpdate: PropTypes.func,
  handleError: PropTypes.func
}
