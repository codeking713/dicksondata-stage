import AddToCartButton from '@/components/molecules/Checkout/AddToCartButton/AddToCartButton'
import PageNotifications from '@/components/molecules/PageNotifications'
import ProductQuantity from '@/components/molecules/Product/ProductQuantity'
import {getFloatVal} from '@/functions/checkout/commonUtil'
import {
  addonPriceCalc,
  getBundleSelectedVariation
} from '@/functions/product/productUtil'
import {getTranslation} from '@/functions/utility'
import classNames from 'classnames'
import {useState} from 'react'
import ProductDetailsSummaryLineitem from '../ProductDetailsSummaryLineitem'
import styles from './ProductDetailsSummary.module.scss'

const ProductDetailsSummary = ({
  product,
  selectedVariationCombinations,
  setSelectedVariationCombinations,
  className,
  purchasableProduct,
  selectedProductAddons,
  setSelectedProductAddons,
  selectedProductComposites,
  selectedVariations,
  selectedProductBundles,
  headlessConfig,
  showPrice
}) => {
  const [quantity, setQuantity] = useState(1)
  const currencyUnit = '$'

  const handleQuantityUpdate = (newQuantity) => {
    setQuantity(newQuantity)
  }

  const convertCurrencyToNumber = (currency) => {
    const cur_re = /\D*(\d+|\d.*?\d)(?:\D+(\d{2}))?\D*$/
    const parts = cur_re.exec(currency)
    const number = parseFloat(
      parts[1].replace(/\D/, '') + '.' + (parts[2] ? parts[2] : '00')
    )

    return number.toFixed(2)
  }

  const applyDiscount = (price, discount, quantity) => {
    return (Number(price * quantity) * Number(discount)) / 100
  }

  //The purpose of this method is to calculate the preview price of the product
  //This mainly applies to bundle and composite products where if they are price individually, we need to do the calculation on the client side
  const getBundleCompositeProductPrice = (product, bundleCompositeQuantity) => {
    if (product?.type === 'BUNDLE') {
      //Loop through the child products
      let productPrice =
        (product.price ? getFloatVal(product.price) : 0) *
        bundleCompositeQuantity
      selectedProductBundles
        ?.filter((c) => c.selectedOptionId)
        ?.forEach((bundle) => {
          if (bundle.priceIndividually) {
            //If a bundle is marked as priceIndividually
            //we will add the child products price, addon and variation price also to the parent price
            let finalPrice = 0
            if (bundle.node.__typename === 'SimpleProduct') {
              finalPrice = getFloatVal(bundle.node.price)
              productPrice +=
                finalPrice * bundle.quantity * bundleCompositeQuantity
            } else if (bundle.node.__typename === 'VariableProduct') {
              let v = selectedVariations.find(
                (a) =>
                  a.composite_id === bundle.bundledItemId &&
                  a.product_id === bundle.selectedOptionId &&
                  a.selectedOptionId &&
                  a.selectedOptionId !== null
              )

              if (v) {
                //Valid varient found
                finalPrice = v.node.price ? getFloatVal(v.node.price) : 0
                productPrice +=
                  finalPrice * bundle.quantity * bundleCompositeQuantity
              }
            }

            //addon prices
            let addons = selectedProductAddons.filter(
              (a) =>
                a.composite_id === bundle.bundledItemId && a.selectedOptionId
            )

            addons.forEach((addon) => {
              addon?.options.map((a) => {
                if (addon?.selectedOptionId === a.id) {
                  productPrice += Number(
                    addonPriceCalc(
                      a.price_type,
                      a.price,
                      bundle.quantity * bundleCompositeQuantity
                    )
                  )
                }
              })
            })

            //discount percentage? apply the discount
            if (bundle.discount) {
              productPrice -= applyDiscount(
                finalPrice,
                bundle.discount,
                bundle.quantity * bundleCompositeQuantity
              )
            }
          }
        })
      return productPrice.toFixed(2)
    } else if (product?.type === 'COMPOSITE') {
      //Loop through the child products
      let productPrice =
        (product.price ? getFloatVal(product.price) : 0) *
        bundleCompositeQuantity
      selectedProductComposites
        ?.filter((c) => c.selectedCompositeOptionId)
        .forEach((composite) => {
          if (composite.pricedIndividually) {
            let finalPrice = 0

            var comOption = composite.options.nodes.find(
              (o) => o.databaseId === composite.selectedOptionId
            )

            if (comOption) {
              if (comOption.__typename === 'SimpleProduct') {
                finalPrice = getFloatVal(comOption.price)
                productPrice +=
                  finalPrice * composite.quantity * bundleCompositeQuantity
              } else if (comOption.__typename === 'VariableProduct') {
                let vs = selectedVariations.find(
                  (a) =>
                    a.composite_id === composite.databaseId &&
                    a.product_id === composite.selectedOptionId &&
                    a.selectedOptionId &&
                    a.selectedOptionId !== null
                )

                if (vs) {
                  //Valid varient found
                  finalPrice = getFloatVal(vs.node.price)
                  productPrice +=
                    finalPrice * composite.quantity * bundleCompositeQuantity
                }
              }
            }

            //addon prices
            let addons = selectedProductAddons.filter(
              (a) =>
                a.composite_id === composite.databaseId && a.selectedOptionId
            )

            addons.forEach((addon) => {
              addon?.options.map((a) => {
                if (addon?.selectedOptionId === a.id) {
                  productPrice += Number(
                    addonPriceCalc(
                      a.price_type,
                      a.price,
                      composite.quantity * bundleCompositeQuantity
                    )
                  )
                }
              })
            })

            //discount percentage? apply the discount
            if (composite.discount) {
              productPrice -= applyDiscount(
                finalPrice,
                composite.discount,
                composite.quantity * bundleCompositeQuantity
              )
            }
          }
        })
      return productPrice.toFixed(2)
      //If a composit is marked as pricedIndividually we will add the child products price, addon and variation price also to the parent price
    }

    //This is the price of regular simple and variable products
    return product.price
  }

  const getSubtotal = (price) => {
    //Determin the subtotal based on pricedIndividually and discount

    if (product.type === 'SIMPLE' || product.type === 'VARIABLE') {
      const parsedPrice = price ? parseFloat(convertCurrencyToNumber(price)) : 0
      const parsedCalibrationPrice = parseFloat(
        convertCurrencyToNumber(getProductAddonPrices())
      )

      if (parsedPrice) {
        return Number(quantity * parsedPrice + parsedCalibrationPrice).toFixed(
          2
        )
      } else {
        return 'N/A'
      }
    } else {
      //Composite and bundle products
      return getBundleCompositeProductPrice(product, quantity)
    }
  }

  const handleClearAddons = (addon) => {
    var updatedAddons = selectedProductAddons.map((a) => {
      if (
        a.product_id === addon.product_id &&
        addon.selectedOptionId === a.selectedOptionId
      ) {
        return {
          ...a,
          selectedOption: null,
          selectedOptionId: null,
          selectedOptionPrice: null
        }
      }
      return a
    })

    setSelectedProductAddons(updatedAddons)
  }

  const handleClearVariation = (variation) => {
    var updatedVariationCombination = selectedVariationCombinations.map(
      (vc) => {
        if (
          vc.id === variation.id &&
          vc.selectedOption === variation.selectedOption
        ) {
          return {
            ...vc,
            selectedOption: null
          }
        }
        return vc
      }
    )

    setSelectedVariationCombinations(updatedVariationCombination)
  }

  const handleClearCompositeVariation = (variation) => {
    var updatedVariationCombination = selectedVariationCombinations.map(
      (vc) => {
        if (
          vc.composite_id === variation.composite_id &&
          vc.product_id === variation.product_id
        ) {
          return {
            ...vc,
            selectedOption: null
          }
        }
        return vc
      }
    )

    setSelectedVariationCombinations(updatedVariationCombination)
  }

  const summaryClassnames = classNames(className, styles.summary)

  const [productsListNotification, setProductsListNotification] = useState(null)

  const handleNotifyError = (notification) => {
    setProductsListNotification(notification)
  }

  const getProductAddonPrices = () => {
    var addonTotalPrice = 0

    //If the product is a bundle or composite, the addon amounts are not seems to be added to the cart total
    //Hence if the product is a bundle or composite, we are exclude it from addon price calculation
    if (product.type === 'VARIABLE' || product.type === 'SIMPLE') {
      var appliedAddons = selectedProductAddons?.filter((a) => a.selectedOption)
      appliedAddons?.forEach((addon) => {
        addon?.options.map((a) => {
          if (addon?.selectedOptionId === a.id) {
            addonTotalPrice += Number(
              addonPriceCalc(a.price_type, a.price, quantity)
            )
          }
        })
      })
    }

    return addonTotalPrice
  }

  return (
    <div className={summaryClassnames}>
      <div className={styles.summary__inner}>
        <div className={styles.summary__inner__top}>
          <div className={styles.summary__inner__top__heading}>
            {getTranslation(headlessConfig, 'SUMMARY')}
          </div>
          {showPrice &&
            purchasableProduct &&
            purchasableProduct?.purchasable && (
              <ProductQuantity
                handleQuantityUpdate={handleQuantityUpdate}
                defaultQuantity={quantity}
                quantityMax={999999}
                quantityMin={1}
              />
            )}
        </div>
        <div className={styles.summary__inner__desc}>
          <div className={styles.summary__inner__desc__product}>
            {getTranslation(headlessConfig, 'PRODUCT')}
          </div>
          <div className={styles.summary__inner__desc__price}>
            {showPrice && getTranslation(headlessConfig, 'PRICE')}
          </div>
        </div>
        <div className={styles.summary__inner__item}>
          <div className={styles.summary__inner__item__main}>
            <div className={styles.summary__inner__item__main__thumb}>
              {product?.image?.sourceUrl ? (
                <img
                  src={product?.image?.sourceUrl}
                  srcSet={product?.image?.srcSet}
                  alt={product?.image?.altText}
                  height={
                    product?.image?.mediaDetails?.height
                      ? product?.image?.mediaDetails?.height
                      : 40
                  }
                  width={
                    product?.image?.mediaDetails?.width
                      ? product?.image?.mediaDetails?.width
                      : 40
                  }
                />
              ) : (
                <img
                  src="/images/product-thumb-placeholder.svg"
                  alt="Image placeholder"
                />
              )}
            </div>
            <div className={styles.summary__inner__item__main__product}>
              {purchasableProduct?.name}
            </div>
            <div className={styles.summary__inner__item__main__price}>
              {showPrice && purchasableProduct?.price}
            </div>
          </div>
          {(product.type === 'SIMPLE' || product.type === 'VARIABLE') &&
            selectedVariationCombinations.map((variation, index) => (
              <div key={`summary-line-${index}`}>
                <ProductDetailsSummaryLineitem
                  option={{
                    ...variation,
                    selectedOptionPrice: selectedVariations.find(
                      (a) => a.selectedOptionId
                    )?.node?.price
                  }}
                  isVariation={true}
                  handleClearVariation={handleClearVariation}
                  headlessConfig={headlessConfig}
                  showPrice={showPrice}
                />
              </div>
            ))}

          {selectedProductAddons
            ?.filter((a) => a.composite_id === null) //Important that we do not show the composite children products addon on the first level. They will need to be displayed within the relavent composite product child
            .map((selectedAddon, index) => (
              <div key={`summary-line-${index}`}>
                <ProductDetailsSummaryLineitem
                  option={selectedAddon}
                  handleClearAddons={handleClearAddons}
                  isProductAddon={true}
                  showPrice={showPrice}
                  headlessConfig={headlessConfig}
                />
              </div>
            ))}
          {selectedProductComposites
            ?.filter((b) => b.selectedCompositeOptionId)
            ?.map((selectedComposite, index) => (
              <div key={`summary-line-${index}`}>
                <ProductDetailsSummaryLineitem
                  option={selectedComposite}
                  handleClearVariation={handleClearVariation}
                  handleClearAddons={handleClearAddons}
                  handleClearCompositeVariation={handleClearCompositeVariation}
                  isComposite={true}
                  compositeAddons={selectedProductAddons?.filter(
                    (a) =>
                      a.composite_id === selectedComposite.databaseId &&
                      a.product_id === selectedComposite.selectedOptionId
                  )}
                  compositeVariation={getBundleSelectedVariation(
                    selectedVariations,
                    selectedComposite
                  )}
                  showPrice={showPrice}
                  headlessConfig={headlessConfig}
                />
              </div>
            ))}
          {selectedProductBundles
            ?.filter((b) => b.selectedOptionId)
            ?.map((selectedBundle, index) => (
              <div key={`summary-line-${index}`}>
                <ProductDetailsSummaryLineitem
                  option={selectedBundle}
                  handleClearVariation={handleClearVariation}
                  handleClearAddons={handleClearAddons}
                  isBundle={true}
                  compositeAddons={selectedProductAddons?.filter(
                    (a) =>
                      a.composite_id === selectedBundle.databaseId &&
                      a.product_id === selectedBundle.selectedOptionId
                  )}
                  compositeVariation={getBundleSelectedVariation(
                    selectedVariations,
                    selectedBundle
                  )}
                  selectedVariationCombinations={selectedVariationCombinations?.filter(
                    (a) =>
                      a.composite_id === selectedBundle.databaseId &&
                      a.product_id === selectedBundle.selectedOptionId
                  )}
                  showPrice={showPrice}
                  headlessConfig={headlessConfig}
                />
              </div>
            ))}
        </div>
        {purchasableProduct && purchasableProduct?.purchasable && (
          <>
            <div className={styles.summary__inner__total}>
              {showPrice && (
                <>
                  <div className={styles.summary__inner__total__heading}>
                    {getTranslation(headlessConfig, 'SUBTOTAL')}:
                  </div>
                  <div className={styles.summary__inner__total__price}>
                    {`${currencyUnit}${getSubtotal(
                      purchasableProduct?.subTotal
                    )}`}
                  </div>
                </>
              )}
            </div>
            <AddToCartButton
              product={purchasableProduct}
              className={styles.product__summary__inner__addtocart}
              handleNotifyError={handleNotifyError}
              addToCardVariableProduct={product.type === 'VARIABLE'}
              addToCardCompositeProduct={product.type === 'COMPOSITE'}
              addToCardBundleProduct={product.type === 'BUNDLE'}
              selectedProductComposites={selectedProductComposites
                ?.filter((c) => c.selectedCompositeOptionId)
                ?.filter((c) => c.selectedOption)}
              selectedProductAddons={selectedProductAddons?.filter(
                (a) => a.selectedOption
              )}
              quantity={quantity}
              selectedVariations={selectedVariations}
              selectedProductBundles={selectedProductBundles?.filter(
                (b) => b.selectedOptionId
              )}
              totalAmount={getSubtotal(purchasableProduct?.subTotal)}
            />
            <PageNotifications
              {...productsListNotification}
              closeNotification={() => setProductsListNotification(null)}
              className={styles.products__content__notification}
            />
          </>
        )}
        <button className={styles.summary__inner__viewcart}>
          {getTranslation(headlessConfig, 'VIEW_CART')}
        </button>
        <div className={styles.summary__inner__message}></div>
      </div>
    </div>
  )
}

export default ProductDetailsSummary
