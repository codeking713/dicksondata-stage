import {getTranslation} from '@/functions/utility'
import React from 'react'
import styles from './SearchResultSummary.module.scss'

/**
 * Component for rendering search result summary.
 *
 * @param  {object}  props                Search result count
 * @param  {number}  props.count          Search result count
 * @param  {string}  props.query          Search
 * @param  {object}  props.headlessConfig Headless config data
 * @return {Element}                      The SupportCategorySkeleton component.
 */
const SearchResultSummary = ({count, query, headlessConfig}) => {
  return (
    <div className={styles.summary}>
      {`${count} ${getTranslation(headlessConfig, 'RESULTS_FOR')} `}
      <span className={styles.summary__query}>{query}</span>
    </div>
  )
}
export default SearchResultSummary
