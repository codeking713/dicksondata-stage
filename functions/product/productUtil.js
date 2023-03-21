/**
 * Get Price Ranges
 *
 * @return {Array} Array of price ranges
 */
export const getPriceRanges = () => {
  return [
    {
      id: 'under_100',
      name: 'under_100',
      label: 'UNDER_100',
      value: '0_100'
    },
    {
      id: 'from_100_to_200',
      name: 'from_100_to_200',
      label: '100_TO_200',
      value: '100_200'
    },
    {
      id: 'from_200_to_400',
      name: 'from_200_to_400',
      label: '200_TO_400',
      value: '200_400'
    },
    {
      id: 'from_400_and_Above',
      name: 'from_400_and_Above',
      label: '400_ABOVE',
      value: `400_0`
    }
  ]
}

/**
 * Format Product Data
 *
 * @param  {object} data Raw product data
 * @return {object}      Formatted product dat
 */
export const formatProductData = (data) => {
  if (!data || data.length === 0) return null

  var formattedCategories = []
  for (let i = 0; i < data.length; i++) {
    const givenCategory = data?.[i]
    const category = {}
    category.count = givenCategory?.count ?? 0
    category.pageInfo = givenCategory?.products?.pageInfo
    category.databaseId = givenCategory?.databaseId ?? 0
    category.id = givenCategory?.id ?? ''
    category.name = givenCategory?.name ?? ''
    category.slug = givenCategory?.slug ?? ''
    category.pageInfo = givenCategory?.products?.pageInfo

    //Format the product structure for ease of use
    var formattedProducts = []
    for (let j = 0; j < givenCategory?.products?.nodes?.length; j++) {
      formattedProducts.push(givenCategory.products?.nodes[j])
    }
    category.products = formattedProducts

    formattedCategories.push(category)
  }

  return formattedCategories
}

/**
 * Format Product Tag by category
 *
 * @param  {Array}  productTags Product tags
 * @return {object}             Formatted product tags by category
 */
export const formatProductTagsByCategory = (productTags) => {
  var tagCategories = []

  productTags?.forEach((productTag) => {
    productTag?.products?.nodes?.forEach((product) => {
      product?.productCategories?.nodes?.forEach((category) => {
        var tagCategoryExists = tagCategories.find(
          (a) =>
            a.categoryId === category.databaseId &&
            a.tagId === productTag.databaseId
        )
        if (tagCategoryExists) {
          tagCategoryExists.count = Number(tagCategoryExists.count) + 1
        } else {
          tagCategories.push({
            categoryId: category.databaseId,
            tagName: productTag.name,
            tagId: productTag.databaseId,
            count: 1,
            slug: productTag.slug
          })
        }
      })
    })
  })

  return tagCategories
}

export const getVariableAttributeDetails = (combinations, attributes) => {
  var attributeDetails = []

  for (let attribute of attributes) {
    var matchingAttribute = findAttributeInVariationCombination(
      attribute,
      combinations
    )
    if (matchingAttribute && matchingAttribute !== null)
      attributeDetails.push(matchingAttribute)
  }

  return attributeDetails
}

const findAttributeInVariationCombination = (attribute, combinations) => {
  for (let combination of combinations) {
    for (let term of combination.terms.nodes) {
      if (Number(term.databaseId) === Number(attribute)) {
        return term
      }
    }
  }

  return null
}

export const resolveProductVarientByAttributes = (
  selectedVariationList,
  productVariations
) => {
  //Available Product Variants
  //v1 - a1, a3
  //v2 - a1
  //v3 - a3

  //Selection a1, pick v2
  //Selection a1 and a2, pick v1
  //Selectipn a3, pick v3

  var selectionArray = selectedVariationList.reduce(function (result, element) {
    if (element.selectedOption) result.push(String(element.selectedOption))
    return result
  }, [])

  if (selectionArray && selectionArray.length > 0) {
    var variantViseAttributes = productVariations.map((variant) => {
      var assignedAttributes = variant.node.attributes.edges.reduce(function (
        result,
        variableAttributes
      ) {
        if (variableAttributes.node.attributeId !== '')
          result.push(String(variableAttributes.node.attributeId))
        return result
      },
      [])
      return {
        variantId: variant.node.databaseId,
        sku: variant.node.sku,
        attributes: assignedAttributes,
        name: variant.node.name,
        price: variant.node.price,
        product_id: variant.product_id,
        composite_id: variant.composite_id,
        variant: variant,
        stockStatus: variant?.node?.stockStatus
      }
    })

    for (let variantViseAttribute of variantViseAttributes) {
      let result = fullMatchArrays(
        selectionArray,
        variantViseAttribute.attributes
      )

      if (result) {
        return variantViseAttribute
      }
    }
  }

  return null
}

