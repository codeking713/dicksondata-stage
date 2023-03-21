/**
 * Get common text.
 *
 * @param  {string} key Text key
 * @return {string}     string
 */
export const getText = (key) => {
  let text = ''
  switch (key) {
    case 'CHECKOUT.GET_COUNTRY_ERROR':
      text =
        'Something went wrong when fetching the countries, please try again'
      break
    case 'CHECKOUT.CLEAR_CART_ERROR':
      text =
        'Something went wrong when trying to clear the cart, please contact the support team'
      break
    case 'CHECKOUT.GET_CUSTOMER_ERROR':
      text =
        'Something went wrong when trying to fetch customer details, please try again'
      break
    case 'CHECKOUT.REVIEW_ORDER_ERROR':
      text =
        'Something went wrong when reviewing order information, please try again'
      break
    case 'CHECKOUT.GET_CART_ERROR':
      text = 'Something went wrong when fetching the cart, please try again'
      break
    case 'CHECKOUT.ACCEPT_TERMS_ERROR':
      text = 'Please accept the agreement to proceed'
      break
    case 'CHECKOUT.PAYMENT_TYPE_ERROR':
      text = 'Payment type not supported'
      break
    case 'CHECKOUT.CREATE_ORDER_ERROR':
      text =
        'Something went wrong when creating the order, please contact the support team'
      break
    case 'CHECKOUT.UPDATE_PAYMENT_ERROR':
      text =
        'Something went wrong when updating the payment, please contact the support team'
      break
    case 'CHECKOUT.PROCESSING_ORDER':
      text = 'Please wait while we process your request'
      break
    case 'CHECKOUT.CUSTOMER_LOGIN_INSTRUCTIONS':
      text =
        'If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.'
      break
    case 'CHECKOUT.COUPON_INSTRUCTIONS':
      text = 'If you have a coupon code, please apply it below.'
      break
    case 'CHECKOUT.TAX_INSTRUCTIONS':
      text =
        'Please note: taxes are estimates and may differ from what is billed'
      break
    case 'CHECKOUT.CART_EMPTY':
      text = 'Your cart is currently empty.'
      break
    case 'CHECKOUT.EMPTY_ORDER':
      text = 'Your order is empty.'
      break
    case 'CHECKOUT.PAYPAL_GENERIC_ERROR':
      text = 'We encountered a error while paying through paypal.'
      break
    case 'CHECKOUT.ORDER_UPDATED':
      text = 'Your order was updated successfully'
      break
    case 'CHECKOUT.ORDER_UPDATE_ERROR':
      text = 'Order update failed'
      break
    default:
      break
  }

  return text
}
