import {isCompositeProductChild} from '@/functions/product/productUtil'
import {v4} from 'uuid'
import {getFloatVal} from './commonUtil'

/**
 * @param  {string} id   ID of the field
 * @param  {string} type Type or group of the field
 * @return {string}      generated field id.
 */
export function getFieldID(id, type) {
  return type ? type + '_' + id : id
}

/**
 * Returns cart data in the required format.
 *
 * @param {string} data Cart data
 */

/**
 * @param  {object} data Formatted cart object
 * @return {string}      generated field id.
 */
export const getFormattedCart = (data) => {
  let formattedCart = null
  if (undefined === data || !data.cart.contents.nodes.length) {
    return formattedCart
  }

  const givenProducts = data.cart.contents.nodes

  // Create an empty object.
  formattedCart = {}
  formattedCart.products = []
  let totalProductsCount = 0

  for (let i = 0; i < givenProducts.length; i++) {
    const givenProduct = givenProducts?.[i]?.variation?.node
      ? givenProducts?.[i]?.variation?.node
      : givenProducts?.[i]?.product?.node
    const product = {}

    product.productId = givenProduct?.productId ?? ''
    product.type = givenProduct?.type ?? ''
    product.cartKey = givenProducts?.[i]?.key ?? ''
    product.sku = givenProduct?.sku ?? ''
    product.shortDescription = givenProduct?.shortDescription ?? ''
    product.description = givenProduct?.description ?? ''
    product.name = givenProduct?.name ?? ''
    product.onSale = givenProduct?.onSale ?? false
    product.qty = givenProducts?.[i]?.quantity
    product.price = givenProduct?.price
    product.regularPrice = givenProduct?.regularPrice
    product.priceRaw = givenProduct?.priceRaw
    product.regularPriceRaw = givenProduct?.regularPriceRaw
    product.totalPriceRaw = getFloatVal(givenProducts?.[i]?.total) ?? ''
    product.totalPrice = givenProducts?.[i]?.total ?? ''
    product.subtotal = givenProducts?.[i]?.subtotal ?? ''
    product.image = {
      sourceUrl: givenProduct?.image?.sourceUrl ?? '',
      srcSet: givenProduct?.image?.srcSet ?? '',
      title: givenProduct?.image?.title ?? '',
      altText: givenProduct?.image?.altText ?? '',
      mediaDetails: {
        height: givenProduct?.image?.mediaDetails?.height,
        width: givenProduct?.image?.mediaDetails?.width
      }
    }

    for (let j = 0; j < givenProducts[i]?.extraData?.length; j++) {
      var ed = givenProducts[i]?.extraData[j]
      if (ed.id === 'cart__addons') {
        var dataVal = JSON.parse(ed.value)
        product.addons = dataVal
      }

      //cart__stamp is used for bundle products
      //cart__composite_data is used for composite products.
      //The value of the above 2 keys are same, hence the same logic applied to the composite/bundle for grouping
      //The composite_id represents the parent product ID for both bundle and composite children
      if (ed.id === 'cart__stamp' || ed.id === 'cart__composite_data') {
        var compositeData = JSON.parse(ed.value)

        //const productComposites = []
        const entries = Object.entries(compositeData)

        if (entries.length > 0) {
          const extDataCompositId = entries[0][1].composite_id

          //For composit child item we will assign the compositeId.
          if (extDataCompositId !== product.productId) {
            product.parentCompositId = extDataCompositId //TODO: start from here tomorrow morning
          }
        }
      }

      if (ed.key === '_composite_parent' || ed.key === 'bundled_item_id') {
        //Note that the ed.value is not a ed.value not really the ID of the parent. This is issue in the wp-graphql plugin.
        //For now we only need a value in the _composite_parent to determine if the current product is a child of a composite product
        product.parentCompositId = ed.value
      }
    }

    //We will not consider the quantity of the composite child items for the overrall product count. We only consider the parent composite product for the count
    if (!isCompositeProductChild(product)) {
      totalProductsCount += product.qty
    }

    // Push each item into the products array.
    formattedCart.products.push(product)
  }

  formattedCart.totalProductsCount = totalProductsCount
  formattedCart.total = data?.cart?.total ?? ''
  formattedCart.totalRaw = getFloatVal(data?.cart?.total) ?? ''
  formattedCart.totalTax = data?.cart?.totalTax ?? ''
  formattedCart.totalTaxRaw = getFloatVal(data?.cart?.totalTax) ?? ''
  formattedCart.subtotal = data?.cart?.subtotal ?? ''
  formattedCart.feeTotal = data?.cart?.feeTotal ?? ''
  formattedCart.feeTotalRaw = getFloatVal(data?.cart?.feeTotal) ?? ''
  formattedCart.shippingTotal = data?.cart?.shippingTotal ?? ''
  formattedCart.shippingTotalRaw = getFloatVal(data?.cart?.shippingTotal) ?? ''
  formattedCart.shippingTax = data?.cart?.shippingTax ?? ''
  formattedCart.shippingTaxRaw = getFloatVal(data?.cart?.shippingTax) ?? ''
  formattedCart.discountTotal = data?.cart?.discountTotal ?? ''
  formattedCart.discountTotalRaw = getFloatVal(data?.cart?.discountTotal) ?? ''
  formattedCart.customerNote = data?.cart?.customerNote ?? ''

  //coupons
  formattedCart.appliedCoupons = data?.cart?.appliedCoupons ?? ''

  //shipping methods
  formattedCart.chosenShippingMethods = data?.cart?.chosenShippingMethods
  formattedCart.availableShippingMethods = data?.cart?.availableShippingMethods

  //customer address
  formattedCart.customer = data?.customer

  return formattedCart
}

