import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Badge.module.scss'
/**
 * Render the Badge component.
 *
 * @author DAP
 * @param  {object}          props           The component attributes as props.
 * @param  {string}          props.className The badge wrapper className.
 * @param  {boolean}         props.smallSize The badge size.
 * @param  {boolean}         props.discount  Is discount
 * @param  {(string|number)} props.vol       The volume of badge.
 * @return {Element}                         The Badge component.
 */
export default function Badge({vol, discount, className, smallSize}) {
  return (
    <>
      <div
        className={cn(
          styles.badge,
          className,
          discount && styles.discount && styles.smallSize,
          smallSize && styles.smallSize
        )}
      >
        {discount ? `${vol}% off` : vol}
      </div>
    </>
  )
}

Badge.propTypes = {
  vol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  discount: PropTypes.bool,
  className: PropTypes.string,
  smallSize: PropTypes.bool
}

Badge.defaultProps = {
  smallSize: false
}
