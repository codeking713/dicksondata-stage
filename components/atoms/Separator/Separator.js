import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Separator.module.scss'

/**
 * Render the Separator component.
 *
 * @author DAP
 * @param  {object}  props           The component properties.
 * @param  {string}  props.anchor    Optional anchor/id.
 * @param  {string}  props.className Optional classname.
 * @param  {boolean} props.fullWidth Is this a fullwidth block.
 * @return {Element}                 The Separator component.
 */
export default function Separator({anchor, className, fullWidth}) {
  return (
    <>
      {fullWidth ? (
        <hr id={anchor} className={cn(styles.separator, className)} />
      ) : (
        <hr id={anchor} className={cn(styles.separator, className)} />
      )}
    </>
  )
}

Separator.propTypes = {
  anchor: PropTypes.string,
  className: PropTypes.string,
  fullWidth: PropTypes.bool.isRequired
}

Separator.defaultProps = {
  fullWidth: false
}
