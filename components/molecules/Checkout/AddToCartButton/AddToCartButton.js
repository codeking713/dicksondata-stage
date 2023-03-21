import Button from '@/components/atoms/Button'
import {AppContext} from '@/components/context/AppContext'
import {getFormattedCart} from '@/functions/checkout/checkoutUtil'
import {
  languageRestrictsPerchase,
  prepareTagManagerDataLayerObj,
  showRequestQuote
} from '@/functions/checkout/commonUtil'
import {
  getBundleSelectedVariation,
  isOutOfStock
} from '@/functions/product/productUtil'
import {getTranslation} from '@/functions/utility'
import ADD_TO_CART from '@/lib/next-api/wordpress/checkout/add-to-cart'
import ADD_TO_CART_BUNDLE_PRODUCT from '@/lib/next-api/wordpress/checkout/add-to-cart-bundle-product'
import ADD_TO_CART_COMPOSITE_PRODUCT from '@/lib/next-api/wordpress/checkout/add-to-cart-composite-product'
import {useMutation} from '@apollo/client'
import classNames from 'classnames'
import {useWordPressContext} from 'components/common/WordPressProvider'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useContext, useState} from 'react'
import TagManager from 'react-gtm-module'
import {v4} from 'uuid'
import styles from './AddToCartButton.module.scss'

