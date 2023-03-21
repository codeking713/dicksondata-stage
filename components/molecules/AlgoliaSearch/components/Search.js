import {searchClient} from '@/lib/algolia/connector'
import PropTypes from 'prop-types'
import React, {useCallback, useEffect, useState} from 'react'
import {Configure, InstantSearch, SearchBox} from 'react-instantsearch-dom'
import styles from '../AlgoliaSearch.module.scss'
import {deleteLocalStorage} from '../functions/localStorage'
import searchSubmit from '../functions/searchSubmit'
import Results from './Results'
import SearchIcon from './SearchIcon'

/**
 * Render the Search component.
 *
 * @author DAP
 * @param  {object}  props            The component attributes as props.
 * @param  {string}  props.indexName  The search index name stored in Algolia.
 * @param  {string}  props.query      The search query
 * @param  {boolean} props.useHistory Whether to display search history.
 * @param  {number}  props.minInput   Minimum number of characters needed to trigger search.
 * @return {Element}                  The Search component.
 */
export default function Search({indexName, query, useHistory, minInput}) {
  const storageName = indexName // Local Storage Name - set to algolia index.
  const historyLength = 6 // Max amount of history items to save to local storage.
  const hitsPerPage = 6 // Amount of hit to render in drop results.
  const [searchState, setSearchState] = useState(query)
  const [searchHistory, setSearchHistory] = useState([])
  const [displayHistory, setDisplayHistory] = useState(0)
  const [shouldDisplayResults, setShouldDisplayResults] = useState(false)
  const config = {
    query: query,
    hitsPerPage: hitsPerPage
  }

  /**
   * Show/Hide the search history.
   */
  const showHistory = useCallback(() => {
    setDisplayHistory(searchState === '')
  }, [searchState])

  // Track changes in `searchState`.
  useEffect(() => {
    showHistory()
  }, [searchState, showHistory])

  // Get search history on initial page load.
  useEffect(() => {
    if (localStorage && useHistory) {
      const history = localStorage.getItem(storageName)
      if (history) {
        let searchHistory = JSON.parse(history)
        setSearchHistory(searchHistory)
      }
    }
  }, [storageName, useHistory])

  /**
   * Delete recent searches and clear history.
   */
  function clearLocalStorage() {
    deleteLocalStorage(storageName)
    setSearchHistory([])
  }

  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <Configure {...config} />
      <div className={styles.searchBox}>
        <SearchBox
          onChange={(e) => {
            if (e.target.value.length >= minInput) {
              setShouldDisplayResults(true)
            } else {
              setShouldDisplayResults(false)
            }
          }}
          /* eslint-disable */
          autoFocus={true}
          /* eslint-enable */
          onSubmit={(e) =>
            searchSubmit(
              e,
              setSearchState,
              searchState,
              storageName,
              historyLength
            )
          }
          onFocus={() => showHistory()}
          onKeyUp={(e) => {
            setSearchState(e.currentTarget.value)
          }}
          onReset={() => {
            setSearchState('')
          }}
          submit={<SearchIcon />}
          defaultRefinement={query || null}
          translations={{
            submitTitle: 'Submit Search Query.',
            resetTitle: 'Clear Search Query',
            placeholder: 'Enter search term...'
          }}
        />
      </div>
      {shouldDisplayResults && (
        <Results
          displayHistory={displayHistory}
          searchHistory={searchHistory}
          clearLocalStorage={clearLocalStorage}
        />
      )}
    </InstantSearch>
  )
}

Search.propTypes = {
  indexName: PropTypes.string.isRequired,
  query: PropTypes.string,
  useHistory: PropTypes.bool,
  minInput: PropTypes.number
}

Search.defaultProps = {
  useHistory: true,
  minInput: 1
}
