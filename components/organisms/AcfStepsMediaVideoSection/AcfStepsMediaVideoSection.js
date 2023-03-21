import Container from '@/components/atoms/Container'
import Image from '@/components/atoms/Image'
import RichText from '@/components/atoms/RichText'
import VideoEmbed from '@/components/atoms/VideoEmbed'
import SectionHead from '@/components/molecules/SectionHead'
import StepItem from '@/components/molecules/StepItem'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import styles from './AcfStepsMediaVideoSection.module.scss'

export const acfStepsMediaVideoSectionFragment = `
  fragment AcfStepsMediaVideoSectionFragment on AcfAcfStepsMediaVideoSection {
    acfFields {
      heading
      preheading
      subheading
      items {
        title
        copy
        icon {
          id
          altText
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
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
      itemsshoulddisplaysteps
      items {
        copy
        title
        icon {
          id
          altText
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
      }
      mediatype
      video {
        title
        url
      }
      forceImageLeft
    }
  }
`

/**
 * Render the AcfStepsMediaVideoSection component.
 *
 * @param  {object}  props                         AcfStepsMediaVideoSection component props.
 * @param  {string}  props.heading                 Heading
 * @param  {string}  props.preheading              Pre header
 * @param  {string}  props.subheading              After heading
 * @param  {Array}   props.items                   Array of items
 * @param  {object}  props.image                   Image
 * @param  {boolean} props.itemsshoulddisplaysteps Indicate whether the list needs to be displayed as steps
 * @param  {string}  props.mediatype               Video or image media
 * @param  {object}  props.video                   Video link
 * @param  {string}  props.forceImageLeft          True/False to force image to the left
 * @return {Element}                               The AcfStepsMediaVideoSection component.
 */
export default function AcfStepsMediaVideoSection({
  preheading,
  heading,
  subheading,
  mediatype,
  image,
  video,
  items,
  itemsshoulddisplaysteps,
  forceImageLeft
}) {
  const sectionClassnames = classNames(
    styles.grid,
    styles['gap-xxl'],
    styles.section,
    {
      [styles['section--forceimgleft']]: forceImageLeft
    }
  )

  const sectionImageClassnames = classNames(
    styles['col-6@md'],
    styles.section__image,
    {
      [styles['section__image--forceimgleft']]: forceImageLeft
    }
  )

  return (
    <section className={styles.outer}>
      <Container className={sectionClassnames}>
        <div className={`${styles['col-6@md']}`}>
          <>
            {preheading && (
              <RichText className={styles.section__prehead}>
                {preheading}
              </RichText>
            )}
            <SectionHead
              subheading={subheading}
              heading={heading}
              alignment="left"
              className={styles.section__head}
            />
            {items && Array.isArray(items) && items.length > 0 && (
              <div
                className={`${styles['grid']}  ${styles['gap-lg']} ${styles.section__items}`}
              >
                {items.map((listItem, index) => (
                  <StepItem
                    key={index}
                    icon={listItem.icon}
                    title={listItem.title}
                    text={listItem.copy}
                    iconStyle={2}
                    showSteps={itemsshoulddisplaysteps}
                    index={index}
                  ></StepItem>
                ))}
              </div>
            )}
          </>
        </div>
        <div className={sectionImageClassnames}>
          {(mediatype === 'Image' || mediatype === '') && image && (
            <Image
              id={image?.id}
              alt={image?.altText}
              imageMeta={image}
              url={image?.mediaItemUrl}
              height={image?.mediaDetails?.height}
              width={image?.mediaDetails?.width}
              src={image?.mediaItemUrl}
            />
          )}
          {mediatype === 'Video' && video && (
            <VideoEmbed
              url={video.url}
              className={styles.section__media__video}
            />
          )}
        </div>
      </Container>
    </section>
  )
}

AcfStepsMediaVideoSection.defaultProps = {
  preheading: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  video: PropTypes.object,
  mediatype: PropTypes.string,
  image: PropTypes.shape({
    altText: PropTypes.string,
    mediaItemUrl: PropTypes.string,
    mediaDetails: PropTypes.shape({
      height: PropTypes.number,
      sizes: PropTypes.array,
      width: PropTypes.number
    })
  }),
  itemsshoulddisplaysteps: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      copy: PropTypes.string,
      icon: PropTypes.shape({
        altText: PropTypes.string,
        mediaItemUrl: PropTypes.string,
        mediaDetails: PropTypes.shape({
          height: PropTypes.number,
          sizes: PropTypes.array,
          width: PropTypes.number
        })
      })
    })
  )
}
