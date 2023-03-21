import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image'
import RichText from '@/components/atoms/RichText'
import SectionHead from '@/components/molecules/SectionHead'
import PropTypes from 'prop-types'
import {v4 as uuidv4} from 'uuid'
import styles from './AcfRepeatingImageCopyColSection.module.scss'

export const acfRepeatingImageCopyColSectionFragment = `
  fragment AcfRepeatingImageCopyColSectionFragment on AcfAcfRepeatingImageCopyColSection {
    acfFields {
      copy
      heading
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
  }
`

/**
 * Render the AcfRepeatingImageCopyColSection component.
 *
 * @param  {object}  props         AcfRepeatingImageCopyColSection component props.
 * @param  {string}  props.heading Heading
 * @param  {string}  props.copy    Copy
 * @param  {Array}   props.items   Array of items
 * @return {Element}               The AcfRepeatingImageCopyColSection component.
 */
export default function AcfRepeatingImageCopyColSection({
  heading,
  copy,
  items
}) {
  return (
    <Container className={styles.section}>
      <SectionHead
        heading={heading}
        subheading={copy}
        alignment="center"
        className={styles.section__head}
      />
      {items?.length > 0 && (
        <div className={styles.section__items}>
          {items &&
            Array.isArray(items) &&
            items.map((item) => (
              <div key={uuidv4()} className={`${styles.section__items__item}`}>
                <div className={`${styles.section__items__item__image}`}>
                  <DisplayImage
                    className={styles.section__items__item__image__obj}
                    alt={item.image?.altText}
                    url={item.image?.mediaItemUrl}
                    imageMeta={item.image}
                    width={item.image?.width}
                    height={item.image?.height}
                    nextImageFill={true}
                  />
                </div>
                <div className={`${styles.section__items__item__details}`}>
                  <div
                    className={styles.section__items__item__details__wrapper}
                  >
                    <div
                      className={
                        styles.section__items__item__details__wrapper__header
                      }
                    >
                      {item?.icon && (
                        <div
                          className={
                            styles.section__items__item__details__wrapper__header__icon
                          }
                        >
                          <DisplayImage
                            alt={item.icon?.altText}
                            url={item.icon?.mediaItemUrl}
                            imageMeta={item.icon}
                            width={item.icon?.width}
                            height={item.icon?.height}
                            nextImageFill={true}
                            className={
                              styles.section__items__item__details__wrapper__header__icon__img
                            }
                          />
                        </div>
                      )}
                      <RichText
                        tag="h3"
                        className={
                          styles.section__items__item__details__wrapper__header__text
                        }
                      >
                        {item.title}
                      </RichText>
                    </div>
                    <div
                      className={
                        styles.section__items__item__details__wrapper__header__copy
                      }
                    >
                      {item.copy && <RichText>{item.copy}</RichText>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </Container>
  )
}

AcfRepeatingImageCopyColSection.defaultProps = {
  heading: PropTypes.string,
  copy: PropTypes.string,
  image: PropTypes.number,
  imageMeta: PropTypes.shape({
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
      iconMeta: PropTypes.shape({
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
