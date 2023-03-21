import SearchResultSummary from '@/components/molecules/AlgoliaResults/templates/SearchResultSummary'
import {getTranslation} from '@/functions/utility'
import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {connectStateResults, InfiniteHits} from 'react-instantsearch-dom'
import Hit from '../Hit'
import NoResults from '../NoResults'
import styles from './SearchResults.module.scss'

/**
 * Component for rendering search results.
 */
const SearchResults = connectStateResults(
  ({searchResults, handleInit, handleError, error, headlessConfig}) => {
    useEffect(() => {
      if (searchResults !== null) {
        handleInit()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResults])

    useEffect(() => {
      if (error !== null) {
        handleError()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    return (
      <>
        {searchResults && searchResults.nbHits > 0 && (
          <div>
            <SearchResultSummary
              count={searchResults.nbHits}
              query={searchResults.query}
              headlessConfig={headlessConfig}
            />
            <div className={styles.results}>
              <InfiniteHits
                className={styles.results__item}
                hitComponent={Hit}
                translations={{
                  loadMore: getTranslation(headlessConfig, 'LOAD_MORE')
                }}
              />
            </div>
          </div>
        )}
        {searchResults && searchResults.nbHits === 0 && (
          <NoResults
            query={searchResults.query}
            headlessConfig={headlessConfig}
          />
        )}
      </>
    )
  }
)
export default SearchResults

SearchResults.propTypes = {
  searchResults: PropTypes.any,
  indexName: PropTypes.string
}
