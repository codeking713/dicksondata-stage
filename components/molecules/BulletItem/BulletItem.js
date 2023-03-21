import Icon from '@/components/atoms/Icon'
import RichText from '@/components/atoms/RichText'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './BulletItem.module.scss'
/**
 * Render the BulletItem component.
 *
 * @param  {object}  props      BulletItem component props.
 * @param  {string}  props.text The list item text
 * @return {Element}            The BulletItem component.
 */
export default function BulletItem({text}) {
  return (
    <div className={`${styles.bullet} `}>
      <div className={`${styles.bullet__icon} `}>
        <Icon
          title="chevron"
          style="fill"
          icon="chevron"
          className={styles['bullet__icon--arrow']}
        />
      </div>
      <div className={`${styles.bullet__content}`}>
        {text && (
          <RichText className={styles.bullet__content__text}>{text}</RichText>
        )}
      </div>
    </div>
  )
}

BulletItem.propTypes = {
  text: PropTypes.string
}
