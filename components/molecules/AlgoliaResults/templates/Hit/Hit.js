import Button from '@/components/atoms/Button'
import {getTranslation} from '@/functions/utility'
import {useWordPressContext} from 'components/common/WordPressProvider'
import PropTypes from 'prop-types'
import styles from './Hit.module.scss'

/**
 * Render the Hit component.
 *
 * @author DAP
 * @param  {object}  props     The component attributes as props.
 * @param  {object}  props.hit The hit data.
 * @return {Element}           The Hit component.
 */
export default function Hit({hit}) {
  const {headlessConfig} = useWordPressContext()
  return (
    <div className={styles.hit}>
      <div className={`${styles['grid']} ${styles['gap-sm']}`}>
        <div className={`${styles['col-12@md']}`}>
          <h3 dangerouslySetInnerHTML={{__html: hit.post_title}}></h3>
          <p className={styles.hit__text}>{hit.content}</p>
          <Button
            className={`${styles.hit__cta}`}
            size="sm"
            type="ghost"
            text={getTranslation(headlessConfig, 'READ_MORE')}
            url={hit.permalink}
          />
        </div>
      </div>
    </div>
  )
}

Hit.propTypes = {
  hit: PropTypes.any
}
