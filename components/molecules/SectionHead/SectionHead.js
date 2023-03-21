import Heading from '@/components/atoms/Heading'
import RichText from '@/components/atoms/RichText'
import cn from 'classnames'
import PropTypes from 'prop-types'
import styles from './SectionHead.module.scss'

/**
 * Render the SectionHead component.
 *
 * @param  {object}  props               SectionHead component props.
 * @param  {string}  props.alignment     SectionHead alignment (left, center, or right).
 * @param  {string}  props.heading       SectionHead heading.
 * @param  {string}  props.headingTag    SectionHead heading tag (h1, h2, etc.).
 * @param  {string}  props.subheading    SectionHead sub heading paragraph.
 * @param  {string}  props.subheadingTag SectionHead sub heading tag (div, article, etc.).
 * @param  {string}  props.className     Optional classNames.
 * @return {Element}                     The SectionHead component.
 */
export default function SectionHead({
  className,
  alignment,
  heading,
  headingTag,
  subheading,
  subheadingTag
}) {
  const isFunction = (string) => {
    if (typeof string === 'function') {
      return true
    } else {
      return false
    }
  }

  if (!heading && !subheading) {
    return null
  } else {
    return (
      <div
        className={cn(
          styles.container,
          alignment === 'center' && styles['container--center'],
          alignment === 'right' && styles['container--right'],
          className
        )}
      >
        {heading && (
          <Heading
            className={cn(
              styles.container__heading,
              alignment === 'center' && styles['container__heading--center'],
              alignment === 'right' && styles['container__heading--right'],
              `${className}__heading`
            )}
            tag={headingTag}
          >
            {heading}
          </Heading>
        )}
        {subheading && !isFunction(subheading) && (
          <RichText
            className={styles.container__subheading}
            tag={subheadingTag}
          >
            {subheading}
          </RichText>
        )}
      </div>
    )
  }
}

SectionHead.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string,
  headingTag: PropTypes.string,
  subheading: PropTypes.string,
  subheadingTag: PropTypes.string,
  alignment: PropTypes.oneOf(['left', 'center', 'right'])
}

SectionHead.defaultProps = {
  headingTag: 'h2',
  alignment: 'center',
  subheadingTag: 'div'
}
