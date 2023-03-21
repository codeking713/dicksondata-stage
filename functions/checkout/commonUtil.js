/**
 * @param  {string} numberString number string with the currency prefix
 * @return {string}              extracted number
 */
export const getFloatVal = (numberString) => {
  if (!numberString || numberString == null) return
  numberString = numberString.replace(',', '').match(/[+-]?\d+(\.\d+)?/g)[0]
  let floatValue = parseFloat(numberString)
  return floatValue
}

/**
 * @param  {string} amount   Amount
 * @param  {string} currency Currency
 * @return {string}          Formatted currency value
 */
export const formatCurrency = (amount, currency) => {
  return `${currency === 'USD' ? '$' : currency}${Number(amount).toLocaleString(
    'en-US',
    {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }
  )}`
}

/**
 * @param  {object}  product Product
 * @param  {boolean} raw     Output value is formatted currency or raw float value
 * @return {string}          Formatted price based on product type
 */
export const resolvePrice = (product, raw) => {
  if (product) {
    if (product.type === 'BUNDLE') {
      return raw
        ? product.bundlePriceMin
        : formatCurrency(
            product.bundlePriceMin,
            process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY
          )
    } else if (product.type === 'COMPOSITE') {
      return raw
        ? product.compositePriceMin
        : formatCurrency(
            product.compositePriceMin,
            process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY
          )
    } else {
      return raw ? product.priceRaw : product.price
    }
  } else {
    return 0
  }
}

/**
 * @param  {object}  product Product
 * @param  {boolean} raw     Output value is formatted currency or raw float value
 * @return {string}          Formatted regular price based on product type
 */
export const resolveRegularPrice = (product, raw) => {
  if (product.type === 'BUNDLE') {
    return raw
      ? product.bundleRegularPriceMin
      : formatCurrency(
          product.bundleRegularPriceMin,
          process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY
        )
  } else if (product.type === 'COMPOSITE') {
    return raw
      ? product.compositeRegularPriceMin
      : formatCurrency(
          product.compositeRegularPriceMin,
          process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY
        )
  } else {
    return raw ? product.regularPriceRaw : product.regularPrice
  }
}

/**
 * @param  {string} unitPrice Unit Price
 * @param  {string} discount  Discount
 * @param  {number} quantity  Quantity
 * @return {string}           Formatted summary line item cost
 */
export const calculateProductSimmaryLineItemCost = (
  unitPrice,
  discount,
  quantity
) => {
  //This means its a price range, hence we will not do anything but return the same. e.g. $10.00 - $100.00
  if (!unitPrice || unitPrice.includes(' - '))
    return {price: null, regularPrice: null}

  var onSale = false
  var regularPrice = getFloatVal(unitPrice) * quantity
  var price = regularPrice

  if (discount) {
    price = regularPrice - (regularPrice * discount) / 100
    onSale = true
  }

  return {
    price: formatCurrency(
      price,
      process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY
    ),
    regularPrice: formatCurrency(
      regularPrice,
      process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY
    ),
    onSale
  }
}

/**
 * @param  {string} locale locale info
 * @return {string}        language code
 */
export const getLangCode = (locale) => {
  return locale?.toUpperCase().replace('-', '_')
}

/**
 * @param  {string} locale locale info
 * @return {string}        language code
 */
export const getReverseLangCode = (locale) => {
  return locale?.toLowerCase().replace('_', '-')
}

/**
   If the language is not EN we will not allow the user to purchase
 *
 * @param  {string} defaultLocale Default Locale
 * @param  {string} currentLocale Current Locale
 * @return {string}               Indicate if the product is restricted from being purchased.
 */
export const languageRestrictsPerchase = (defaultLocale, currentLocale) => {
  return defaultLocale !== currentLocale
}

/**
   If the show-request-quote meta data exists we will hide the price and show the request for quote button
 *
 * @param  {object} options Product options
 * @return {string}         Indicate if the product is Request for Quote only
 */
export const showRequestQuote = (options) => {
  var rqFound = options?.nodes?.find((o) => o.slug === 'show-request-quote')
  return rqFound ? true : false
}

export const resolvePostLocale = (activeLocal, post) => {
  if (
    post?.translations?.length > 0 &&
    post?.language?.locale?.toUpperCase() !== getLangCode(activeLocal)
  ) {
    var translatedPost = post?.translations?.find(
      (a) => a?.language?.locale?.toUpperCase() === getLangCode(activeLocal)
    )

    if (translatedPost) return {...post, ...translatedPost}
  }

  return post
}

export const removeCurrency = (price) => {
  if (!price) return 0

  var rawPrice = price
    .replaceAll('$', '')
    .replaceAll(',', '')
    .replaceAll('USD', '')

  //if the value is a range, we will take the min of that range
  if (rawPrice.includes('-')) {
    rawPrice = rawPrice.replaceAll(' ', '').split('-')[0]
  }

  let priceInNumber = Number(rawPrice)
  return !priceInNumber ? 0 : priceInNumber
}

