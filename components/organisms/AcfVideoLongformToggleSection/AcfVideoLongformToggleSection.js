import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image'
import VideoEmbed from '@/components/atoms/VideoEmbed'
import Accordion from '@/components/molecules/Accordion'
import SectionHead from '@/components/molecules/SectionHead'
import PropTypes from 'prop-types'
import styles from './AcfVideoLongformToggleSection.module.scss'

export const acfVideoLongformToggleSectionFragment = `
  fragment AcfVideoLongformToggleSectionFragment on AcfAcfVideoLongformToggleSection {
    acfFields {
      copy
      heading
      media
      togglecontentcopy
      togglecontentheading
      togglecontentimage {
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
 * Render the AcfVideoLongformToggleSection component.
 *
 * @param  {object}  props                      AcfVideoLongformToggleSection component props.
 * @param  {string}  props.heading              The heading
 * @param  {string}  props.copy                 The copy
 * @param  {string}  props.media                The video media
 * @param  {string}  props.togglecontentheading The toggle content heading
 * @param  {string}  props.togglecontentcopy    The toggle content copy
 * @param  {object}  props.togglecontentimage   The toggle content image
 * @return {Element}                            The AcfVideoLongformToggleSection component.
 */
export default function AcfVideoLongformToggleSection({
  heading,
  copy,
  media,
  togglecontentimage,
  togglecontentheading,
  togglecontentcopy
}) {
  const renderToggleContent = () => {
    return (
      <Container className={styles.section__accordion__content__container}>
        {togglecontentimage && (
          <DisplayImage
            alt={togglecontentimage?.altText}
            url={togglecontentimage?.mediaItemUrl}
            imageMeta={togglecontentimage}
            nextImageFill={true}
            className={styles.section__accordion__content__image}
            width={togglecontentimage?.width}
            height={togglecontentimage?.height}
            loading="lazy"
          />
        )}{' '}
        <div className={styles.section__accordion__content__copy}>
          <SectionHead
            heading={togglecontentheading}
            subheading={togglecontentcopy}
            alignment="left"
            className={styles.section__accordion__content__copy__header}
          />
        </div>
      </Container>
    )
  }

  return (
    <>
      <section className={styles.section}>
        <Container>
          <SectionHead
            heading={heading}
            subheading={copy}
            alignment="center"
            className={styles.section__head}
          />
          {media && (
            <VideoEmbed url={media} className={styles.section__media__video} />
          )}
        </Container>
        <div>
          <Accordion
            title={togglecontentheading}
            accordionSectionClasName={styles.section__accordion}
            accordionContentClassName={styles.section__accordion__content}
            accordionIconClassName={styles.section__accordion__icon}
            accordionContentActiveClassName={
              styles.section__accordion__content__active
            }
            content={renderToggleContent()}
            dangerouslySetInnerHTML={false}
          />
        </div>
      </section>
    </>
  )
}

AcfVideoLongformToggleSection.propTypes = {
  heading: PropTypes.string,
  copy: PropTypes.string,
  media: PropTypes.string,
  toggleContentHeading: PropTypes.string,
  toggleContentCopy: PropTypes.string,
  toggleContentImageMeta: PropTypes.shape({
    altText: PropTypes.string,
    mediaItemUrl: PropTypes.string,
    mediaDetails: PropTypes.shape({
      height: PropTypes.number,
      sizes: PropTypes.array,
      width: PropTypes.number
    })
  })
}

AcfVideoLongformToggleSection.defaultProps = {}
