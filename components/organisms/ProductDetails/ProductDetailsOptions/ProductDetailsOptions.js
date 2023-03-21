import ProductQuantity from '@/components/molecules/Product/ProductQuantity'
import {isOutOfStock, partialMatchArrays} from '@/functions/product/productUtil'
import {getTranslation} from '@/functions/utility'
import classNames from 'classnames'
import {Fragment} from 'react'
import {v4 as uuidv4} from 'uuid'
import ProductDetailsOptionsSelect from '../ProductDetailsOptionsSelect'
import styles from './ProductDetailsOptions.module.scss'
import {getAddonPriceString} from '@/functions/product/productUtil'

/**
 * @param  {object}   props                                  Props
 * @param  {object}   props.product                          Product
 * @param  {Array}    props.selectedVariationCombinations    Selected Variations
 * @param  {Function} props.setSelectedVariationCombinations Handle setSelectedVariations
 * @param  {string}   props.className                        Class Name
 * @param  {Array}    props.selectedProductAddons            Selected Product Addons
 * @param  {Function} props.setSelectedProductAddons         Handle setSelectedProductAddons
 * @param  {Array}    props.selectedProductComposites        Selected Product Composites
 * @param  {Function} props.setSelectedProductComposites     Set Selected Product Composites
 * @param  {Array}    props.selectedProductBundles           Selected Product Bundles
 * @param  {Function} props.handleResetClick                 Handle reset filter
 * @param  {Function} props.setSelectedProductBundles        Set Selected Product Bundles
 * @param  {Array}    props.selectedVariations               Selected Variations
 * @param  {object}   props.headlessConfig                   Headless config data
 * @param  {boolean}  props.showPrice                        Show the price or controls that determin the price. e.g. quantity change
   @return {Element}                                         The ProductComposite component.
 */
