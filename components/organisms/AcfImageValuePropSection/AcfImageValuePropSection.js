import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image'
import ListItem from '@/components/molecules/ListItem'
import SectionHead from '@/components/molecules/SectionHead'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {v4 as uuidv4} from 'uuid'
import styles from './AcfImageValuePropSection.module.scss'

export const acfImageValuePropSectionFragment = `
  fragment AcfImageValuePropSection on AcfAcfImageValuePropSection {
    acfFields {
      heading
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
      forceImageRight
    }
  }
`

/**
 * Render the AcfImageValuePropSection component.
 *
 * @param  {object}  props                 AcfImageValueProp component props.
 * @param  {string}  props.heading         Heading
 * @param  {string}  props.subheading      Subheading
 * @param  {Array}   props.items           Array of items
 * @param  {number}  props.image           Image ID
 * @param  {string}  props.forceImageRight True/False to force image to the right
 * @return {Element}                       The AcfImageValueProp component.
 */
export default function AcfImageValuePropSection({
  heading,
  subheading,
  image,
  items,
  forceImageRight
}) {
  const sectionMainClassnames = classNames(
    styles.grid,
    styles['gap-xl'],
    styles.section__main,
    {
      [styles['section__main--forceimgright']]: forceImageRight
    }
  )

  const sectionMainImageClassnames = classNames(
    styles['col-6@md'],
    styles.section__main__image,
    {
      [styles['section__main__image--forceimgright']]: forceImageRight
    }
  )

  return (
    <section>
      <Container>
        <SectionHead
          heading={heading}
          subheading={subheading}
          alignment="left"
          className={styles.section__head}
        />
        <div className={sectionMainClassnames}>
          <div className={sectionMainImageClassnames}>
            {image && (
              <DisplayImage
                className={styles.section__image}
                id={image?.id}
                alt={image?.altText}
                url={image?.mediaItemUrl}
                imageMeta={image}
                width={
                  image.mediaDetails?.width ? image.mediaDetails.width : '100%'
                }
                height={
                  image.mediaDetails?.height
                    ? image.mediaDetails.height
                    : 'auto'
                }
              />
            )}
          </div>
          <div className={`${styles['col-6@md']}`}>
            {items && Array.isArray(items) && items.length > 0 && (
              <div className={styles.section__items}>
                {items.map((listItem) => (
                  <div key={uuidv4()} className={styles.section__items__item}>
                    <ListItem
                      icon={listItem.icon}
                      title={listItem.title}
                      text={listItem.copy}
                      iconStyle={2}
                      iconAlignment="top"
                    ></ListItem>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

AcfImageValuePropSection.defaultProps = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  image: PropTypes.shape({
    altText: PropTypes.string,
    mediaItemUrl: PropTypes.string,
    mediaDetails: PropTypes.shape({
      height: PropTypes.number,
      sizes: PropTypes.array,
      width: PropTypes.number
    })
  }),
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
