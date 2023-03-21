import Checkbox from '@/components/atoms/Inputs/Checkbox'
import IconClose from '@/components/icons/IconClear'
import IconFilter from '@/components/icons/IconFilter'
import Form from '@/components/molecules/Form'
import {languageRestrictsPerchase} from '@/functions/checkout/commonUtil'
import {getPriceRanges} from '@/functions/product/productUtil'
import {getTranslation} from '@/functions/utility'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from 'react'
import styles from './ProductFilter.module.scss'

/**
 * @param  {object}   props                    ProductFilter component props.
 * @param  {Array}    props.productTagsList    List of product tags
 * @param  {Array}    props.selectedTags       Selected product tags
 * @param  {object}   props.selectedPrice      Hold the selected price
 * @param  {Function} props.handleFilterAction Handle rest, tag filter and price filter
 * @param  {boolean}  props.loading            Indicate that the component is loading
 * @param  {number}   props.selectedCategory   Selected category
 * @param  {object}   props.headlessConfig     Headless config data
 * @return {Element}                           The ProductFilter component.
 */
export default function ProductFilter({
  selectedCategory,
  productTagsList,
  selectedTags,
  handleFilterAction,
  selectedPrice,
  loading,
  headlessConfig
}) {
  const wrapperRef = useRef(null)
  useOutsideClickHandler(wrapperRef)
  const priceRanges = getPriceRanges()
  const [showFilterOverlay, setShowFilterOverlay] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showResetFilter, setShowResetFilter] = useState(false)
  const [showPriceFilter] = useState(false)
  const showFilter = () => {
    if (isMobile) setShowFilterOverlay(!showFilterOverlay)
  }

  const {locale, defaultLocale} = useRouter()

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
      setShowFilterOverlay(false)
    }
  }

  useEffect(() => {
    if (
      (selectedTags &&
        selectedTags.length > 0 &&
        selectedTags.find((c) => c.categoryId === selectedCategory)) ||
      (selectedPrice && selectedPrice.price)
    )
      setShowResetFilter(true)
    else setShowResetFilter(false)
  }, [selectedTags, selectedCategory, selectedPrice])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  /**
   * Handle Outside Click Event
   *
   * @param {any} ref ref object
   */
  function useOutsideClickHandler(ref) {
    useEffect(() => {
      /**
       * @param {any} event Event
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowFilterOverlay(false)
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  var selectedProductTagList = productTagsList.filter(
    (p) => Number(p.categoryId) === Number(selectedCategory)
  )

  const formDefaults = () => {
    var newFormDefaults = {}

    selectedProductTagList?.forEach((tag) => {
      newFormDefaults[tag.tagId] = tag.tagId
    })

    return newFormDefaults
  }

  return (
    <div ref={wrapperRef}>
      <Form
        showSubmitButton={false}
        shouldEnableReinitialize={true}
        formDefaults={formDefaults()}
      >
        <aside className={styles.container}>
          <div className={styles.filter__header} onClick={() => showFilter()}>
            <div className={styles.filter__header__title}>
              <IconFilter />
              <p>{getTranslation(headlessConfig, 'FILTER')}</p>
            </div>
            {showResetFilter && !isMobile && (
              <button
                className={styles.filter__header__clear}
                onClick={(event) => handleFilterAction(event, 'RESET_FILTER')}
              >
                {getTranslation(headlessConfig, 'CLEAR')}
                <IconClose />
              </button>
            )}
          </div>
          <div
            className={`${styles.filter__content} ${
              showFilterOverlay && styles['filter__content--overlay']
            }`}
          >
            {selectedProductTagList?.length > 0 ||
            !languageRestrictsPerchase(defaultLocale, locale) ? (
              <>
                {selectedProductTagList.length > 0 && (
                  <>
                    {isMobile ? (
                      <div className={styles.filter__header__mobile}>
                        <h4>
                          {getTranslation(headlessConfig, 'PRODUCT_FEATURES')}
                        </h4>
                        {showResetFilter && (
                          <button
                            className={styles.filter__header__mobile__clear}
                            onClick={(event) =>
                              handleFilterAction(event, 'RESET_FILTER')
                            }
                          >
                            {getTranslation(headlessConfig, 'CLEAR')}
                            <IconClose fill="#313f49" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <h4>
                        {getTranslation(headlessConfig, 'PRODUCT_FEATURES')}
                      </h4>
                    )}

                    {productTagsList?.length && (
                      <div className={styles.filter__content__items}>
                        {productTagsList.length &&
                          selectedProductTagList.map((tag, index) => (
                            <div
                              key={index}
                              className={styles.filter__content__items__item}
                            >
                              <div
                                className={
                                  styles.filter__content__items__item__checkbox
                                }
                              >
                                <Checkbox
                                  type="checkbox"
                                  label={tag.tagName}
                                  id={tag.tagId ? tag.tagId : ''}
                                  name={tag.tagName ? tag.tagName : ''}
                                  value={tag.tagId ? tag.tagId : ''}
                                  disabled={loading}
                                  checked={
                                    selectedTags && selectedTags.length > 0
                                      ? selectedTags?.find(
                                          (t) =>
                                            t.categoryId === tag.categoryId &&
                                            t.tagId === tag.tagId
                                        ) !== undefined
                                      : false
                                  }
                                  onChange={(event) =>
                                    handleFilterAction(
                                      event,
                                      'PRODUCT_TAG_FILTER'
                                    )
                                  }
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                )}
                {!languageRestrictsPerchase(defaultLocale, locale) && (
                  <>
                    {showPriceFilter && (
                      <>
                        <h4>{getTranslation(headlessConfig, 'PRICE')}</h4>
                        <div className={styles.filter__content__items}>
                          {priceRanges &&
                            priceRanges?.length &&
                            priceRanges.map((priceRange, index) => (
                              <div
                                key={index}
                                className={styles.filter__content__items__item}
                              >
                                <div
                                  className={
                                    styles.filter__content__items__item__checkbox
                                  }
                                >
                                  <Checkbox
                                    type="checkbox"
                                    label={getTranslation(
                                      headlessConfig,
                                      priceRange.label
                                    )}
                                    id={priceRange.value}
                                    disabled={loading}
                                    name={priceRange.name}
                                    value={priceRange.value}
                                    checked={
                                      selectedPrice?.price === priceRange.value
                                    }
                                    onChange={(event) =>
                                      handleFilterAction(event, 'PRICE_FILTER')
                                    }
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>{getTranslation(headlessConfig, 'ERROR_NO_FILTERS')}</>
            )}
          </div>
        </aside>
      </Form>
    </div>
  )
}

ProductFilter.propTypes = {
  productTagsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      databaseId: PropTypes.number
      // count: PropTypes.number
    })
  ),
  handleSelectFilterTag: PropTypes.func
}
