import RichText from '@/components/atoms/RichText'
import cn from 'classnames'
import PropTypes from 'prop-types'
import styles from '../Gutenberg.module.scss'

export const coreListFragment = `
  fragment CoreListFragment on CoreList {
    renderedHtml
    attributes {
      values
      type
      textColor
      start
      placeholder
      gradient
      fontSize
      className
      backgroundColor
    }
  }
`

/**
 * List Block
 *
 * The core List block from Gutenberg.
 *
 * @author DAP
 * @param  {object}  props              The component props.
 * @param  {string}  props.className    Optional classnames.
 * @param  {boolean} props.ordered      Is this an ordered list.
 * @param  {string}  props.anchor       Optional anchor/id.
 * @param  {string}  props.renderedHtml Rendered Html
 * @return {Element}                    The RichText component.
 */
export default function BlockList({className, ordered, anchor, renderedHtml}) {
  return (
    <RichText
      tag={ordered ? 'ol' : 'ul'}
      className={cn(className, styles.main, styles['main--list'])}
      id={anchor}
    >
      {renderedHtml}
    </RichText>
  )
}

BlockList.propTypes = {
  anchor: PropTypes.string,
  ordered: PropTypes.bool,
  className: PropTypes.string,
  values: PropTypes.string
}
