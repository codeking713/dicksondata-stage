import {
  languageRestrictsPerchase,
  resolvePrice,
  resolveRegularPrice,
  showRequestQuote
} from '@/functions/checkout/commonUtil'
import {productDetailsPropTypes} from '@/functions/getPagePropTypes'
import {
  getVariableAttributeDetails,
  isOutOfStock,
  resolveBundleCompositeProductVarientByAttributes,
  resolveProductVarientByAttributes
} from '@/functions/product/productUtil'
import {getTranslation} from '@/functions/utility'
import {useWordPressContext} from 'components/common/WordPressProvider'
import {useRouter} from 'next/router'
import {useEffect, useRef, useState} from 'react'
import {v4} from 'uuid'
import styles from './ProductDetails.module.scss'
import ProductDetailsAdditionalProducts from './ProductDetailsAdditionalProducts'
import ProductDetailsBody from './ProductDetailsBody'
import ProductDetailsGallery from './ProductDetailsGallery'
import ProductDetailsOptions from './ProductDetailsOptions'
import ProductDetailsSummary from './ProductDetailsSummary'
import ProductDetailsTabs from './ProductDetailsTabs'

/**
 * Render the ProductDetails component.
 *
 * @author DAP
 * @param  {object}  props               The component attributes as props.
 * @param  {object}  props.product       Product data from WooComerce.
 * @param  {Array}   props.productAddons Product addons
 * @param  {object}  props.support       Global contact support data.
 * @return {Element}                     The ProductPost component.
 */
