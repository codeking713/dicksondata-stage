const customerInfoReducer = (state, action) => {
  switch (action.type) {
    case 'billing':
      return {
        ...state,
        billing: action.payload
      }
    case 'shipping':
      return {
        ...state,
        shipping: action.payload
      }
    case 'shipToDifferentAddress':
      return {
        ...state,
        shipToDifferentAddress: !state.shipToDifferentAddress
      }
    case 'shippingMethods':
      return {
        ...state,
        shippingMethods: action.payload
      }
    case 'paymentMethod':
      return {
        ...state,
        paymentMethod: action.payload
      }
    case 'customerNote':
      return {
        ...state,
        customerNote: action.payload
      }
    case 'billing_firstName':
      return {
        ...state,
        billing: {
          ...state.billing,
          firstName: action.payload
        }
      }
    case 'billing_lastName':
      return {
        ...state,
        billing: {
          ...state.billing,
          lastName: action.payload
        }
      }
    case 'billing_company':
      return {
        ...state,
        billing: {
          ...state.billing,
          company: action.payload
        }
      }
    case 'billing_country':
      return {
        ...state,
        billing: {
          ...state.billing,
          country: action.payload
        }
      }
    case 'billing_intermediateCountry':
      return {
        ...state,
        billing: {
          ...state.billing,
          intermediateCountry: action.payload
        }
      }
    case 'billing_state':
      return {
        ...state,
        billing: {
          ...state.billing,
          state: action.payload
        }
      }
    case 'billing_address1':
      return {
        ...state,
        billing: {
          ...state.billing,
          address1: action.payload
        }
      }
    case 'billing_address2':
      return {
        ...state,
        billing: {
          ...state.billing,
          address2: action.payload
        }
      }
    case 'billing_city':
      return {
        ...state,
        billing: {
          ...state.billing,
          city: action.payload
        }
      }
    case 'billing_postcode':
      return {
        ...state,
        billing: {
          ...state.billing,
          postcode: action.payload
        }
      }
    case 'billing_phone':
      return {
        ...state,
        billing: {
          ...state.billing,
          phone: action.payload
        }
      }
    case 'billing_email':
      return {
        ...state,
        billing: {
          ...state.billing,
          email: action.payload
        }
      }
    case 'shipping_firstName':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          firstName: action.payload
        }
      }
    case 'shipping_lastName':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          lastName: action.payload
        }
      }
    case 'shipping_company':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          company: action.payload
        }
      }
    case 'shipping_country':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          country: action.payload
        }
      }
    case 'shipping_intermediateCountry':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          intermediateCountry: action.payload
        }
      }
    case 'shipping_state':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          state: action.payload
        }
      }
    case 'shipping_address1':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          address1: action.payload
        }
      }
    case 'shipping_address2':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          address2: action.payload
        }
      }
    case 'shipping_city':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          city: action.payload
        }
      }
    case 'shipping_postcode':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          postcode: action.payload
        }
      }
    case 'shipping_phone':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          phone: action.payload
        }
      }
    case 'shipping_email':
      return {
        ...state,
        shipping: {
          ...state.shipping,
          email: action.payload
        }
      }
    case 'payment_poNumber':
      return {
        ...state,
        poNumber: action.payload
      }
    case 'payment_customerNumber':
      return {
        ...state,
        customerNumber: action.payload
      }
    default:
      console.error('Field not supported: ' + action.type)
      return null
  }
}

export default customerInfoReducer