export const getUpdatedItems = (products, newQty, cartKey) => {
  // Create an empty array.
  const updatedItems = []

  // Loop through the product array.
  products.map((cartItem) => {
    // If you find the cart key of the product user is trying to update, push the key and new qty.
    if (cartItem.cartKey === cartKey) {
      updatedItems.push({
        key: cartItem.cartKey,
        quantity: parseInt(newQty)
      })

      // If item is a sub(child) item, update its qty also
      products.map((cartSubItem) => {
        if (cartSubItem.parentCompositId === cartItem.productId) {
          updatedItems.push({
            key: cartSubItem.cartKey,
            quantity: parseInt(newQty)
          })
        }
      })
      // Otherwise just push the existing qty without updating.
    } else {
      const existingItem = updatedItems.find(
        (item) => item.key === cartItem.cartKey
      )

      if (!existingItem) {
        updatedItems.push({
          key: cartItem.cartKey,
          quantity: cartItem.qty
        })
      }
    }
  })

  // Return the updatedItems array with new Qtys.
  return updatedItems
}

export const transformCustomerData = (order, isReview = false) => {
  // Set the billing Data to shipping, if applicable.
  const shippingData = order.shipToDifferentAddress
    ? order.shipping
    : order.billing

  const uid = v4()

  const checkoutData = {
    transactionId: uid,
    clientMutationId: uid,
    shipping: {
      firstName: shippingData?.firstName,
      lastName: shippingData?.lastName,
      address1: shippingData?.address1,
      address2: shippingData?.address2,
      city: shippingData?.city,
      country: shippingData?.country,
      state: shippingData?.state,
      postcode: shippingData?.postcode,
      email: shippingData?.email,
      phone: shippingData?.phone,
      company: shippingData?.company
    },
    billing: {
      firstName: order?.billing?.firstName,
      lastName: order?.billing?.lastName,
      address1: order?.billing?.address1,
      address2: order?.billing?.address2,
      city: order?.billing?.city,
      country: order?.billing?.country,
      state: order?.billing?.state,
      postcode: order?.billing?.postcode,
      email: order?.billing?.email,
      phone: order?.billing?.phone,
      company: order?.billing?.company
    },
    shipToDifferentAddress: order.shipToDifferentAddress,
    paymentMethod: order.paymentMethod,
    customerNote: order.customerNote,
    isPaid: order?.isPaid || false
  }

  //add po/co numbers as metadata
  checkoutData.metaData = [
    {key: 'poNumber', value: order.poNumber ? order.poNumber : ''},
    {
      key: 'customerNumber',
      value: order.customerNumber ? order.customerNumber : ''
    }
  ]

  if (isReview) checkoutData.shippingMethods = order.shippingMethods
  else checkoutData.shippingMethod = order.shippingMethods

  return checkoutData
}

export const updateCheckoutData = (
  orderId,
  status,
  isPaid,
  customerNumber,
  poNumber
) => {
  const uid = v4()

  const orderData = {
    clientMutationId: uid,
    status: status,
    orderId: orderId,
    isPaid: isPaid
  }

  if (poNumber || customerNumber) orderData.metaData = []

  if (poNumber)
    orderData.metaData.push({
      key: 'poNumber',
      value: poNumber ? poNumber : ''
    })

  if (customerNumber)
    orderData.metaData.push({
      key: 'customerNumber',
      value: customerNumber ? customerNumber : ''
    })

  return orderData
}

export const createTheOrder = async (createOrderMutation, orderData, token) => {
  let response = {
    data: null,
    error: ''
  }

  try {
    const {data} = await createOrderMutation({
      variables: {
        input: orderData
      },
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    })

    response.data = data
  } catch (err) {
    console.error(err)
    response.error = err.message
  }

  return response
}

export const updateTheOrder = async (updateOrderMutation, orderData) => {
  const {data} = await updateOrderMutation({
    variables: {
      input: orderData
    }
  })

  return data
}

export const isNull = (value) => {
  return typeof value === 'undefined' || value === null
}

export const validateAddressFields = (address, shippingMethods) => {
  //Billing checks, this is used to skip the initial null state of these fields
  if (isNull(address.state) || isNull(address.country)) return false

  //We do this trick to stop 2 calls being sent out when a country is change. 1 for country and another for state. We consolodate and send 1 request when we get the state changes as a result of the country change.
  if (
    address.country !== address.intermediateCountry ||
    address.intermediateCountry === ''
  )
    return false

  if (isNull(shippingMethods)) return false

  return true
}
