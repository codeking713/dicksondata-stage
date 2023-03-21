import Image from '@/components/atoms/Image'
import PropTypes from 'prop-types'
import styles from './SupportProductHeader.module.scss'
/**
 * Render the SupportProductHeader component.
 *
 * @author DAP
 * @param  {object}  props       SupportProductHeader component props.
 * @param  {object}  props.media Image details
 * @param  {string}  props.name  Product name
 * @return {Element}             The SupportProductHeader component.
 */
export default function SupportProductHeader({media, name}) {
  return (
    <div className={styles.header}>
      <div className={styles.header__image}>
        <Image
          alt={media?.mediaDetails.meta.title}
          imageMeta={media?.mediaDetails}
          url={media?.mediaItemUrl}
          nextImageFill={true}
        />
      </div>
      <h2 className={styles.header__text}>{name}</h2>
    </div>
  )
}

SupportProductHeader.propTypes = {
  media: PropTypes.object,
  name: PropTypes.string
}