export default function ProductDetailsOptions({
  product,
  selectedVariationCombinations,
  setSelectedVariationCombinations,
  className,
  selectedProductAddons,
  setSelectedProductAddons,
  selectedProductComposites,
  setSelectedProductComposites,
  selectedProductBundles,
  setSelectedProductBundles,
  handleResetClick,
  selectedVariations,
  headlessConfig,
  showPrice
}) {
  //This method will mark the variable attribute as support or unsupported based on the current varient option selection
  const markInvalidVariationCombinations = (
    updatedFullVariations,
    selectedOptionId,
    cv
  ) => {
    var currentVarient = updatedFullVariations.find(
      (uv) => uv.id === selectedOptionId
    )
    var newTermsNodes = []
    cv.terms.nodes.forEach((cvn) => {
      var t = selectedVariations.map((sv) => {
        var selectedVariationAttributes = sv.node.attributes.edges.map(
          (sva) => {
            return sva.node.attributeId
          }
        )

        var a = []
        a.push(Number(currentVarient.selectedOption))
        a.push(cvn.databaseId)
        let result = partialMatchArrays(a, selectedVariationAttributes)

        return result
      })

      //This is used to avoide removing items from the selected dropdown
      if (currentVarient.id === cv.id || !currentVarient.selectedOption) {
        newTermsNodes.push({...cvn, notSupported: false})
      } else {
        if (t.filter((a) => a).length > 0) {
          //SHow the attribute from the dropdown, since its a invalid combination
          newTermsNodes.push({...cvn, notSupported: false})
        } else {
          //Hide the attribute from the dropdown, since its a invalid combination
          newTermsNodes.push({...cvn, notSupported: true})
        }
      }
    })

    if (newTermsNodes && newTermsNodes.length > 0) {
      var u = {...cv, terms: {nodes: newTermsNodes}}
      return u
    }

    return cv
  }

  const handleVariationChange = (
    selectIndex,
    optionValue,
    composite_id,
    product_id,
    options,
    id
  ) => {
    let updatedVariations = null
    if (product.type === 'COMPOSITE') {
      updatedVariations = selectedVariationCombinations
        .filter(
          (v) => v.composite_id === composite_id && v.product_id === product_id
        )
        .map((varient) => {
          if (varient.id === id) {
            return {
              ...varient,
              selectedOption: optionValue,
              selectedVarientAttrbute: options?.find(
                (o) => Number(o.databaseId) === Number(optionValue)
              )
            }
          }
        })
    } else if (product.type === 'BUNDLE') {
      updatedVariations = selectedVariationCombinations
        .filter(
          (v) => v.composite_id === composite_id && v.product_id === product_id
        )
        .map((varient) => {
          if (varient.id === id) {
            return {
              ...varient,
              selectedOption: optionValue,
              selectedVarientAttrbute: varient.terms.nodes?.find(
                (o) => Number(o.databaseId) === Number(optionValue)
              )
            }
          } else {
            return varient
          }
        })
    } else {
      //Simple/variable product variation change
      updatedVariations = selectedVariationCombinations.map((varient) => {
        if (varient.id === id) {
          return {...varient, selectedOption: optionValue}
        }
      })
    }

    var updatedFullVariations = selectedVariationCombinations?.map((v) => {
      var found = updatedVariations.filter((u) => u).find((u) => u.id === v.id)
      return found ? found : v
    })

    //This logic helps to only display the valid variation combinations on on the variation dropdowns. If a Varient attribute option is selected,
    //the reset of the option displayed on the other varient dropdown will be filtered.
    //This mean only valid varient combinations will be available on the dropdowns for selection
    var final = updatedFullVariations.map((cv) => {
      if (product.type === 'BUNDLE' || product.type === 'COMPOSITE') {
        if (cv.composite_id === composite_id && cv.product_id === product_id) {
          return markInvalidVariationCombinations(updatedFullVariations, id, cv)
        } else {
          return cv
        }
      } else {
        //Thse will be simple or variable products
        return markInvalidVariationCombinations(updatedFullVariations, id, cv)
      }
    })

    setSelectedVariationCombinations(final)
  }

  const handleProductAddonChange = (optionValue, selectedAddon) => {
    let updatedProductAddons = selectedProductAddons?.map((addon) => {
      const optionById = addon?.options?.find((a) => a.id === optionValue)
      const optionByIdPrice = optionById?.price
        ? `$${Number(optionById.price).toFixed(2)}`
        : null

      if (selectedAddon.composite_id && selectedAddon.composite_id) {
        //Its important that we compare the product id and composite id, otherwise the seelction for composite products will be wrong
        if (
          addon.field_name === selectedAddon.field_name &&
          selectedAddon.composite_id === addon.composite_id &&
          selectedAddon.product_id === addon.product_id
        ) {
          return {
            ...addon,
            selectedOption: optionById?.label,
            selectedOptionId: optionValue,
            selectedOptionPrice: optionByIdPrice
          }
        }
      } else {
        //Regular product we dont need to compare the composite_id and product_id
        if (addon.field_name === selectedAddon.field_name) {
          return {
            ...addon,
            selectedOption: optionById?.label,
            selectedOptionId: optionValue,
            selectedOptionPrice: optionByIdPrice
          }
        }
      }

      return addon
    })

    setSelectedProductAddons(updatedProductAddons)
  }

  const handleProductCompositeChange = (optionValue, compositeId) => {
    //Check if simple product?
    //Then add to list
    let updatedProductComposites = selectedProductComposites?.map(
      (composite) => {
        if (composite.databaseId === compositeId) {
          var optionLabel = composite.options.nodes?.find(
            (a) => Number(a.databaseId) === Number(optionValue)
          )
          return {
            ...composite,
            selectedOption: optionLabel?.name,
            selectedOptionId: Number(optionValue)
          }
        }
        return composite
      }
    )
    setSelectedProductComposites(updatedProductComposites)
  }

  const optionsClassnames = classNames(className, styles.options)

  const RenderProductAddons = (selectedProductAddonsList) => {
    return selectedProductAddonsList?.map((addon, index) => (
      <div
        key={index}
        className={`${styles.options__selections} ${styles['col-6@md']}`}
      >
        <div className={styles.options__selections__fieldset}>
          <label
            htmlFor="productDetailsOptionsCalibration"
            className={styles.options__selections__fieldset__label}
          >
            {addon?.name}
          </label>
          <select
            id="productDetailsOptionsCalibration"
            className={styles.options__selections__fieldset__select}
            onChange={(e) => handleProductAddonChange(e.target.value, addon)}
            value={
              selectedProductAddonsList?.find(
                (a) => a.field_name === addon?.field_name
              )?.selectedOptionId
            }
          >
            <option value="">
              {getTranslation(headlessConfig, 'CHOOSE_AN_OPTION')}
            </option>
            {addon?.options?.map((option) => (
              <option value={option.id} key={uuidv4()}>
                {option.label}{' '}
                {option.price > 0 && getAddonPriceString(option.price)}
              </option>
            ))}
          </select>
        </div>
      </div>
    ))
  }

  const RenderProductDetailOptions = (
    selectedVariationsData,
    selectedProductAddonsData
  ) => {
    return (
      <div className={`${styles['grid']} ${styles['gap-md']}`}>
        {selectedVariationsData &&
          selectedVariationsData.length > 0 &&
          selectedVariationsData?.map((variation, index) => (
            <div
              key={`product-options-${index}`}
              className={`${styles['col-6@md']}`}
            >
              <ProductDetailsOptionsSelect
                handleOptionChange={handleVariationChange}
                variation={{
                  id: variation.id,
                  label: variation.label,
                  selectedOption: variation.selectedOption,
                  options: variation?.terms?.nodes
                }}
                index={index}
                headlessConfig={headlessConfig}
              />
            </div>
          ))}
        {RenderProductAddons(selectedProductAddonsData)}
      </div>
    )
  }

  const getCompositeSelectedProductDescription = (composite) => {
    var compProduct = composite?.options?.nodes?.find(
      (a) => a.databaseId === composite.selectedOptionId
    )

    if (compProduct && compProduct?.shortDescription) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: compProduct?.shortDescription
          }}
          className={`${styles['col-12@sm']}`}
        ></div>
      )
    } else return ''
  }

  const RenderProductComposites = (
    composites,
    selectedProductAddonsData,
    selectedVariationsData
  ) => {
    return (
      <div className={`${styles['grid']} ${styles['gap-md']}`}>
        {composites?.map((composite, index) => (
          <Fragment key={uuidv4()}>
            <div
              className={`${styles['col-12@sm']} ${styles.options__composite__head}`}
            >
              {`${composite?.title} X ${composite?.quantity}`}
              {composite?.optional && (
                <span className={styles.options__composite__optional}>
                  - {getTranslation(headlessConfig, 'OPTIONAL')}
                </span>
              )}
            </div>
            {isOutOfStock(composite?.node) ||
              (isVariationOutOfStockInComposite(composite) && (
                <div className={styles.options__composite__outofstock}>
                  {getTranslation(headlessConfig, 'OUT_OF_STOCK')}
                </div>
              ))}
            {composite?.optional && (
              <div className={styles.options__composite__optional__select}>
                <input
                  type="checkbox"
                  id={`optional-${composite.databaseId}`}
                  name={`optional-${composite.databaseId}`}
                  value={composite.databaseId}
                  checked={composite?.selectedCompositeOptionId ? true : false}
                  onChange={(e) =>
                    handleCompositeOptionalChange(e, composite.databaseId)
                  }
                  className={
                    styles['options__composite__optional__select--checkbox']
                  }
                ></input>
                <label htmlFor={`optional-${composite.databaseId}`}>
                  {getTranslation(headlessConfig, 'ADD')}
                </label>
              </div>
            )}
            {composite?.description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: composite?.description
                }}
                className={`${styles.options__composite__description} ${styles['col-12@sm']}`}
              ></div>
            )}
            {getCompositeSelectedProductDescription(composite)}

            {composite?.selectedCompositeOptionId && (
              <>
                <div className={`${styles['col-12@sm']}`}>
                  {showPrice && (
                    <ProductQuantity
                      id={composite.databaseId}
                      handleQuantityUpdate={
                        handleCompositeSubItemQuantityUpdate
                      }
                      defaultQuantity={composite.quantity}
                      quantityMin={composite.quantityMin}
                      quantityMax={composite.quantityMax}
                    />
                  )}
                </div>
                {composite?.options?.nodes?.length > 0 && (
                  <div className={`${styles['col-6@md']}`}>
                    <ProductDetailsOptionsSelect
                      handleOptionChange={(index, value) =>
                        handleProductCompositeChange(
                          value,
                          composite?.databaseId
                        )
                      }
                      key={uuidv4()}
                      variation={{
                        id: composite.databaseId,
                        label: 'Available options',
                        selectedOption: composite.selectedOptionId,
                        options: composite.options.nodes
                      }}
                      isCompositProduct={true}
                      index={index}
                      headlessConfig={headlessConfig}
                    />
                  </div>
                )}

                {composite.selectedOptionId
                  ? RenderProductAddons(
                      selectedProductAddonsData.filter(
                        (a) =>
                          a.product_id === composite.selectedOptionId &&
                          a.composite_id === composite.databaseId
                      )
                    )
                  : ''}
                {selectedVariationsData
                  ?.filter(
                    (v) =>
                      v.composite_id === composite.databaseId &&
                      v.product_id === composite.selectedOptionId
                  )
                  .map((variation, index) => (
                    <div
                      key={`product-options-${index}`}
                      className={`${styles['col-6@md']}`}
                    >
                      <ProductDetailsOptionsSelect
                        handleOptionChange={handleVariationChange}
                        variation={{
                          id: variation.id,
                          label: variation.label,
                          selectedOption: variation.selectedOption,
                          options: variation?.terms?.nodes,
                          composite_id: composite.databaseId,
                          product_id: composite.selectedOptionId
                        }}
                        index={index}
                        headlessConfig={headlessConfig}
                      />
                    </div>
                  ))}
              </>
            )}

            {composites.length - 1 !== index && <hr />}
          </Fragment>
        ))}
      </div>
    )
  }

  const handleQuantityUpdate = (newQuantity, id) => {
    //Update the bundle quantity
    var updatedBundles = selectedProductBundles.map((b) => {
      if (b.databaseId === id)
        return {...b, quantity: newQuantity, defaultQuantity: newQuantity}
      else return b
    })

    setSelectedProductBundles(updatedBundles)
  }

  const handleBundleOptionalChange = (event, id) => {
    //Update the bundle optional flag
    var updatedBundles = selectedProductBundles.map((b) => {
      if (b.databaseId === id) {
        if (event.target.checked) {
          return {
            ...b,
            selectedOption: b.node.name,
            selectedOptionId: b.node.databaseId
          }
        } else {
          return {...b, selectedOption: null, selectedOptionId: null}
        }
      } else return b
    })

    setSelectedProductBundles(updatedBundles)
  }

  const handleCompositeOptionalChange = (event, id) => {
    //Update the composite optional flag
    var updatedComposites = selectedProductComposites.map((c) => {
      if (c.databaseId === id) {
        if (event.target.checked) {
          return {
            ...c,
            selectedCompositeOptionId: c.databaseId,
            selectedCompositeOption: c.title
          }
        } else {
          return {
            ...c,
            selectedCompositeOption: null,
            selectedCompositeOptionId: null
          }
        }
      } else return c
    })

    setSelectedProductComposites(updatedComposites)
  }

  const handleCompositeSubItemQuantityUpdate = (newQuantity, id) => {
    //Update the bundle quantity
    var updatedComposites = selectedProductComposites.map((b) => {
      if (b.databaseId === id) return {...b, quantity: newQuantity}
      else return b
    })

    setSelectedProductComposites(updatedComposites)
  }

  //check is variations are out of stock
  const isVariationOutOfStockInBundle = (bundle) => {
    var outOfStockBundleVariations = selectedVariations?.filter(
      (v) =>
        v.selectedOptionId &&
        bundle.databaseId === v.composite_id &&
        bundle.node.databaseId === v.product_id &&
        isOutOfStock(v?.node)
    )

    return outOfStockBundleVariations && outOfStockBundleVariations.length > 0
  }

  //check is variations are out of stock
  const isVariationOutOfStockInComposite = (composite) => {
    //return false

    var anyCompositeOutOfStock = false
    var selectedCompositeChildProduct = composite?.options?.nodes?.find(
      (cn) => cn.databaseId === composite.selectedOptionId
    )
    if (isOutOfStock(selectedCompositeChildProduct)) {
      anyCompositeOutOfStock = true
    }

    var outOfStockCompositeVariations = selectedVariations?.filter(
      (v) =>
        v.selectedOptionId &&
        composite.databaseId === v.composite_id &&
        composite.selectedOptionId === v.product_id &&
        isOutOfStock(v?.node)
    )

    if (
      outOfStockCompositeVariations &&
      outOfStockCompositeVariations.length > 0
    ) {
      anyCompositeOutOfStock = true
    }

    return anyCompositeOutOfStock
  }

  const RenderProductBundles = (
    bundles,
    selectedProductAddonsData,
    selectedVariationsData
  ) => {
    return (
      <div className={`${styles['grid']} ${styles['gap-md']}`}>
        {bundles?.map((bundle, index) => (
          <Fragment key={uuidv4()}>
            <div
              className={`${styles['col-12@sm']} ${styles.options__composite__head}`}
            >
              {`${bundle?.node?.name} X ${bundle?.quantity}`}
              {bundle?.optional && (
                <span className={styles.options__composite__optional}>
                  - {getTranslation(headlessConfig, 'OPTIONAL')}
                </span>
              )}
            </div>
            {isOutOfStock(bundle?.node) ||
              (isVariationOutOfStockInBundle(bundle) && (
                <div className={styles.options__composite__outofstock}>
                  {getTranslation(headlessConfig, 'OUT_OF_STOCK')}
                </div>
              ))}
            {bundle?.optional && (
              <div className={styles.options__composite__optional__select}>
                <input
                  type="checkbox"
                  id={`optional-${bundle.databaseId}`}
                  name={`optional-${bundle.databaseId}`}
                  value={bundle.databaseId}
                  checked={bundle?.selectedOptionId ? true : false}
                  onChange={(e) =>
                    handleBundleOptionalChange(e, bundle.databaseId)
                  }
                  className={
                    styles['options__composite__optional__select--checkbox']
                  }
                ></input>
                <label htmlFor={`optional-${bundle.databaseId}`}>
                  {getTranslation(headlessConfig, 'ADD')}
                </label>
              </div>
            )}
            <div
              dangerouslySetInnerHTML={{__html: bundle?.node?.shortDescription}}
              className={`${styles['col-12@sm']}`}
            ></div>
            {bundle?.selectedOptionId && (
              <>
                {showPrice && !isOutOfStock(bundle?.node) && (
                  <div className={`${styles['col-12@sm']}`}>
                    <ProductQuantity
                      id={bundle.databaseId}
                      handleQuantityUpdate={handleQuantityUpdate}
                      defaultQuantity={bundle.defaultQuantity}
                      quantityMin={bundle.quantityMin}
                      quantityMax={bundle.quantityMax}
                    />
                  </div>
                )}

                {bundle.selectedOptionId
                  ? RenderProductAddons(
                      selectedProductAddonsData.filter(
                        (a) =>
                          a.product_id === bundle.selectedOptionId &&
                          a.composite_id === bundle.databaseId
                      )
                    )
                  : ''}
                {selectedVariationsData
                  ?.filter(
                    (v) =>
                      v.composite_id === bundle.databaseId &&
                      v.product_id === bundle.selectedOptionId
                  )
                  .map((variation, index) => (
                    <div
                      key={`product-options-${index}`}
                      className={`${styles['col-6@md']}`}
                    >
                      <ProductDetailsOptionsSelect
                        handleOptionChange={handleVariationChange}
                        variation={{
                          id: variation.id,
                          label: variation.label,
                          selectedOption: variation.selectedOption,
                          options: variation?.terms?.nodes,
                          composite_id: bundle.databaseId,
                          product_id: bundle.selectedOptionId
                        }}
                        index={index}
                        headlessConfig={headlessConfig}
                      />
                    </div>
                  ))}
              </>
            )}

            {bundles.length - 1 !== index && <hr />}
          </Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className={optionsClassnames}>
      <div
        className={`${styles.options__head} ${styles['grid']} ${styles['gap-lg']}`}
      >
        <div className={`${styles['col-6@sm']}`}>
          <div className={styles.options__head__heading}>
            {getTranslation(headlessConfig, 'CHOOSE_AN_OPTION')}
          </div>
        </div>
        <div className={`${styles.options__head__clear} ${styles['col-6@sm']}`}>
          <button
            className={styles.options__head__clear__btn}
            onClick={handleResetClick}
          >
            {getTranslation(headlessConfig, 'RESET_OPTIONS')}
          </button>
        </div>
      </div>
      {product?.type === 'VARIABLE' &&
        RenderProductDetailOptions(
          selectedVariationCombinations,
          selectedProductAddons
        )}
      {product?.type === 'SIMPLE' &&
        RenderProductDetailOptions(
          selectedVariationCombinations,
          selectedProductAddons
        )}
      {product?.type === 'COMPOSITE' &&
        RenderProductComposites(
          selectedProductComposites,
          selectedProductAddons,
          selectedVariationCombinations
        )}
      {product?.type === 'BUNDLE' &&
        RenderProductBundles(
          selectedProductBundles,
          selectedProductAddons,
          selectedVariationCombinations
        )}
    </div>
  )
}
