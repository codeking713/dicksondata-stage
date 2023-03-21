import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image/Image'
import SectionHead from '@/components/molecules/SectionHead'
import cn from 'classnames'
import PropTypes from 'prop-types'
import styles from './AcfTwoColumnImage.module.scss'
import Button from '@/components/atoms/Button'

export const acfTwoColumnImageFragment = `
  fragment AcfTwoColumnImageFragment on AcfAcfTwoColumnImage {
    acfFields {
      title
      description
      cta {
        url
        title
      }
      image {
        id
        altText
        mediaItemUrl
        mediaDetails {
          height
          width
        }
      }
      mediaright
    }
  }
`

/**
 * Render the AcfTwoColumnImage component.
 *
 * @author DAP
 * @param  {object}  props             AcfTwoColumnImage component props.
 * @param  {string}  props.title       The heading Text
 * @param  {string}  props.description The copy (Rich Text/WYSIWYG)
 * @param  {boolean} props.mediaright  Whether to show media on the right of the text.
 * @param  {object}  props.image       The image object: alt, url, width, height.
 * @param  {object}  props.cta         The cta link.
 * @param  {string}  props.className   The className.
 * @return {Element}                   The AcfTwoColumnImage component.
 */
export default function AcfTwoColumnImage({
  title,
  description,
  mediaright,
  image,
  className,
  cta
}) {
  // Type conversion (incoming string)
  const mediaFloat = mediaright ? Number(mediaright) : null

  return (
    <Container
      className={cn(
        styles.container,
        mediaFloat ? styles['container--right'] : null,
        className
      )}
    >
      {image && (
        <DisplayImage
          id={image?.id}
          alt={image?.altText}
          url={image?.mediaItemUrl}
          imageMeta={image}
          width={image.mediaDetails?.width ? image.mediaDetails.width : '100%'}
          height={
            image.mediaDetails?.height ? image.mediaDetails.height : 'auto'
          }
          className={styles.container__image}
          nextImageFill={true}
        />
      )}
      <div className={styles.container__copy}>
        <SectionHead
          heading={title ? title : null}
          headingTag="h2"
          alignment={'left'}
          subheading={description ? description : null}
          subheadingTag={'div'}
          className={styles.container__copy__sectionhead}
        />
        {cta?.url && (
          <Button
            className={styles.container__copy__link}
            url={cta?.url}
            text={cta?.title}
            typed="secondary"
            size="md"
          />
        )}
      </div>
    </Container>
  )
}

AcfTwoColumnImage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  mediaright: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  className: PropTypes.string,
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

AcfTwoColumnImage.defaultProps = {
  mediaright: false
}
