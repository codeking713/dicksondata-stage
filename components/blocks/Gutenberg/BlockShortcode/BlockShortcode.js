import PropTypes from 'prop-types'
import styles from '../Gutenberg.module.scss'

/**
 * Shortcode Block.
 *
 * The core Shortcode block from Gutenberg.
 *
 * @author DAP
 * @param  {object}  props       The component attributes as props.
 * @param  {object}  props.props The component props.
 * @return {Element}             The Shortcode component.
 */
export default function BlockShortcode({props}) {
  const {content} = props

  return (
    <div
      className={`${styles.main} ${styles['main--shortcode']}`}
      dangerouslySetInnerHTML={{__html: content}}
    />
  )
}

BlockShortcode.propTypes = {
  props: PropTypes.object.isRequired,
  content: PropTypes.string
}
