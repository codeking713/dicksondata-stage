import DisplayImage from '@/components/atoms/Image'
import PropTypes from 'prop-types'
import styles from '../Gutenberg.module.scss'

/**
 * Image Block
 *
 * The core Image block from Gutenberg.
 *
 * @author DAP
 * @param  {object}  props The component props.
 * @return {Element}       The Block Image component.
 */
export default function BlockImage(props) {
  return (
    <div className={`${styles.main} ${styles['main--image']}`}>
      <DisplayImage {...props} />
    </div>
  )
}

BlockImage.propTypes = {
  props: PropTypes.object
}
