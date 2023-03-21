import RichText from '@/components/atoms/RichText'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './StepItem.module.scss'

/**
 * Render the StepItem component.
 *
 * @param  {object}  props           StepItem component props.
 * @param  {string}  props.title     The list item title
 * @param  {string}  props.text      The list item text
 * @param  {boolean} props.showSteps Show steps
 * @param  {number}  props.index     Index of the element
 * @param  {object}  props.icon      Index of the element
 * @return {Element}                 The StepItem component.
 */
export default function StepItem({title, text, showSteps, index, icon}) {
  return (
    <div className={`${styles.list}`}>
      {(showSteps == true || (showSteps == false && icon)) && (
        <div
          className={`${styles.list__icon} ${
            showSteps == true && styles['list__icon--stepper']
          }`}
        >
          <div
            className={`${styles.list__icon__outline} ${
              showSteps == false && icon && styles['list__icon__outline--img']
            }`}
          >
            {showSteps == true && index + 1}
            {showSteps == false && icon && (
              <img src={icon?.mediaItemUrl} alt={icon?.altText} />
            )}
          </div>
        </div>
      )}
      <div
        className={`${styles.list__content} ${
          showSteps == true && styles['list__content--stepper']
        } ${showSteps == false && icon && styles['list__content--icon']}`}
      >
        {title && (
          <RichText className={styles.list__content__title}>{title}</RichText>
        )}
        {text && (
          <RichText className={styles.list__content__text}>{text}</RichText>
        )}
      </div>
    </div>
  )
}

StepItem.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  showSteps: PropTypes.bool,
  index: PropTypes.number,
  icon: PropTypes.shape({
    altText: PropTypes.string,
    mediaItemUrl: PropTypes.string,
    mediaDetails: PropTypes.shape({
      height: PropTypes.number,
      sizes: PropTypes.array,
      width: PropTypes.number
    })
  })
}
