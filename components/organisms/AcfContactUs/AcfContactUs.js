import Button from '@/components/atoms/Button'
import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './AcfContactUs.module.scss'
/**
 * Render the AcfContactUs component.
 *
 * @param  {object}  props           AcfContactUs component props.
 * @param  {string}  props.body      The body text.
 * @param  {string}  props.className The className.
 * @param  {object}  props.ctaText   The cta text.
 * @param  {object}  props.ctaUrl    The cta url.
 * @param  {string}  props.title     The title.
 * @return {Element}                 The AcfContactUs component.
 */
export default function AcfContactUs({
  body,
  className,
  ctaText,
  ctaUrl,
  title
}) {
  return (
    <div className={styles.container}>
      <section className={cn(styles.section, className)}>
        <div className={styles.section__text}>
          <>
            {title && <h2 className={styles.section__text__title}>{title}</h2>}
            {body && <p className={styles.section__text__body}>{body}</p>}
            {ctaText && ctaUrl && (
              <Button
                className={styles.section__text__button}
                url={ctaUrl}
                text={ctaText}
                type="primary"
                size="md"
              />
            )}
          </>
        </div>
      </section>
    </div>
  )
}

AcfContactUs.propTypes = {
  body: PropTypes.string,
  className: PropTypes.string,
  ctaText: PropTypes.string,
  ctaUrl: PropTypes.string,
  title: PropTypes.string
}
