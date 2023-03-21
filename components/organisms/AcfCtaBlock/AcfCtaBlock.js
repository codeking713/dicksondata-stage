import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import {ModalContext} from '@/components/context/ModalContext'
import SectionHead from '@/components/molecules/SectionHead'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {useContext} from 'react'
import styles from './AcfCtaBlock.module.scss'

export const acfCtaBlockFragment = `
  fragment AcfCtaBlockFragment on AcfAcfCtaBlock {
    acfFields {
      title
      isDark
      fieldGroupName
      description
      ctaSecondaryTriggersModal
      ctaSecondaryText
      ctaSecondaryModalContents
      ctaPrimaryTriggersModal
      ctaPrimaryText
      ctaPrimaryModalContents
      ctaPrimary {
        target
        title
        url
      }
      ctaSecondary {
        target
        title
        url
      }
    }
  }
`

/**
 * Render the AcfBlock component.
 *
 * @author DAP
 * @param  {object}  props                           AcfBlock component props.
 * @param  {string}  props.title                     The heading Text
 * @param  {string}  props.description               The copy (Rich Text/WYSIWYG)
 * @param  {object}  props.ctaPrimary                The cta primary link.
 * @param  {object}  props.ctaSecondary              The cta secondary link.
 * @param  {string}  props.ctaPrimaryTriggersModal   The cta primary triggers modal flag
 * @param  {string}  props.ctaPrimaryModalContents   Cta primary modal contents
 * @param  {string}  props.ctaSecondaryTriggersModal The cta secondary triggers modal flag
 * @param  {string}  props.ctaSecondaryModalContents Cta secondary modal contents
 * @param  {string}  props.ctaPrimaryText            Primary Model cta text
 * @param  {string}  props.ctaSecondaryText          Secondary Model cta text
 * @param  {object}  props.isDark                    Determines if background is dark
 * @return {Element}                                 The AcfBlock component.
 */
export default function AcfBlock({
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  isDark,
  ctaPrimaryTriggersModal,
  ctaPrimaryModalContents,
  ctaPrimaryText,
  ctaSecondaryTriggersModal,
  ctaSecondaryModalContents,
  ctaSecondaryText
}) {
  const outerClassnames = classNames(styles.outer, {
    [styles['outer--dark']]: isDark
  })

  const [setIsOpen, setModalContent] = useContext(ModalContext)

  const openCTAModel = (content) => {
    setModalContent(content)
    setIsOpen(true)
  }

  return (
    <div className={outerClassnames}>
      <Container className={styles.container}>
        {title && (
          <SectionHead
            heading={title}
            headingTag="h2"
            subheading={description}
            subheadingTag={'div'}
            className={styles.container__head}
          />
        )}
        <div className={styles.container__ctablock}>
          {ctaPrimaryTriggersModal ? (
            <Button
              className={styles.container__ctablock__ctaprimary}
              onClick={() => {
                openCTAModel(ctaPrimaryModalContents)
              }}
              text={ctaPrimaryText ? ctaPrimaryText : 'Submit'}
              type="primary"
            />
          ) : (
            ctaPrimary && (
              <Button
                className={styles.container__ctablock__ctaprimary}
                url={ctaPrimary.url}
                text={ctaPrimary.title}
                type="primary"
              />
            )
          )}

          {ctaSecondaryTriggersModal ? (
            <Button
              className={styles.container__ctablock__ctasecondary}
              onClick={() => {
                openCTAModel(ctaSecondaryModalContents)
              }}
              text={ctaSecondaryText ? ctaSecondaryText : 'Submit'}
              type="secondary"
            />
          ) : (
            ctaSecondary && (
              <Button
                className={styles.container__ctablock__ctasecondary}
                url={ctaSecondary.url}
                text={ctaSecondary.title}
                type="secondary"
              />
            )
          )}
        </div>
      </Container>
    </div>
  )
}

AcfBlock.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  cta_primary: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  cta_secondary: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  is_dark: PropTypes.string
}
