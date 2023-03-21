import {getFloatVal} from './commonUtil'

/**
 * Returns order data in the required format.
 *
 * @param {string} data Order data
 */

/**
 * @param  {object} data Formatted order object
 * @return {string}      generated field id.
 */
export const getFormattedOrder = (data) => {
  let formattedOrder = null
  if (undefined === data || !data || !data?.lineItems?.nodes?.length) {
    return formattedOrder
  }

  const givenOrderItems = data.lineItems.nodes

  // Create an empty object.
  formattedOrder = {}
  formattedOrder.products = []
  let totalProductsCount = 0

  for (let i = 0; i < givenOrderItems.length; i++) {
    //   const givenProduct = givenProducts?.[i]?.variation?.node
    //   ? givenProducts?.[i]?.variation?.node
    //   : givenProducts?.[i]?.product?.node
    // const product = {}

    //const givenProduct = givenOrderItems?.[i]

    //Important: If the product is a variation we need to consider that
    const givenProduct = givenOrderItems?.[i]?.variation
      ? givenOrderItems?.[i]?.variation
      : givenOrderItems?.[i]?.product

    const product = {}

    product.productId = givenProduct?.productId ?? ''
    product.sku = givenProduct?.sku ?? ''
    product.shortDescription = givenProduct?.shortDescription ?? ''
    product.description = givenProduct?.description ?? ''
    product.name = givenProduct?.name ?? ''
    product.onSale = givenProduct?.onSale ?? false
    product.price = givenProduct?.price
    product.regularPrice = givenProduct?.regularPrice
    product.priceRaw = givenProduct?.priceRaw
    product.regularPriceRaw = givenProduct?.regularPriceRaw
    product.image = {
      sourceUrl: givenProduct?.image?.sourceUrl ?? '',
      srcSet: givenProduct?.image?.srcSet ?? '',
      title: givenProduct?.image?.title ?? '',
      altText: givenProduct?.image?.altText ?? ''
    }

    product.totalPriceRaw = getFloatVal(givenOrderItems?.[i]?.total) ?? ''
    product.qty = givenOrderItems?.[i]?.quantity
    product.totalPrice = givenOrderItems?.[i]?.total ?? ''
    product.subtotal = givenOrderItems?.[i]?.subtotal ?? ''
    product.addons = []
    for (let j = 0; j < givenOrderItems[i]?.metaData?.length; j++) {
      var ed = givenOrderItems[i]?.metaData[j]

      //We will skip the displaying of the product attributes on the product addon section, as the format of the information is not presentable
      //Skip composite meta fields
      if (
        !ed.key.startsWith('pa_') &&
        !ed.key.startsWith('_composite') &&
        !ed.key.startsWith('_component') &&
        !ed.key.startsWith('_bundle') &&
        !ed.key.startsWith('_stamp')
      ) {
        product.addons.push({
          value: ed.value,
          name: ed.key,
          label: ed.value
        })
      }

      if (ed.key === '_composite_parent' || ed.key === '_bundled_item_id') {
        //Note that the ed.value is not a ed.value not really the ID of the parent. This is issue in the wp-graphql plugin.
        //For now we only need a value in the _composite_parent to determine if the current product is a child of a composite product
        product.parentCompositId = ed.value
      }
    }

    // Push each item into the products array.
    formattedOrder.products.push(product)
  }

  formattedOrder.status = data?.status ?? ''
  formattedOrder.date = data?.date ?? ''
  formattedOrder.orderNumber = data?.orderNumber ?? ''
  formattedOrder.paymentMethod = data?.paymentMethod ?? ''
  formattedOrder.paymentMethodTitle = data?.paymentMethodTitle ?? ''
  formattedOrder.paymentMethodTitle = data?.paymentMethodTitle ?? ''

  formattedOrder.currency = data?.currency ?? ''
  formattedOrder.totalProductsCount = totalProductsCount
  formattedOrder.total = data?.total ?? ''
  formattedOrder.totalRaw = getFloatVal(data?.total) ?? ''
  formattedOrder.totalTax = data?.totalTax ?? ''
  formattedOrder.totalTaxRaw = getFloatVal(data?.totalTax) ?? ''
  formattedOrder.subtotal = data?.subtotal ?? ''
  formattedOrder.shippingTotal = data?.shippingTotal ?? ''
  formattedOrder.shippingTotalRaw = getFloatVal(data?.shippingTotal) ?? ''
  formattedOrder.shippingTax = data?.shippingTax ?? ''
  formattedOrder.shippingTaxRaw = getFloatVal(data?.shippingTax) ?? ''
  formattedOrder.discountTotal = data?.discountTotal ?? ''
  formattedOrder.discountTotalRaw = getFloatVal(data?.discountTotal) ?? ''
  formattedOrder.customerNote = data?.customerNote ?? ''
  formattedOrder.databaseId = data?.databaseId ?? ''

  //customer address
  formattedOrder.customer = data?.customer

  formattedOrder.hasShippingAddress = data?.hasShippingAddress ?? ''
  formattedOrder.hasBillingAddress = data?.hasBillingAddress ?? ''
  formattedOrder.billing = data?.billing ?? ''
  formattedOrder.shipping = data?.shipping ?? ''

  if (data?.metaData && data?.metaData.length > 0) {
    let poNumber = data?.metaData?.find((m) => m.key === 'poNumber')
    if (poNumber) formattedOrder.poNumber = poNumber.value

    let customerNumber = data?.metaData?.find((m) => m.key === 'customerNumber')
    if (customerNumber) formattedOrder.customerNumber = customerNumber.value
  }

  return formattedOrder
}

/**
 * Convert the status into readable format
 *
 * @param  {string } status Status
 * @return {string}         formatted status
 */
export const displayStatus = (status) => {
  var str = status.replace('_', ' ')
  str = str.toLowerCase().split(' ')
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
  }
  return str.join(' ')
}
