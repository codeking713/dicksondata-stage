import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image'
import RichText from '@/components/atoms/RichText'
import {ModalContext} from '@/components/context/ModalContext'
import SectionHead from '@/components/molecules/SectionHead'
import PropTypes from 'prop-types'
import {useContext} from 'react'
import styles from './AcfWhitepaper.module.scss'

export const acfWhitepaperFragment = `
  fragment AcfWhitepaperFragment on AcfAcfWhitepaper {
    acfFields {
      sectionCopy
      sectionHeading
      sectionLinkModalContents
      sectionLinkText
      sectionLinkTriggersModal
      sectionImage {
        id
        altText
        mediaItemUrl
        mediaDetails {
          height
          width
        }
      }
      sectionLink {
        target
        title
        url
      }
    }
  }
`

/**
 * Render the AcfWhitepaper component.
 *
 * @param  {object}  props                          AcfWhitepaper component props.
 * @param  {string}  props.sectionHeading           The body text.
 * @param  {object}  props.sectionLink              The cta url.
 * @param  {object}  props.sectionImage             The image object with url and details.
 * @param  {string}  props.sectionCopy              The richtext.
 * @param  {string}  props.sectionLinkTriggersModal The section link triggers modal flag
 * @param  {string}  props.sectionLinkModalContents The section link modal contents
 * @param  {string}  props.sectionLinkText          Model trigger cta text
 * @return {Element}                                The AcfWhitepaper component.
 */
export default function AcfWhitepaper({
  sectionHeading,
  sectionCopy,
  sectionLink,
  sectionLinkTriggersModal,
  sectionLinkText,
  sectionLinkModalContents,
  sectionImage
}) {
  const [setIsOpen, setModalContent] = useContext(ModalContext)
  const openCTAModel = (content) => {
    setModalContent(content)
    setIsOpen(true)
  }

  return (
    <div className={styles.outer}>
      <Container className={styles.section}>
        {sectionImage && sectionImage.mediaItemUrl && (
          <div className={styles.section__image}>
            <img
              src={sectionImage.mediaItemUrl}
              alt={sectionImage.altText}
              className={styles.section__image__img}
            />
          </div>
        )}
        <div className={styles.section__copy}>
          {sectionHeading && (
            <SectionHead
              heading={sectionHeading}
              alignment="left"
              className={styles.section__copy__head}
            />
          )}
          {sectionCopy && (
            <div className={styles.section__copy__content}>
              <RichText tag="div">{sectionCopy}</RichText>
            </div>
          )}

          {sectionLinkTriggersModal ? (
            <Button
              className={styles.section__copy__button}
              text={sectionLinkText ? sectionLinkText : 'Submit'}
              onClick={() => {
                openCTAModel(sectionLinkModalContents)
              }}
            />
          ) : (
            sectionLink && (
              <Button
                className={styles.section__copy__button}
                text={sectionLink.title}
                url={sectionLink.url}
              />
            )
          )}
        </div>
      </Container>
      <DisplayImage
        url={`${process.env.FRONTEND_URL}images/bg_lines.png`}
        alt="Decorative line background"
        width="787"
        height="635"
        nextImageFill={true}
        className={styles.section__background}
      />
    </div>
  )
}

AcfWhitepaper.propTypes = {
  sectionHeading: PropTypes.string,
  sectionCopy: PropTypes.string,
  sectionLink: PropTypes.object,
  image: PropTypes.object
}
