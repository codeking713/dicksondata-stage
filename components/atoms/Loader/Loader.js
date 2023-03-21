import PropTypes from 'prop-types'
import React from 'react'
import styles from './Loader.module.scss'
/**
 * Render the Loader component.
 *
 * @author DAP
 * @param  {object}  props            The component attributes as props.
 * @param  {boolean} props.processing Indicate if the loader is running
 * @return {Element}                  The Loader component.
 */
export default function Loader({processing}) {
  return (
    processing && (
      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  )
}

Loader.propTypes = {
  processing: PropTypes.bool
}

Loader.defaultProps = {
  processing: false
}
