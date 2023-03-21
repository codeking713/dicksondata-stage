import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import RichText from '@/components/atoms/RichText'
import {ModalContext} from '@/components/context/ModalContext'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, {useContext} from 'react'
import styles from './AcfHero.module.scss'
import AcfHeroContact from './AcfHeroContact'

export const acfHeroFragment = `
  fragment AcfHero on AcfAcfHero {
    acfFields {
      bodyCopy
      ctaPrimary {
        title
        target
        url
      }
      ctaPrimaryModalContents
      ctaPrimaryText
      ctaPrimaryTriggersModal
      ctaSecondary {
        title
        target
        url
      }
      ctaSecondaryModalContents
      ctaSecondaryText
      ctaSecondaryTriggersModal
      fieldGroupName
      formHeading
      formSubheading
      header
      hasContactForm
      imageBackground {
        id
        altText
        mediaItemUrl
        mediaDetails {
          height
          width
        }
      }
      isDark
      preheader
    }
  }
`

/**
 * Render the AcfHero component.
 *
 * @param  {object}  props                           AcfHero component props.
 * @param  {string}  props.header                    The header.
 * @param  {string}  props.preheader                 The copy text.
 * @param  {string}  props.bodyCopy                  The body copy text.
 * @param  {object}  props.ctaPrimary                The secondary cta object.
 * @param  {object}  props.ctaSecondary              The primary cta object.
 * @param  {object}  props.imageBackground           The image ID.
 * @param  {string}  props.isDark                    Is the background dark
 * @param  {string}  props.hasContactForm            Determines if contact form is displayed
 * @param  {string}  props.formHeading               The form heading
 * @param  {string}  props.formSubheading            The form subheading
 * @param  {string}  props.ctaPrimaryTriggersModal   Cta primary triggers modal flag
 * @param  {string}  props.ctaPrimaryModalContents   Cta primary modal contents
 * @param  {string}  props.ctaSecondaryTriggersModal Cta secondary triggers modal
 * @param  {string}  props.ctaSecondaryModalContents Cta secondary modal contents
 * @param  {string}  props.ctaPrimaryText            Primary model cta text
 * @param  {string}  props.ctaSecondaryText          Secondary model cta text
 * @return {Element}                                 The AcfHero component.
 */
export default function AcfHero({
  bodyCopy,
  ctaPrimary,
  ctaPrimaryTriggersModal,
  ctaPrimaryModalContents,
  ctaPrimaryText,
  ctaSecondary,
  ctaSecondaryTriggersModal,
  ctaSecondaryModalContents,
  ctaSecondaryText,
  imageBackground,
  preheader,
  header,
  isDark,
  hasContactForm,
  formHeading,
  formSubheading
}) {
  const containerClassNames = classNames(styles.container, {
    [styles['container--dark']]: isDark === true
  })

  const sectionClassNames = classNames(styles.section, {
    [styles['section--hascontact']]: hasContactForm === true
  })

  const ctaExists = () => {
    if (
      ctaPrimary ||
      ctaSecondary ||
      ctaPrimaryTriggersModal === true ||
      ctaSecondaryTriggersModal === true
    ) {
      return true
    } else {
      return false
    }
  }

  const [setIsOpen, setModalContent] = useContext(ModalContext)

  const openCTAModel = (content) => {
    setModalContent(content)
    setIsOpen(true)
  }

  return (
    <div className={containerClassNames}>
      <section className={sectionClassNames}>
        <div className={styles.section__text}>
          {preheader && (
            <div className={styles.section__text__preheader}>{preheader}</div>
          )}
          {header && (
            <h1
              dangerouslySetInnerHTML={{__html: header}}
              className={styles.section__text__header}
            />
          )}
          {bodyCopy && (
            <RichText className={styles.section__text__copy}>
              {bodyCopy}
            </RichText>
          )}
          {ctaExists() && (
            <div className={styles.section__text__ctas}>
              {ctaPrimaryTriggersModal === true ? (
                <Button
                  className={styles.section__text__ctas__primary}
                  onClick={() => {
                    openCTAModel(ctaPrimaryModalContents)
                  }}
                  text={ctaPrimaryText ? ctaPrimaryText : 'Submit'}
                  typed="primary"
                  size="md"
                />
              ) : (
                ctaPrimary && (
                  <Button
                    className={styles.section__text__ctas__primary}
                    url={ctaPrimary.url}
                    text={ctaPrimary.title ? ctaPrimary.title : 'Submit'}
                    typed="primary"
                    size="md"
                  />
                )
              )}

              {ctaSecondaryTriggersModal === true ? (
                <Button
                  className={styles.section__text__ctas__secondary}
                  onClick={() => {
                    openCTAModel(ctaSecondaryModalContents)
                  }}
                  text={ctaSecondaryText ? ctaSecondaryText : 'Submit'}
                  typed="secondary"
                  size="md"
                />
              ) : (
                ctaSecondary && (
                  <Button
                    className={styles.section__text__ctas__secondary}
                    url={ctaSecondary.url}
                    text={ctaSecondary.title}
                    typed="secondary"
                    size="md"
                  />
                )
              )}
            </div>
          )}
        </div>
        {hasContactForm === true && (
          <AcfHeroContact
            formHeading={formHeading}
            formSubheading={formSubheading}
          />
        )}
        {!!imageBackground && (
          <div className={styles.section__bgimage}>
            <Image
              alt={imageBackground?.altText}
              imageMeta={imageBackground}
              className={styles.section__bgimage__img}
              height={imageBackground?.mediaDetails?.height}
              src={imageBackground?.mediaItemUrl}
              width={imageBackground?.mediaDetails?.width}
              nextImageFill={true}
            />
          </div>
        )}
      </section>
    </div>
  )
}

AcfHero.propTypes = {
  copy: PropTypes.string,
  className: PropTypes.string,
  ctaPrimary: PropTypes.oneOfType([
    PropTypes.shape({
      target: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string
    }),
    PropTypes.string
  ]),
  ctaSecondary: PropTypes.oneOfType([
    PropTypes.shape({
      target: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string
    }),
    PropTypes.string
  ]),
  imageBackground: PropTypes.shape({
    id: PropTypes.string,
    altText: PropTypes.string,
    mediaItemUrl: PropTypes.string,
    mediaDetails: PropTypes.object
  }),
  imageMeta: PropTypes.shape({
    altText: PropTypes.string,
    mediaItemUrl: PropTypes.string,
    mediaDetails: PropTypes.shape({
      height: PropTypes.number,
      sizes: PropTypes.array,
      width: PropTypes.number
    })
  }),
  header: PropTypes.string
}
