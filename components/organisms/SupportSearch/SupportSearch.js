import Container from '@/components/atoms/Container'
import {getTranslation} from '@/functions/utility'
import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './SupportSearch.module.scss'

/**
 * Render the SupportSearch component.
 *
 * @author DAP
 * @param  {object}   props                Component props.
 * @param  {string}   props.search         The search input value
 * @param  {Function} props.setSearch      The search input onChange function
 * @param  {string}   props.selected       The select input value
 * @param  {object}   props.headlessConfig Headless config data
 * @param  {Function} props.setSelected    The select input onChange function
 * @return {Element}                       The SupportSearch component.
 */
export default function SupportSearch({
  search,
  setSearch,
  selected,
  setSelected,
  headlessConfig
}) {
  const selectOnChange = (e) => {
    setSelected(e.target.value)
    setSearch('')
  }

  const searchOnChange = (e) => {
    setSearch(e.target.value)
    setSelected(getTranslation(headlessConfig, 'SELECT_CATEGORY'))
  }

  return (
    <Container className={styles.container}>
      <div className={styles.container__search}>
        <div className={styles.container__text}>
          {getTranslation(headlessConfig, 'FIND_YOUR_DATA_LOGGER_OR_SENSOR')}
        </div>
        <div className={styles['container__search--input']}>
          <input
            value={search}
            onChange={searchOnChange}
            type="text"
            placeholder={getTranslation(headlessConfig, 'SEARCH')}
            style={
              selected !== getTranslation(headlessConfig, 'SELECT_CATEGORY')
                ? {background: '#e9f1f5'}
                : {background: 'white'}
            }
          />
          <i
            style={
              selected !== getTranslation(headlessConfig, 'SELECT_CATEGORY')
                ? {background: '#e9f1f5'}
                : {background: 'white'}
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z" />
            </svg>
          </i>
        </div>
      </div>
      <div
        className={cn(styles.container__text, styles['container__text--or'])}
      >
        {getTranslation(headlessConfig, 'OR')}
      </div>
      <div className={styles.container__select}>
        <div className={styles.container__text}>
          {getTranslation(headlessConfig, 'SELECT_PRODUCT')}
        </div>
        <div className={styles['container__select--wrapper']}>
          <select
            value={selected}
            onChange={selectOnChange}
            style={search ? {background: '#e9f1f5'} : {background: 'white'}}
            className={styles['container__select--style']}
          >
            <option>{getTranslation(headlessConfig, 'SELECT_CATEGORY')}</option>
            <option>{getTranslation(headlessConfig, 'GENERAL_FAQ')}</option>
            <option>{getTranslation(headlessConfig, 'OTHER')}</option>
          </select>
        </div>
      </div>
    </Container>
  )
}

SupportSearch.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  selected: PropTypes.string,
  setSelected: PropTypes.func
}
