import {
  calculateProductSimmaryLineItemCost,
  formatCurrency,
  getFloatVal
} from '@/functions/checkout/commonUtil'
import {getTranslation} from '@/functions/utility'
import styles from './ProductDetailsSummaryLineitem.module.scss'

/**
 * @param  {object}  props                               ProductDetailsSummaryLineitem Component
 * @param  {object}  props.option                        Option
 * @param  {boolean} props.isProductAddon                Is Product Addon
 * @param  {boolean} props.isComposite                   Is Composite Product
 * @param  {boolean} props.isVariation                   Is Variation
 * @param  {Array}   props.compositeAddons               Composite Addonsons
 * @param  {object}  props.compositeVariation            Composite Variation
 * @param  {boolean} props.isBundle                      Is Bundle product
 * @param  {Array}   props.selectedVariationCombinations Selected Variation Combinations
 * @param  {object}  props.headlessConfig                Headless config data
 * @param  {boolean} props.showPrice                     Show linetime price
 * @return {Element}                                     The Product Details Summary Line item component.
 */
export default function ProductDetailsSummaryLineitem({
  option,
  // handleClearAddons,
  // handleClearVariation,
  // handleClearCompositeVariation,
  isProductAddon,
  isComposite,
  isVariation,
  isBundle,
  compositeAddons,
  compositeVariation,
  selectedVariationCombinations,
  headlessConfig,
  showPrice
}) {
  const renderProductVariationLine = () => {
    return option.selectedOption
      ? option?.terms?.nodes?.find(
          (o) => String(o.databaseId) === String(option.selectedOption)
        )?.name
      : getTranslation(headlessConfig, 'SELECT_OPTIONS')
  }

  const renderProductAddonLine = () => {
    return option.selectedOption
      ? `${option.selectedOption}`
      : getTranslation(headlessConfig, 'NONE')
  }

  // const handleClearOptions = (option) => {
  //   if (isProductAddon) handleClearAddons(option)
  //   else if (isVariation) {
  //     handleClearVariation(option)
  //   }
  // }

  const selectedOption = option?.options?.nodes?.find(
    (o) => o.databaseId === option.selectedOptionId
  )
  const calculatedTotalLineItemCostForComposites =
    calculateProductSimmaryLineItemCost(
      selectedOption?.price,
      option?.discount,
      option?.quantity
    )

  const renderCompositeOptionLine = () => {
    return (
      option && (
        <>
          <div className={styles.productline__info__value}>
            <div className={`${styles['productline__info__value--full']}`}>
              <span className={styles.productline__info__value__name}>
                {option.selectedOption
                  ? `${option.selectedOption} X ${option?.quantity}`
                  : `${getTranslation(headlessConfig, 'SELECT_OPTIONS')}`}{' '}
                <span
                  className={styles['productline__info__value__name--spacer']}
                ></span>
                {selectedOption?.type === 'SIMPLE' && (
                  <span
                    className={`${styles['productline__info__value__price']} `}
                  >
                    {calculatedTotalLineItemCostForComposites.onSale && (
                      <span
                        className={
                          styles['productline__info__value__price--discount']
                        }
                      >
                        {showPrice &&
                          calculatedTotalLineItemCostForComposites.regularPrice}
                      </span>
                    )}
                    {showPrice &&
                      calculatedTotalLineItemCostForComposites.price}
                  </span>
                )}
              </span>
              {compositeVariation?.selectedOption && (
                <div
                  className={`${styles['productline__info__value']} ${styles['productline__info__value--full']}`}
                >
                  <div className={styles.productline__info__value__name}>
                    <div>
                      {compositeVariation?.selectedOption} X {option?.quantity}
                    </div>
                    <div
                      className={
                        styles['productline__info__value__name--spacer']
                      }
                    ></div>
                    <div
                      className={`${styles['productline__info__value__price']} `}
                    >
                      {calculatedTotalLineItemCost.onSale && (
                        <span
                          className={
                            styles['productline__info__value__price--discount']
                          }
                        >
                          {showPrice &&
                            calculatedTotalLineItemCost.regularPrice}
                        </span>
                      )}
                      {showPrice && calculatedTotalLineItemCost.price}
                    </div>
                    {/* {compositeVariation.selectedOption && (
                      <button
                        className={styles.productline__info__name__remove}
                        onClick={() =>
                          handleClearCompositeVariation(compositeVariation)
                        }
                        title="Clean Options"
                      >
                        ×
                      </button>
                    )} */}
                  </div>
                </div>
              )}
              {compositeAddons && compositeAddons.length > 0 && (
                <>
                  {compositeAddons
                    .filter((a) => a.selectedOptionId)
                    .map((addon, index) => (
                      <div
                        key={`composit-addon-${index}`}
                        className={styles.productline__info__value}
                      >
                        <span className={styles.productline__info__value__name}>
                          <div>
                            {addon.selectedOption} X {option?.quantity}
                          </div>
                          <div
                            className={
                              styles['productline__info__value__name--spacer']
                            }
                          ></div>
                          {addon.selectedOptionPrice && (
                            <div
                              className={`${styles['productline__info__value__price']}`}
                            >
                              {showPrice &&
                                formatCurrency(
                                  getFloatVal(addon.selectedOptionPrice) *
                                    option.quantity,
                                  process.env
                                    .NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY
                                )}
                            </div>
                          )}

                          {/* <button
                            className={styles.productline__info__name__remove}
                            onClick={() => handleClearAddons(addon)}
                            title="Clean Options"
                          >
                            ×
                          </button> */}
                        </span>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </>
      )
    )
  }

  const renderBundleOptionLine = () => {
    return (
      option && (
        <>
          {selectedVariationCombinations && (
            <>
              {selectedVariationCombinations.map((v, index) => (
                <div
                  key={`composit-addon-${index}`}
                  className={styles.productline__info__value}
                >
                  <div className={styles['productline__info__value--full']}>
                    <div className={styles.productline__info__value__name}>
                      <div>{v.name}</div>
                      <div
                        className={
                          styles['productline__info__value__name--spacer']
                        }
                      ></div>
                      <div
                        className={`${styles['productline__info__value__price']} `}
                      >
                        {calculatedTotalLineItemCost.onSale && (
                          <span
                            className={
                              styles[
                                'productline__info__value__price--discount'
                              ]
                            }
                          >
                            {showPrice &&
                              calculatedTotalLineItemCost.regularPrice}
                          </span>
                        )}
                        {showPrice && calculatedTotalLineItemCost.price}
                      </div>
                      {/* {v.selectedOption && (
                        <button
                          className={styles.productline__info__name__remove}
                          onClick={() => handleClearVariation(v)}
                          title="Clean Options"
                        >
                          ×
                        </button>
                      )} */}
                    </div>

                    <div
                      key={`composit-addon-${index}`}
                      className={styles.productline__info__value}
                    >
                      <span>
                        {v.selectedOption
                          ? v.selectedVarientAttrbute?.name
                          : getTranslation(headlessConfig, 'SELECT_OPTIONS')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {compositeAddons && compositeAddons.length > 0 && (
            <>
              {compositeAddons
                .filter((a) => a.selectedOptionId)
                .map((addon, index) => (
                  <div
                    key={`composit-addon-${index}`}
                    className={`${styles.productline__info__value}`}
                  >
                    <div
                      className={`${styles.productline__info__value__name} ${styles['productline__info__value--full']}`}
                    >
                      <div>
                        {addon.selectedOption} X {option.quantity}
                      </div>
                      <div
                        className={
                          styles['productline__info__value__name--spacer']
                        }
                      ></div>
                      {addon.selectedOptionPrice && (
                        <div
                          className={`${styles['productline__info__value__price']}`}
                        >
                          {showPrice &&
                            formatCurrency(
                              getFloatVal(addon.selectedOptionPrice) *
                                option.quantity,
                              process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_CURRENCY
                            )}
                        </div>
                      )}
                      {/* <button
                        className={styles.productline__info__name__remove}
                        onClick={() => handleClearAddons(addon)}
                        title="Clean Options"
                      >
                        ×
                      </button> */}
                    </div>
                  </div>
                ))}
            </>
          )}
        </>
      )
    )
  }

  const calculatedTotalLineItemCost = calculateProductSimmaryLineItemCost(
    compositeVariation?.node?.price
      ? compositeVariation?.node?.price
      : option?.node?.price,
    option.discount,
    option?.quantity
  )

  return (
    <div className={styles.productline}>
      <div className={styles.productline__info}>
        <div className={styles.productline__info__name}>
          <span className={styles.productline__info__name__desc}>
            {isProductAddon && option.name}
            {isVariation && option?.label}
            {isComposite && option?.title}
            {isBundle && `${option?.selectedOption} x ${option?.quantity}`}
          </span>
          {option?.node?.__typename === 'SimpleProduct' && (
            <div className={`${styles['productline__info__value__price']} `}>
              {calculatedTotalLineItemCost.onSale && (
                <span
                  className={
                    styles['productline__info__value__price--discount']
                  }
                >
                  {showPrice && calculatedTotalLineItemCost.regularPrice}
                </span>
              )}
              {showPrice && calculatedTotalLineItemCost.price}
            </div>
          )}
          {/* {(isProductAddon || isVariation) && option.selectedOption && (
            <button
              className={styles.productline__info__name__remove}
              onClick={() => handleClearOptions(option)}
              title="Clean Options"
            >
              ×
            </button>
          )} */}
        </div>
        {(isVariation || isProductAddon) && (
          <div className={styles.productline__info__value}>
            <span className={styles.productline__info__value__name}>
              {isVariation && renderProductVariationLine()}
              {isProductAddon && renderProductAddonLine()}
            </span>
            <span className={styles.productline__info__value__price}>
              {isProductAddon && showPrice && option.selectedOptionPrice}
              {isVariation && showPrice && option.selectedOptionPrice}
            </span>
          </div>
        )}
        {(isComposite || isBundle) && (
          <div>
            <div>
              {isComposite && renderCompositeOptionLine()}
              {isBundle && renderBundleOptionLine()}
            </div>
            {option.selectedOptionPrice && (
              <div className={styles.productline__info__value__price}>
                {showPrice && option.selectedOptionPrice}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