export const resolveBundleCompositeProductVarientByAttributes = (
  selectedVariationList,
  productVariations
) => {
  //Available Product Variants
  //v1 - a1, a3
  //v2 - a1
  //v3 - a3

  //Selection a1, pick v2
  //Selection a1 and a2, pick v1
  //Selectipn a3, pick v3

  var selectedVarients = []

  var selectionArrayTemp = selectedVariationList.map((element) => {
    if (element.selectedOption && element.selectedOption !== null) {
      return {
        id: String(element.selectedOption),
        composite_id: element.composite_id,
        product_id: element.product_id
      }
    }
  })
  var selectionArray = selectionArrayTemp.filter((a) => a)

  if (selectionArray && selectionArray.length > 0) {
    var variantViseAttributes = productVariations.map((variant) => {
      let assignedAttributes = variant.node.attributes.edges.map((i) => {
        if (i.node.attributeId !== '') return String(i.node.attributeId)
      })
      return {
        variantId: variant.node.databaseId,
        sku: variant.node.sku,
        attributes: assignedAttributes.filter((i) => i),
        name: variant.node.name,
        price: variant.node.price,
        product_id: variant.product_id,
        composite_id: variant.composite_id,
        variant: variant
      }
    })

    for (let variantViseAttribute of variantViseAttributes) {
      let comspositeViseSelections = selectionArray
        .filter(
          (s) =>
            variantViseAttribute.product_id === s.product_id &&
            variantViseAttribute.composite_id === s.composite_id
        )
        .map((a) => {
          return a.id
        })

      let result = fullMatchArrays(
        comspositeViseSelections,
        variantViseAttribute.attributes
      )

      if (result) {
        selectedVarients.push(variantViseAttribute)
      }
    }
  }

  return selectedVarients
}

export const fullMatchArrays = (a, b) => {
  if (a.length !== b.length) return false
  const uniqueValues = new Set([...a, ...b])
  for (const v of uniqueValues) {
    const aCount = a.filter((e) => e === v).length
    const bCount = b.filter((e) => e === v).length
    if (aCount !== bCount) return false
  }
  return true
}

export const partialMatchArrays = (a, b) => {
  var anyMatches = []
  a.forEach((ea) => {
    if (b.filter((be) => be === ea).length > 0) {
      anyMatches.push(true)
    } else {
      anyMatches.push(false)
    }
  })
  return anyMatches.every((a) => a)
}

const optionLabelToValueConvert = (label, index) => {
  return `${label.toLowerCase().replace(/\s+/g, '-')}-${index}`
}

/**
 * Format Product Addons
 *
 * @param  {Array}  productAddons Product addons
 * @return {object}               Formatted product addons
 */
export const formatProductAddons = (productAddons) => {
  var formattedProductAddons = []

  productAddons?.forEach((productAddon) => {
    var newOptions = []
    productAddon?.options?.forEach((option, index) => {
      newOptions.push({
        id: optionLabelToValueConvert(option.label, index + 1),
        image: option.image,
        label: option.label,
        price: option.price,
        price_type: option.price_type
      })
    })
    var newAddon = {...productAddon, options: newOptions}
    formattedProductAddons.push(newAddon)
  })

  return formattedProductAddons
}

/**
 * Check if a child is a composite product
 *
 * @param  {object}  item Product
 * @return {boolean}      Indicate if the product is a child of a composite product
 */
export const isCompositeProductChild = (item) => {
  return item?.parentCompositId !== undefined
}

/**
 * Get the filtered variations for each bundle product
 *
 * @param  {Array}   selectedVariations Selected Variations
 * @param  {Array}   selectedBundle     Selected Bundle
 * @return {boolean}                    Filtered variations
 */
export const getBundleSelectedVariation = (
  selectedVariations,
  selectedBundle
) => {
  var filtered = selectedVariations?.find(
    (a) =>
      a.composite_id === selectedBundle.databaseId &&
      a.product_id === selectedBundle.selectedOptionId &&
      a.selectedOptionId &&
      a.selectedOptionId !== null &&
      selectedBundle.selectedOptionId &&
      selectedBundle.selectedOptionId !== null
  )
  return filtered
}

/**
 * Get the addon price based on type
 *
 * @param  {string} type     Type
 * @param  {number} price    Price
 * @param  {number} quantity Quantity
 * @return {number}          Addon price
 */
export const addonPriceCalc = (type, price, quantity) => {
  var addonTotalPrice = 0
  if (type === 'flat_fee') {
    addonTotalPrice += Number(price)
  } else if (type === 'quantity_based') {
    addonTotalPrice += Number(price) * quantity
  }
  return addonTotalPrice
}

/**
 * Find if product is out of stock
 *
 * @param  {object}  product Product
 * @return {boolean}         In Stock or out of stock
 */
export const isOutOfStock = (product) => {
  return product?.stockStatus == 'OUT_OF_STOCK'
}

/**
 * Return price string with $. E.g (+$99.00)
 *
 * @param  {object}  price price
 * @return {boolean}       In Stock or out of stock
 */
export const getAddonPriceString = (price) => {
  if (!price) return null

  const priceVal = Number(price.replace('$', '')).toFixed(2)

  return '(+$' + priceVal + ')'
}
