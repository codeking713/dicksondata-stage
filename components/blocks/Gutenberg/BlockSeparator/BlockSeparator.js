import Separator from '@/components/atoms/Separator'
import PropTypes from 'prop-types'
import styles from '../Gutenberg.module.scss'
import cn from 'classnames'

/**
 * Separator Block
 *
 * The core Separator block from Gutenberg.
 *
 * @author DAP
 * @param  {object}  props           The component attributes as props.
 * @param  {string}  props.className Optional classnames.
 * @param  {string}  props.anchor    Optional anchor/id.
 * @return {Element}                 The Separator component.
 */
export default function BlockSeparator({className, anchor}) {
  const isFullWidth =
    (className && className.includes('is-style-full-width')) > 0 ? true : false

  return (
    <Separator
      className={cn(className, styles.main, styles['main--seperator'])}
      anchor={anchor}
      fullWidth={isFullWidth}
    />
  )
}

BlockSeparator.propTypes = {
  className: PropTypes.string,
  anchor: PropTypes.string
}
