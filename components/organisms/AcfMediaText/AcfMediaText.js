import Button from '@/components/atoms/Button'
import DisplayImage from '@/components/atoms/Image'
import {ModalContext} from '@/components/context/ModalContext'
import cn from 'classnames'
import PropTypes from 'prop-types'
import {useContext} from 'react'
import styles from './AcfMediaText.module.scss'

export const acfMediaTextFragment = `
  fragment AcfMediaTextFragment on AcfAcfMediaText {
    acfFields {
      body
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
 * Render the AcfMediaText component.
 *
 * @param  {object}  props                  AcfMediaText component props.
 * @param  {string}  props.body             The body text.
 * @param  {string}  props.className        The className.
 * @param  {object}  props.ctatext          The cta text.
 * @param  {object}  props.ctaurl           The cta url.
 * @param  {object}  props.image            The image ID.
 * @param  {boolean} props.mediaLeft        Whether to show media on the left of the text.
 * @param  {string}  props.title            The title.
 * @param  {string}  props.ctatriggersmodal Cta Triggers Modal flag
 * @param  {string}  props.modalcontents    modal contents
 * @return {Element}                        The AcfMediaText component.
 */
export default function AcfMediaText({
  body,
  className,
  ctatext,
  ctaurl,
  image,
  mediaLeft,
  title,
  ctatriggersmodal,
  modalcontents
}) {
  const [setIsOpen, setModalContent] = useContext(ModalContext)
  const openCTAModel = (content) => {
    setModalContent(content)
    setIsOpen(true)
  }
  return (
    <div className={styles.container}>
      <section
        className={cn(
          styles.section,
          mediaLeft ? styles['section--left'] : null,
          className
        )}
      >
        <div className={styles.section__text}>
          <>
            {title && <h2 className={styles.section__text__title}>{title}</h2>}
            {body && <p className={styles.section__text__body}>{body}</p>}
            {ctatriggersmodal ? (
              <Button
                className={styles.section__text__button}
                text={ctatext ? ctatext : 'Submit'}
                type="primary"
                size="md"
                onClick={() => {
                  openCTAModel(modalcontents)
                }}
              />
            ) : (
              ctatext &&
              ctaurl && (
                <Button
                  className={styles.section__text__button}
                  url={ctaurl}
                  text={ctatext}
                  type="primary"
                  size="md"
                />
              )
            )}
          </>
        </div>
        {!!image && (
          <div className={styles.section__media}>
            <DisplayImage
              className={styles.imageWrap}
              id={image?.id}
              alt={image?.altText}
              imageMeta={image}
              nextImageFill={true}
            />
          </div>
        )}
      </section>
    </div>
  )
}

AcfMediaText.propTypes = {
  body: PropTypes.string,
  className: PropTypes.string,
  ctatext: PropTypes.string,
  ctaurl: PropTypes.string,
  image: PropTypes.shape({
    altText: PropTypes.string,
    mediaItemUrl: PropTypes.string,
    mediaDetails: PropTypes.shape({
      height: PropTypes.number,
      sizes: PropTypes.array,
      width: PropTypes.number
    })
  }),
  mediaLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  title: PropTypes.string
}

AcfMediaText.defaultProps = {
  mediaLeft: false
}
