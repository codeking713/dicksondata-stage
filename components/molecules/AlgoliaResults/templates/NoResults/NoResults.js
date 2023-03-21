import SearchResultSummary from '@/components/molecules/AlgoliaResults/templates/SearchResultSummary'
import PageNotifications from '@/components/molecules/PageNotifications'
import {getTranslation} from '@/functions/utility'
import PropTypes from 'prop-types'
import styles from './NoResults.module.scss'

/**
 * Render the NoResults component.
 *
 * @author DAP
 * @param  {object}  props                The component attributes as props.
 * @param  {object}  props.headlessConfig Headless config data.
 * @param  {object}  props.query          The no results data.
 * @return {Element}                      The NoResults component.
 */
export default function NoResults({query, headlessConfig}) {
  return (
    <>
      {query && (
        <SearchResultSummary
          count={0}
          query={query}
          headlessConfig={headlessConfig}
        />
      )}
      <div className={styles.notification}>
        <PageNotifications
          message={getTranslation(
            headlessConfig,
            'SORRY_THERE_ARE_NO_SEARCH_RESULTS'
          )}
          type="WARNING"
          open={true}
        />
      </div>
    </>
  )
}

NoResults.propTypes = {
  query: PropTypes.string
}

NoResults.defaultProps = {
  query: ''
}