const AddToCart = ({
  product,
  handleNotifyError,
  className,
  addToCardVariableProduct,
  addToCardCompositeProduct,
  addToCardBundleProduct,
  selectedProductAddons,
  selectedProductComposites,
  quantity = 1,
  selectedVariations,
  selectedProductBundles,
  productOverview,
  totalAmount
}) => {
  const {headlessConfig} = useWordPressContext()
  const filterAddons = (addons, productId) => {
    var addonData = addons
      ?.filter((p) => p.product_id === productId)
      .map((addon) => {
        //get selected
        var selectOption = addon?.options?.find(
          (o) => o.id === addon.selectedOptionId
        )
        return {
          name: addon.name,
          field_name: addon.field_name,
          value: addon.selectedOptionId,
          price_type: selectOption?.price_type,
          price: selectOption?.price,
          image: selectOption?.image,
          label: selectOption?.label,
          composite_id: addon.composite_id,
          product_id: addon.product_id
        }
      })

    return addonData
  }

  const constructExtraData = () => {
    var extraData = {}

    var addonData = []
    //For now we assume, composite and bundle parent product do not support addons
    addonData = filterAddons(selectedProductAddons, product.databaseId)

    if (addonData && addonData.length > 0) extraData.addons = addonData

    if (selectedProductComposites && selectedProductComposites.length > 0) {
      let obj = {}
      selectedProductComposites?.map((composite) => {
        if (composite.selectedOptionId) {
          obj = formatCompositeProducts(composite, obj)
        }
      })
      extraData = obj
    }

    if (selectedProductBundles && selectedProductBundles.length > 0) {
      //extraData.configuration = []
      let obj = {}
      selectedProductBundles?.map((bundle) => {
        if (bundle.selectedOptionId) {
          obj = formatBundleProducts(bundle, obj)
        }
      })
      extraData = obj
    }
    return extraData
  }

  //Prepare the request payload to reflect the defined mentioned in the official docs
  //https://woocommerce.com/document/composite-products/composite-products-functions-reference/
  const formatCompositeProducts = (composite, obj) => {
    let addons = filterAddons(
      selectedProductAddons.filter(
        (a) => a.composite_id === composite.databaseId
      ),
      composite.selectedOptionId
    )

    var filteredVariation = getBundleSelectedVariation(
      selectedVariations,
      composite
    )

    var varientAttributes = null
    if (
      filteredVariation &&
      filteredVariation?.variationAttributeDetails?.length > 0
    ) {
      varientAttributes = {}
      filteredVariation?.variationAttributeDetails?.map((a) => {
        varientAttributes['attribute_' + a.taxonomyName] = a.slug
      })
    }

    var selectedOption = composite.options.nodes.find(
      (a) => a.databaseId === composite.selectedOptionId
    )

    var formattedCompositeProductVarient = {
      product_id: composite.selectedOptionId,
      quantity: composite.quantity,
      quantity_min: composite.quantityMin,
      quantity_max: composite.quantityMax,
      discount: composite.discount,
      optional: composite.optional,
      title: composite.title,
      composite_id: product.databaseId,
      type: selectedOption?.type
    }

    if (filteredVariation?.selectedOptionId) {
      formattedCompositeProductVarient.variation_id =
        filteredVariation.selectedOptionId
    }

    if (varientAttributes) {
      formattedCompositeProductVarient.attributes = varientAttributes
    }

    //If the bundle item/product has addons, we will add it here
    if (addons && addons.length > 0) {
      formattedCompositeProductVarient.addons = addons
    }

    obj[composite.databaseId] = formattedCompositeProductVarient

    var result = {}
    result['composite_data'] = obj
    return obj
  }

  //Prepare the request payload to reflect the defined mentioned in the official docs
  //https://woocommerce.com/document/bundles/bundles-functions-reference/
  const formatBundleProducts = (bundle, obj) => {
    //Figure out bundle addons

    let addons = filterAddons(
      selectedProductAddons.filter(
        (a) => a.composite_id === bundle.bundledItemId
      ),
      bundle.selectedOptionId
    )

    var formattedBundleProductObj = {
      product_id: bundle.selectedOptionId,
      quantity: bundle.quantity
    }

    if (bundle.node.__typename === 'VariableProduct') {
      var filteredVariation = getBundleSelectedVariation(
        selectedVariations,
        bundle
      )

      if (filteredVariation) {
        var varientAttributes = {}
        filteredVariation?.variationAttributeDetails?.map((a) => {
          varientAttributes['attribute_' + a.taxonomyName] = a.slug
        })

        formattedBundleProductObj.variation_id = filteredVariation.variation_id
        formattedBundleProductObj.attributes = varientAttributes
      }
    }

    //If the bundle item/product has addons, we will add it here
    if (addons && addons.length > 0) {
      formattedBundleProductObj.addons = addons
    }

    obj[bundle.bundledItemId] = formattedBundleProductObj

    return obj
  }

  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId:
      product.type === 'VARIABLE' ? product?.variantId : product?.databaseId, //If the product type is VARIABLE, we need to use the variationID to checkout
    extraData: JSON.stringify(constructExtraData()),
    quantity: quantity
  }

  const router = useRouter()
  const [, setCart] = useContext(AppContext)
  const [showViewCart, setShowViewCart] = useState(false)
  const [selectOptionNavigationLoading, setSelectOptionNavigationLoading] =
    useState(false)

  const updateCartLocally = (data) => {
    // Update cart in the localStorage.
    const updatedCart = getFormattedCart(data)
    localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart))

    // Update cart data in React Context.
    setCart(updatedCart)
  }

  const resolveMutation = (productType) => {
    if (productType === 'COMPOSITE') return ADD_TO_CART_COMPOSITE_PRODUCT
    else if (productType === 'BUNDLE') return ADD_TO_CART_BUNDLE_PRODUCT
    else return ADD_TO_CART
  }

  // Add to Cart Mutation.
  const [addToCart, {loading: addToCartLoading}] = useMutation(
    resolveMutation(product?.type),
    {
      variables: {
        input: productQryInput
      },
      onCompleted: (response) => {
        var updatedCartResponse = null
        if (product?.type === 'COMPOSITE') {
          updatedCartResponse = response.addToCartProductComposite
          updateCartLocally(updatedCartResponse)
        } else if (product?.type === 'BUNDLE') {
          updatedCartResponse = response.addToCartProductBundle
          updateCartLocally(updatedCartResponse)
        } else {
          updatedCartResponse = response.addToCart
          updateCartLocally(updatedCartResponse)
        }

        // 2. Show View Cart Button
        setShowViewCart(true)

        //3. Raise add to cart GTM event
        TagManager.dataLayer({
          dataLayer: {ecommerce: null}
        })
        TagManager.dataLayer({
          dataLayer: prepareTagManagerDataLayerObj(
            product,
            'add_to_cart',
            null,
            null,
            null,
            null,
            quantity,
            totalAmount
          )
        })
      },
      onError: (error) => {
        if (error) {
          handleNotifyError({
            type: 'ERROR',
            message: error?.graphQLErrors?.[0]?.message.replace(/<.*>/gm, ''),
            open: true
          })
        }
      }
    }
  )

  const handleAddToCartClick = async () => {
    handleNotifyError(null)
    await addToCart()
  }

  const handleSelectOption = async (productLink) => {
    setSelectOptionNavigationLoading(true)
    router.push(productLink)
  }

  const handleViewCartClick = () => {
    router.push(product?.externalUrl ?? '/cart')
  }

  const addToCartClassnames = classNames(className, {
    [styles['actions']]: true,
    [styles['grid']]: true,
    [styles['gap-sm']]: true
  })

  const {locale, defaultLocale} = useRouter()

  const renderAddToCartButton = () => {
    var result = false

    if (product?.purchasable) {
      switch (product?.type) {
        case 'SIMPLE':
          result = true
          break
        case 'VARIABLE':
          result = addToCardVariableProduct
          break
        case 'COMPOSITE':
          result = addToCardCompositeProduct
          break
        case 'BUNDLE':
          result = addToCardBundleProduct
          break
        default:
          break
      }
    }

    return result
  }

  //If the language is not EN we will not allow the user to purchase
  if (
    languageRestrictsPerchase(defaultLocale, locale) ||
    showRequestQuote(product?.productMeta)
  ) {
    return (
      <div className={addToCartClassnames}>
        {headlessConfig?.additionalSettings?.productRequestQuotePage?.slug && (
          <Button
            size="sm"
            type="primary"
            text={getTranslation(headlessConfig, 'REQUEST_QUOTE')}
            className={styles.actions__add}
            url={`/${headlessConfig?.additionalSettings?.productRequestQuotePage?.slug}`}
            attributes={{'data-productcardaction': true}}
          />
        )}
      </div>
    )
  }

  return (
    <div className={addToCartClassnames}>
      <div className={`${showViewCart && styles['col-6@lg']}`}>
        {/*	Check if its an external product then put its external buy link */}
        {isOutOfStock(product) ? (
          productOverview && (
            <Button
              size="sm"
              text={getTranslation(headlessConfig, 'READ')}
              type="ghost"
              className={styles.actions__view}
              onClick={() => handleSelectOption(`/product/${product?.slug}`)}
              attributes={{'data-productcardaction': true}}
            />
          )
        ) : 'ExternalProduct' === product?.__typename ? (
          <Button
            size="sm"
            type="primary"
            text={getTranslation(headlessConfig, 'READ')}
            className={styles.actions__add}
            url={product?.externalUrl ?? '/'}
            attributes={{'data-productcardaction': true}}
          />
        ) : renderAddToCartButton() ? (
          <Button
            disabled={addToCartLoading}
            size="sm"
            onClick={() => handleAddToCartClick()}
            type="primary"
            text={
              addToCartLoading
                ? getTranslation(headlessConfig, 'ADDING_TO_CART')
                : getTranslation(headlessConfig, 'ADD_TO_CART')
            }
            className={styles.actions__add}
            attributes={{'data-productcardaction': true}}
          />
        ) : (
          product?.purchasable && (
            <Button
              disabled={selectOptionNavigationLoading}
              size="sm"
              onClick={() => handleSelectOption(`/product/${product?.slug}`)}
              type="primary"
              text={
                selectOptionNavigationLoading
                  ? getTranslation(headlessConfig, 'LOADING')
                  : getTranslation(headlessConfig, 'SELECT_OPTIONS')
              }
              className={styles.actions__add}
              attributes={{'data-productcardaction': true}}
            />
          )
        )}
      </div>
      {showViewCart ? (
        <div className={styles['col-6@lg']}>
          <Button
            size="sm"
            text={getTranslation(headlessConfig, 'VIEW_CART')}
            type="ghost"
            onClick={() => handleViewCartClick()}
            className={styles.actions__view}
            attributes={{'data-productcardaction': true}}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

AddToCart.propTypes = {
  handleNotifyError: PropTypes.func
}

AddToCart.defaultProps = {
  handleNotifyError: function () {}
}

export default AddToCart
