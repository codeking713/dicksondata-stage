import {useWordPressContext} from '@/components/common/WordPressProvider'
import PageNotifications from '@/components/molecules/PageNotifications'
import {getTranslation} from '@/functions/utility'
import {searchClient} from '@/lib/algolia/connector'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {Configure, InstantSearch} from 'react-instantsearch-dom'
import styles from './AlgoliaResults.module.scss'
import NoResults from './templates/NoResults'
import SearchResults from './templates/SearchResults'
import SearchResultSkeleton from './templates/SearchResultSkeleton'

/**
 * Render the AlgoliaResults component.
 *
 * @author DAP
 * @param  {object}  props        The component attributes as props.
 * @param  {object}  props.config Algolia configuration.
 * @return {Element}              The AlgoliaResults component.
 */
export default function AlgoliaResults({config}) {
  const {algolia} = useWordPressContext()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const {headlessConfig} = useWordPressContext()

  const handleInit = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setIsError(true)
  }

  // Dispatch console warning if Index Name missing.
  if (!algolia?.indexName) {
    console.warn('Algolia: Index Name is missing from env variables.')
  }
  return (
    <div className={styles.algoliaResults}>
      {config.query !== '' && (
        <>
          {isLoading && <SearchResultSkeleton tileCount={10} />}
          <InstantSearch
            searchClient={searchClient}
            indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
          >
            <Configure {...config} />
            {!isError ? (
              <SearchResults
                indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
                handleInit={handleInit}
                handleError={handleError}
                headlessConfig={headlessConfig}
              />
            ) : (
              <PageNotifications
                message={getTranslation(
                  headlessConfig,
                  'ERROR_OCCURED_DURING_SEARCH'
                )}
                type="ERROR"
                open={true}
              />
            )}
          </InstantSearch>
        </>
      )}
      {config.query === '' && (
        <NoResults query={config.query} headlessConfig={headlessConfig} />
      )}
    </div>
  )
}

AlgoliaResults.propTypes = {
  config: PropTypes.shape({
    query: PropTypes.string,
    hitsPerPage: PropTypes.number.isRequired
  })
}

AlgoliaResults.defaultProps = {
  config: {
    query: '',
    hitsPerPage: 10
  }
}