const ProductDetails = ({product, support, productAddons}) => {
  const {headlessConfig} = useWordPressContext()
  const {locale, defaultLocale} = useRouter()
  const scrollToRef = useRef(null)
  const scrollToElement = () => {
    scrollToRef.current.style.scrollMargin = '120px'
    scrollToRef.current.scrollIntoView(true)
  }

  const getValidTermsForVarient = (allVarients, attributes) => {
    //Filter-out disabled variations
    var terms = []
    attributes?.terms?.nodes?.forEach((term) => {
      var attrFound = false
      allVarients.forEach((v) => {
        v?.node?.attributes?.edges?.forEach((a) => {
          if (a?.node?.attributeId === term?.databaseId) attrFound = true
        })
      })
      if (attrFound) terms.push(term)
    })
    return {nodes: terms}
  }

  const getAllVarientOptions = () => {
    const varientOptions = []

    //Parent level varients
    var allVarients = getAllProductVariations()
    product?.attributes?.nodes.map((attributes) => {
      var filteredTerms = getValidTermsForVarient(allVarients, attributes)
      varientOptions.push({...{...attributes, terms: filteredTerms}, id: v4()})
    })

    //Composit child product lavel varients
    product?.compositeComponents?.map((comp) => {
      var compositeId = comp.databaseId
      comp?.options?.nodes?.map((compOption) => {
        var productId = compOption.databaseId
        compOption?.attributes?.nodes.map((attributes) => {
          //Filter-out disabled variations
          var filteredTerms = getValidTermsForVarient(allVarients, attributes)
          var newVarient = {
            ...{...attributes, terms: filteredTerms},
            id: v4(),
            product_id: productId,
            composite_id: compositeId
          }
          varientOptions.push(newVarient)
        })
      })
    })

    //Bundle child product lavel varients
    product?.bundleItems?.edges?.map((bundle) => {
      var bundleId = bundle.databaseId
      var productId = bundle.node.databaseId
      bundle?.node?.attributes?.nodes.map((attributes) => {
        //Filter-out disabled variations
        var filteredTerms = getValidTermsForVarient(allVarients, attributes)
        var newVarient = {
          ...{...attributes, terms: filteredTerms},
          id: v4(),
          product_id: productId,
          composite_id: bundleId
        }
        varientOptions.push(newVarient)
      })
    })

    return varientOptions
  }

  const compareMenuOrder = (a, b) => {
    if (a.menuOrder < b.menuOrder) {
      return -1
    }
    if (a.menuOrder > b.menuOrder) {
      return 1
    }
    return 0
  }

  const getInitialProductBundles = () => {
    //Bundles can be optional or mandatory, hence if a bundle is mandatory, we will select it by default. If its optional we will need to let the user select it
    const bundles = product?.bundleItems?.edges?.map((bundle) => {
      //For some wired reason, the 0th index menuOrder is returned as 0, hence we set it to 0 to help sorting
      var menuOrder = bundle.menuOrder ? bundle.menuOrder : 0

      return {
        ...bundle,
        quantity: bundle.defaultQuantity,
        selectedOptionId: !bundle.optional ? bundle.node.databaseId : null,
        selectedOption: !bundle.optional ? bundle.node.name : null,
        menuOrder: menuOrder
      }
    })

    //Note: bundled product sub sections are not properly sorted when quering, hence we need to manually query them using the bundleItems -> edges -> menuOrder
    return bundles?.sort(compareMenuOrder)
  }

  const getInitialProductComposites = () => {
    const composites = product?.compositeComponents?.map((composite) => {
      return {
        ...composite,
        quantity: composite.quantityMin,
        selectedCompositeOptionId: !composite.optional
          ? composite.databaseId
          : null,
        selectedCompositeOption: !composite.optional ? composite.title : null
      }
    })

    //Note: composite sections are already properly sorted when quering data. Hence we dont have to sort them again, unlike bundle products
    return composites
  }

  const getAllProductVariations = () => {
    const variations = []

    //Parent level varients
    product?.variations?.edges.map((varient) => {
      variations.push(varient)
    })

    //Composit child product level varients
    product?.compositeComponents?.map((comp) => {
      var compositeId = comp.databaseId
      comp?.options?.nodes?.map((compOption) => {
        var productId = compOption.databaseId
        compOption?.variations?.edges.map((varient) => {
          var newVarient = {
            ...varient,
            id: v4(),
            product_id: productId,
            variation_id: varient.node.databaseId,
            composite_id: compositeId
          }
          variations.push(newVarient)
        })
      })
    })

    //Bundle child product level varients
    product?.bundleItems?.edges?.map((bundle) => {
      var bundleId = bundle.bundledItemId
      var productId = bundle.node.databaseId
      bundle?.node?.variations?.edges.map((varient) => {
        var newVarient = {
          ...varient,
          id: v4(),
          product_id: productId, //This is the varient parent id
          variation_id: varient.node.databaseId,
          composite_id: bundleId //We do not have a parent ID for the bundle product, hence we use a unique ID for now
        }
        variations.push(newVarient)
      })
    })

    return variations
  }

  const [selectedVariationCombinations, setSelectedVariationCombinations] =
    useState(getAllVarientOptions())
  const [selectedProductAddons, setSelectedProductAddons] =
    useState(productAddons)

  const [selectedProductComposites, setSelectedProductComposites] = useState(
    getInitialProductComposites()
  )

  const [selectedProductBundles, setSelectedProductBundles] = useState(
    getInitialProductBundles()
  )

  const [selectedVariations, setSelectedVariations] = useState(
    getAllProductVariations()
  )

  const isInitProductPurchaseable = (product) => {
    if (product?.type === 'VARIABLE') {
      return false // we disallow add to cart as this is the parent product of variations
    } else if (product?.type === 'COMPOSITE') {
      //Conditionally checking if the required child items are added to the composite product
      let totalcompositeFulfilled = selectedProductComposites
        ?.filter((c) => c.selectedCompositeOptionId)
        .every((comp) => {
          var compositeId = comp.databaseId
          var results = []

          if (comp.selectedOptionId && comp.selectedOptionId != null) {
            var option = comp.options.nodes.find(
              (a) => a.databaseId === comp.selectedOptionId
            )

            if (option) {
              if (option.__typename === 'VariableProduct') {
                var compositeFulfilled = selectedVariations.find(
                  (a) =>
                    a.composite_id === compositeId &&
                    a.product_id === comp.selectedOptionId &&
                    a.selectedOptionId &&
                    a.selectedOptionId !== null
                )
                results.push(
                  compositeFulfilled && compositeFulfilled != null
                    ? true
                    : false
                )
              } else {
                //This is assuming all other types are simple products
                results.push(true)
              }
            } else {
              results.push(false)
            }
          } else {
            results.push(false)
          }

          //Return if all selections are fulfilled
          return results.every((a) => a === true)
        })
      return totalcompositeFulfilled
    } else if (product?.type === 'BUNDLE') {
      //Conditionally checking if the required child items are added to the bundle product
      let totalBundleFulfilled = selectedProductBundles
        ?.filter((b) => b.selectedOptionId)
        ?.every((comp) => {
          var bundleId = comp.databaseId
          var productId = comp.node.databaseId
          if (comp.node.__typename === 'VariableProduct') {
            var bundleFulfilled = selectedVariations.find(
              (a) =>
                a.composite_id === bundleId &&
                a.product_id === productId &&
                a.selectedOptionId &&
                a.selectedOptionId !== null
            )

            return bundleFulfilled ? true : false
          } else {
            return true
          }
        })
      return totalBundleFulfilled
    } else {
      return product.purchasable
    }
  }

  useEffect(() => {
    if (product?.type === 'BUNDLE' || product?.type === 'COMPOSITE') {
      setPurchasableProduct(initialPurchasableProduct)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedVariations,
    selectedProductComposites,
    selectedProductBundles,
    selectedProductAddons
  ])

  const getProductStockStatus = (product) => {
    if (product?.type === 'SIMPLE' || product?.type === 'VARIABLE') {
      return product?.stockStatus
    } else if (product?.type === 'BUNDLE') {
      //Check if the parent is out of stock? then we update the whole product status else we check the child products
      if (isOutOfStock(product)) {
        return product?.stockStatus
      } else {
        //Loop through bundle
        var outOfStockBundles = selectedProductBundles.filter(
          (b) => isOutOfStock(b.node) && !b.optional
        )

        if (outOfStockBundles && outOfStockBundles.length > 0)
          return 'OUT_OF_STOCK'

        //Check for stock status in selected variations
        var outOfStockBundleVariations = selectedVariations.filter(
          (v) => v.selectedOptionId && isOutOfStock(v.node)
        )

        if (outOfStockBundleVariations && outOfStockBundleVariations.length > 0)
          return 'OUT_OF_STOCK'
      }
    } else if (product?.type === 'COMPOSITE') {
      //Composite product handling goes here
      //For some reason the composite products stockstatus is always returned as null.
      //This might be a issue in the plugin. We will not check the parent items status for now.
      var anyCompositeOutOfStock = false
      selectedProductComposites
        .filter((c) => c.selectedCompositeOptionId)
        .filter((c) => c.selectedOptionId)
        .forEach((composite) => {
          var selectedCompositeChildProduct = composite.options.nodes.find(
            (cn) => cn.databaseId === composite.selectedOptionId
          )
          if (isOutOfStock(selectedCompositeChildProduct)) {
            anyCompositeOutOfStock = true
          }
        })

      var outOfStockCompositeVariations = selectedVariations.filter(
        (v) => v.selectedOptionId && isOutOfStock(v.node)
      )

      if (
        outOfStockCompositeVariations &&
        outOfStockCompositeVariations.length > 0
      )
        anyCompositeOutOfStock = true

      if (anyCompositeOutOfStock) return 'OUT_OF_STOCK'
    }

    return product?.stockStatus
  }

  const initialPurchasableProduct = {
    databaseId: product?.databaseId,
    type: product?.type,
    purchasable: isInitProductPurchaseable(product),
    name: product?.name,
    subTotal: product.price ? product.price : 0,
    price: product.price,
    description: product?.description,
    regularPrice: product.regularPrice,
    childrenPrice: resolvePrice(product, false),
    childrenRegularPrice: resolveRegularPrice(product, false),
    sku: product?.sku ? product.sku : 'N/A',
    stockStatus: getProductStockStatus(product),
    onSale: product?.onSale,
    productMeta: product?.productMeta
  }

  const [purchasableProduct, setPurchasableProduct] = useState(
    initialPurchasableProduct
  )

  useEffect(() => {
    setSelectedVariationCombinations(getAllVarientOptions())
    setSelectedProductAddons(productAddons)
    setSelectedProductComposites(getInitialProductComposites())
    setSelectedProductBundles(getInitialProductBundles())
    setSelectedVariations(getAllProductVariations())
    setPurchasableProduct(initialPurchasableProduct)
  }, [product])

  useEffect(() => {
    if (
      selectedVariationCombinations &&
      selectedVariationCombinations.length > 0
    ) {
      if (product.type === 'COMPOSITE' || product.type === 'BUNDLE') {
        //We will a special method to pick the correct varient of a composite or bundle product
        let variants = resolveBundleCompositeProductVarientByAttributes(
          selectedVariationCombinations,
          getAllProductVariations()
        )

        //1. unselect all SelectedVarients
        let updatedSelectedVariations = selectedVariations?.map((v) => {
          return {...v, selectedOption: null, selectedOptionId: null}
        })

        //2. Loop through variants and mark items as selected
        if (variants && variants.length > 0) {
          variants.forEach((variant) => {
            updatedSelectedVariations = updatedSelectedVariations?.map((v) => {
              if (
                v.composite_id === variant.composite_id &&
                v.product_id === variant.product_id &&
                v.variation_id === variant.variantId
              ) {
                return {
                  ...variant.variant,
                  selectedOption: variant?.name,
                  selectedOptionId: Number(variant.variantId),
                  variationAttributeDetails: getVariableAttributeDetails(
                    selectedVariationCombinations,
                    variant.attributes
                  )
                }
              } else {
                return v
              }
            })
          })
        }
        //3. update the state
        setSelectedVariations(updatedSelectedVariations)
      } else if (product.type === 'VARIABLE') {
        let variant = resolveProductVarientByAttributes(
          selectedVariationCombinations,
          getAllProductVariations()
        )

        if (variant) {
          setPurchasableProduct({
            ...purchasableProduct,
            databaseId: product?.databaseId,
            variantId: variant?.variantId, //If the product type is VARIABLE, we need to use the variationID to checkout
            type: product?.type,
            purchasable: product?.purchasable,
            name: product?.name,
            subTotal: variant?.price,
            sku: variant?.sku,
            stockStatus: variant?.stockStatus
          })
        } else {
          setPurchasableProduct(initialPurchasableProduct)
        }

        //Update selected variation also
        var updatedSelectedVariations2 = selectedVariations.map((v) => {
          if (variant && v.node.databaseId === variant.variantId) {
            return {
              ...variant.variant,
              selectedOption: variant?.name,
              selectedOptionId: Number(variant.variantId)
            }
          }
          return {...v, selectedOption: null, selectedOptionId: null}
        })
        setSelectedVariations(updatedSelectedVariations2)
      } else if (product.type === 'SIMPLE') {
        setPurchasableProduct(initialPurchasableProduct)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariationCombinations])

  if (!product) {
    return null
  }

  const galleryImages =
    product?.galleryImages?.nodes?.length > 0
      ? JSON.parse(JSON.stringify(product?.galleryImages?.nodes))
      : []

  galleryImages.unshift({
    altText: product?.image?.altText,
    mediaItemUrl: product?.image?.sourceUrl,
    databaseId: product?.image?.databaseId
  })

  const handleResetClick = () => {
    setSelectedVariationCombinations(getAllVarientOptions())
    setSelectedProductAddons(productAddons)
    setSelectedProductComposites(getInitialProductComposites())
  }

  const isDiscontinued = () => {
    const categoryIsDiscontinued = product?.productCategories?.edges?.filter(
      (entry) => entry?.node?.name === 'Discontinued'
    )

    return categoryIsDiscontinued.length > 0
  }

  return (
    <div className={styles.product}>
      <div className={styles.product__inner}>
        <div className={styles.product__inner__main}>
          <ProductDetailsGallery
            galleryImages={galleryImages}
            key={`${galleryImages.map((v) => v.databaseId)}`}
            className={styles.product__inner__main__gallery}
          />
          <ProductDetailsBody
            product={purchasableProduct}
            isDiscontinued={isDiscontinued()}
            isOutOfStock={isOutOfStock(purchasableProduct)}
            className={styles.product__inner__main__body}
            scrollToElement={scrollToElement}
            headlessConfig={headlessConfig}
            showPrice={
              !(
                languageRestrictsPerchase(defaultLocale, locale) ||
                showRequestQuote(purchasableProduct?.productMeta)
              )
            }
          />
        </div>
        {!isDiscontinued() && (
          <>
            {selectedProductBundles?.length > 0 ||
            selectedProductAddons?.length > 0 ||
            selectedVariationCombinations?.length > 0 ||
            product?.compositeComponents?.length > 0 ? (
              <ProductDetailsOptions
                product={product}
                selectedVariationCombinations={selectedVariationCombinations}
                setSelectedVariationCombinations={
                  setSelectedVariationCombinations
                }
                selectedVariations={selectedVariations}
                selectedProductAddons={selectedProductAddons}
                setSelectedProductAddons={setSelectedProductAddons}
                className={styles.product__inner__options}
                selectedProductComposites={selectedProductComposites}
                setSelectedProductComposites={setSelectedProductComposites}
                selectedProductBundles={selectedProductBundles}
                setSelectedProductBundles={setSelectedProductBundles}
                handleResetClick={handleResetClick}
                headlessConfig={headlessConfig}
                showPrice={
                  !(
                    languageRestrictsPerchase(defaultLocale, locale) ||
                    showRequestQuote(purchasableProduct?.productMeta)
                  )
                }
              />
            ) : (
              ''
            )}
            <ProductDetailsSummary
              product={product}
              selectedVariationCombinations={selectedVariationCombinations}
              setSelectedVariationCombinations={
                setSelectedVariationCombinations
              }
              selectedProductAddons={selectedProductAddons}
              setSelectedProductAddons={setSelectedProductAddons}
              selectedProductComposites={selectedProductComposites}
              className={styles.product__inner__summary}
              purchasableProduct={purchasableProduct}
              selectedVariations={selectedVariations}
              selectedProductBundles={selectedProductBundles}
              headlessConfig={headlessConfig}
              showPrice={
                !(
                  languageRestrictsPerchase(defaultLocale, locale) ||
                  showRequestQuote(purchasableProduct?.productMeta)
                )
              }
            />
          </>
        )}
      </div>
      {product?.crossSell?.nodes?.length > 1 && (
        <ProductDetailsAdditionalProducts
          heading={getTranslation(headlessConfig, 'ACCESSORIES')}
          products={product?.crossSell?.nodes}
          className={
            product?.upsell?.nodes?.length > 0
              ? `${styles.product__crosssell} ${styles['product__crosssell--gray']}`
              : styles.product__crosssell
          }
          headlessConfig={headlessConfig}
        />
      )}
      {product?.upsell?.nodes?.length > 0 && (
        <ProductDetailsAdditionalProducts
          heading={getTranslation(headlessConfig, 'RELATED_PRODUCTS')}
          products={product?.upsell?.nodes}
          className={styles.product__upsell}
        />
      )}
      <div className={styles.product__tabs} ref={scrollToRef}>
        <ProductDetailsTabs
          productName={product?.name}
          productSupportArtifacts={
            product?.supportProductLink?.supportArtifacts
          }
          tabData={product?.productInfoTabs}
          support={support}
          className={styles.product__tabs}
          headlessConfig={headlessConfig}
        />
      </div>
    </div>
  )
}

ProductDetails.propTypes = {
  ...productDetailsPropTypes
}

export default ProductDetails
