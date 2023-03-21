import Button from '@/components/atoms/Button'
import {getTranslation} from '@/functions/utility'
import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import styles from './ProductSort.module.scss'

/**
 * @param  {object}   props                        ProductSort component props.
 * @param  {Function} props.handleSelectSortOption Handle sorting
 * @param  {object}   props.sortOption             Currently selected sort option
 * @param  {boolean}  props.loading                Loading data
 * @param  {object}   props.headlessConfig         Headless Config
 * @return {Element}                               The ProductSort component.
 */
export default function ProductSort({
  handleSelectSortOption,
  sortOption,
  loading,
  headlessConfig
}) {
  const [active, setActive] = useState(false)
  const wrapperRef = useRef(null)
  useOutsideClickHandler(wrapperRef)

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
          setActive(false)
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

  const sortOptions = [
    {
      orderBy: 'TOTAL_SALES',
      order: 'DESC',
      text: getTranslation(headlessConfig, 'POPULAR')
    },
    {
      orderBy: 'DATE',
      order: 'DESC',
      text: getTranslation(headlessConfig, 'LATEST')
    },
    {
      orderBy: 'PRICE',
      order: 'ASC',
      text: getTranslation(headlessConfig, 'PRICE_LOW_HIGH')
    },
    {
      orderBy: 'PRICE',
      order: 'DESC',
      text: getTranslation(headlessConfig, 'PRICE_HIGH_LOW')
    }
  ]

  const handleSelectSortOptionOnClick = (value) => {
    setActive(false)
    handleSelectSortOption(value)
  }

  return (
    <div className={styles.sort} ref={wrapperRef}>
      <Button
        size="sm"
        isSubmit={false}
        iconLeft={true}
        icon="sort"
        disabled={loading}
        text={`${
          sortOption
            ? sortOption.text
            : getTranslation(headlessConfig, 'SORT_BY')
        }`}
        className={`${styles.sort__button} ${
          active && styles['sort__button--active']
        }`}
        onClick={() => setActive(!active)}
      />
      {active && (
        <div className={styles.sort__options}>
          <span className={styles.sort__options__option__notch}></span>
          <span
            className={`${styles.sort__options__option__notch} ${styles['sort__options__option__notch--border']}`}
          ></span>
          <ul>
            {sortOptions.map((value) => {
              return (
                <li
                  className={styles.sort__options__option}
                  key={value.orderBy}
                  onClick={() => handleSelectSortOptionOnClick(value)}
                >
                  <div
                    className={`${
                      sortOption &&
                      sortOption.orderBy === value.orderBy &&
                      sortOption.order === value.order &&
                      styles.sort__options__option__checked
                    }`}
                  >
                    {value.text}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

ProductSort.propTypes = {
  handleSelectSortOption: PropTypes.func
}