export const prepareTagManagerDataLayerObj = (
  products,
  event,
  coupon,
  order,
  cart,
  category,
  quantity = 1,
  addToCartTotal
) => {
  try {
    var productsArray = []
    if (!Array.isArray(products)) {
      productsArray.push(products)
    } else {
      productsArray = products
    }

    var couponCode = coupon?.code

    switch (event) {
      case 'select_promotion': {
        let ecomObj = {
          creative_name: 'Coupon',
          items: prepareTagManagerItems(productsArray, couponCode, event)
        }

        //Only add properties if values exists
        if (couponCode?.description)
          ecomObj['creative_slot'] = couponCode?.description
        if (couponCode?.code) ecomObj['promotion_id'] = couponCode?.code
        if (couponCode?.description)
          ecomObj['promotion_name'] = couponCode?.description

        return {
          event: event,
          ecommerce: ecomObj
        }
      }
      case 'begin_checkout': {
        couponCode = cart?.appliedCoupons
          ? cart?.appliedCoupons
              .map((c) => {
                return c.code
              })
              .join(', ')
          : null

        let ecomObj = {
          currency: process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY,
          items: prepareTagManagerItems(productsArray, couponCode, event)
        }

        //Only add properties if values exists
        if (cart?.subtotal) ecomObj['value'] = removeCurrency(cart.subtotal)
        if (couponCode) ecomObj['coupon'] = couponCode

        return {
          event: event,
          ecommerce: ecomObj
        }
      }
      case 'view_item_list': {
        let ecomObj = {
          items: prepareTagManagerItems(productsArray, couponCode, event)
        }
        //Only add properties if values exists
        if (category?.id) ecomObj['item_list_id'] = category?.id
        if (category?.name) ecomObj['item_list_name'] = category?.name

        return {
          event: event,
          ecommerce: ecomObj
        }
      }
      case 'purchase': {
        couponCode = cart?.appliedCoupons
          ? cart?.appliedCoupons
              .map((c) => {
                return c.code
              })
              .join(', ')
          : null

        let ecomObj = {
          currency: process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY,
          items: prepareTagManagerItems(productsArray, couponCode, event)
        }

        //Only add properties if values exists
        if (order.orderNumber) ecomObj['transaction_id'] = order.orderNumber
        if (order.total) ecomObj['value'] = removeCurrency(order.total)
        if (order.totalTax) ecomObj['tax'] = removeCurrency(order.totalTax)
        if (order.shippingTotal)
          ecomObj['shipping'] = removeCurrency(order.shippingTotal)
        if (couponCode) ecomObj['coupon'] = couponCode

        return {
          event: event,
          ecommerce: ecomObj
        }
      }
      case 'view_item': {
        let ecomObj = {
          currency: process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY,
          items: prepareTagManagerItems(
            productsArray,
            null,
            event,
            quantity,
            false
          )
        }
        var currentPrice = resolvePrice(products, false)
        if (currentPrice) {
          ecomObj['value'] = removeCurrency(currentPrice)
        } else {
          ecomObj['value'] = 0
        }

        return {
          event: event,
          ecommerce: ecomObj
        }
      }
      case 'add_to_cart': {
        let totalVal = removeCurrency(addToCartTotal)
        let ecomObj = {
          currency: process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY,
          items: prepareTagManagerItems(
            productsArray,
            null,
            event,
            quantity,
            totalVal
          )
        }

        if (totalVal) ecomObj['value'] = totalVal
        else ecomObj['value'] = 0

        return {
          event: event,
          ecommerce: ecomObj
        }
      }
      case 'remove_from_cart': {
        let totalVal = removeCurrency(products.subtotal)
        let ecomObj = {
          currency: process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY,
          items: prepareTagManagerItems(
            productsArray,
            null,
            event,
            products.qty,
            totalVal
          )
        }
        //Only add properties if values exists
        if (totalVal) ecomObj['value'] = totalVal
        else ecomObj['value'] = 0

        return {
          event: event,
          ecommerce: ecomObj
        }
      }
      default:
        console.warn('Event not supported')
    }
  } catch (err) {
    //Do nothing
    console.warn(err)
  }
}

const prepareTagManagerItems = (products, coupon, event, quantity, total) => {
  var items = []
  products.map((product) => {
    var item = {}
    //Only add properties if values exists
    if (product?.sku && product?.sku != 'N/A') item['item_id'] = product?.sku
    if (product?.name) item['item_name'] = product?.name

    if (coupon?.code) item['coupon'] = coupon?.code

    //if (product?.productId) item['index'] = product?.productId

    if (event === 'add_to_cart' || event === 'remove_from_cart') {
      item['price'] = total
      item['quantity'] = quantity
    } else if (event === 'select_promotion') {
      item['price'] = removeCurrency(product.subtotal)
      item['quantity'] = product.qty
    } else if (event === 'begin_checkout') {
      item['price'] = removeCurrency(product.subtotal)
      item['quantity'] = product.qty
      if (coupon) item['coupon'] = coupon //There can be multiple coupons at this point, hence we show a comma seperated list of codes
    } else if (event === 'purchase') {
      item['price'] = removeCurrency(product.subtotal)
      item['quantity'] = product.qty
      if (coupon) item['coupon'] = coupon //There can be multiple coupons at this point, hence we show a comma seperated list of codes
    } else {
      var itemPrice = resolvePrice(product, false)
      if (itemPrice) {
        item['price'] = removeCurrency(itemPrice)
      } else {
        item['price'] = 0
      }

      product?.quantity
        ? (item['quantity'] = product?.quantity)
        : (item['quantity'] = 1)
    }

    //Add categories
    if (product?.productCategories?.edges)
      item = addTagManagerItemCategories(
        item,
        product?.productCategories?.edges
      )

    items.push(item)
  })

  return items
}

const addTagManagerItemCategories = (item, categories) => {
  categories.map((category, index) => {
    item[dynamicCatName(index)] = category.node?.name
  })

  return item
}

const dynamicCatName = (index) => {
  var postFix = index == 0 ? '' : index + 1
  return 'item_category' + postFix
}
