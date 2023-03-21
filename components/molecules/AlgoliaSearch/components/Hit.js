import PropTypes from 'prop-types'
import {Highlight} from 'react-instantsearch-dom'
import searchClick from '../functions/searchClick'
import styles from './Hit.module.scss'
/**
 * Render the Hit component.
 *
 * @author DAP
 * @see https://www.algolia.com/doc/api-reference/widgets/hits/react/
 * @param  {object}  props     The component attributes as props.
 * @param  {object}  props.hit Renders each hit from the results.
 * @return {Element}           The Hit component.
 */
export default function Hit({hit}) {
  return (
    <button
      className={styles.btn}
      type="button"
      data-url={hit?.permalink}
      data-title={hit?.post_title}
      onClick={(e) => searchClick(e)}
    >
      {hit?.images?.thumbnail?.url && (
        <img
          alt="product"
          className={styles.btn__img}
          src={hit?.images?.thumbnail?.url}
        />
      )}
      <Highlight attribute="post_title" hit={hit} />
    </button>
  )
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired
}
