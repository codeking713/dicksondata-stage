import PropTypes from 'prop-types'
import React from 'react'
import styles from './Container.module.scss'
import cn from 'classnames'

/**
 * Render the Container component.
 *
 * @param  {object}  props              Container component props.
 * @param  {object}  props.children     Container children.
 * @param  {boolean} props.noPaddingTop Should container render top padding.
 * @param  {boolean} props.noPaddingBtm Should container render bottom padding.
 * @param  {string}  props.className    Optional classnames.
 * @return {Element}                    The Container component.
 */
export default function Container({
  children,
  noPaddingTop,
  noPaddingBtm,
  className
}) {
  return (
    <div
      className={cn(
        styles.container,
        noPaddingTop && styles['container--nopadtop'],
        noPaddingBtm && styles['container--nopadbot'],
        className
      )}
    >
      {children && children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node,
  noPaddingTop: PropTypes.bool,
  noPaddingBtm: PropTypes.bool
}

Container.defaultProps = {
  noPaddingTop: false,
  noPaddingBtm: false
}
