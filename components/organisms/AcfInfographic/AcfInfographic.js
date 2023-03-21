import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image/Image'
import {ModalContext} from '@/components/context/ModalContext'
import SectionHead from '@/components/molecules/SectionHead'
import PropTypes from 'prop-types'
import {useContext} from 'react'
import styles from './AcfInfographic.module.scss'

export const acfInfographicFragment = `
  fragment AcfInfographicFragment on AcfAcfInfographic {
    acfFields {
      ctatext
      ctatriggersmodal
      ctaurl
      modalcontents
      title
      image {
        id
        altText
        mediaItemUrl
        mediaDetails {
          height
          width
        }
      }
    }
  }
`

/**
 * Render the AcfInfographic component.
 *
 * @author DAP
 * @param  {object}  props                  AcfInfographic component props.
 * @param  {string}  props.title            The heading Text
 * @param  {object}  props.image            The image object: alt, url, width, height.
 * @param  {string}  props.ctaText          The cta text
 * @param  {string}  props.ctaTriggersModal Cta Triggers Modal Flag
 * @param  {string}  props.modalContents    Modal Contents
 * @param  {string}  props.ctaUrl           The cta link.
 * @return {Element}                        The AcfInfographic component.
 */
export default function AcfInfographic({
  title,
  ctaText,
  ctaUrl,
  image,
  ctaTriggersModal,
  modalContents
}) {
  const [setIsOpen, setModalContent] = useContext(ModalContext)

  const openCTAModel = (content) => {
    setModalContent(content)
    setIsOpen(true)
  }
  return (
    <>
      <Container>
        {title && <SectionHead className={styles.heading} heading={title} />}
        {image && (
          <DisplayImage
            className={styles.image}
            alt={image?.altText}
            url={image?.mediaItemUrl}
            imageMeta={image}
          />
        )}

        {ctaTriggersModal ? (
          <div className={styles.container}>
            <Button
              className={styles.container__button}
              type="primary"
              text={ctaText ? ctaText : 'Submit'}
              onClick={() => {
                openCTAModel(modalContents)
              }}
            />
          </div>
        ) : (
          ctaText &&
          ctaUrl && (
            <div className={styles.container}>
              <Button
                className={styles.container__button}
                url={ctaUrl}
                urlExternal={true}
                type="primary"
                text={ctaText}
              />
            </div>
          )
        )}
      </Container>
    </>
  )
}

AcfInfographic.propTypes = {
  title: PropTypes.string,
  ctaText: PropTypes.string,
  ctaUrl: PropTypes.string,
  showButton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  image: PropTypes.shape({
    altText: PropTypes.string,
    mediaItemUrl: PropTypes.string,
    mediaDetails: PropTypes.shape({
      height: PropTypes.number,
      sizes: PropTypes.array,
      width: PropTypes.number
    })
  })
}
