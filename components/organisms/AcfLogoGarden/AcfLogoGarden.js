import SectionHead from '@/components/molecules/SectionHead'
import PropTypes from 'prop-types'
import {v4 as uuidv4} from 'uuid'
import styles from './AcfLogoGarden.module.scss'

export const acfLogoGardenFragment = `
  fragment AcfLogoGarden on AcfAcfLogoGarden {
    acfFields {
      sectionHeading
      items {
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
 * Render the AcfMediaLogoGarden component.
 *
 * @param  {object}  props                AcfMediaLogoGarden component props.
 * @param  {string}  props.sectionHeading The section heading.
 * @param  {Array}   props.items          Repeating array of items.
 * @return {Element}                      The AcfMediaLogoGarden component.
 */
export default function AcfMediaLogoGarden({sectionHeading, items}) {
  return (
    <div className={styles.section}>
      <SectionHead
        heading={sectionHeading}
        alignment="center"
        className={styles.section__head}
      />
      {!!items && (
        <div className={styles.section__logogarden}>
          {items &&
            items.length > 0 &&
            items.map((item) => (
              <div className={styles.section__logogarden__logo} key={uuidv4()}>
                {item?.image?.mediaItemUrl && (
                  <img
                    className={styles.section__logogarden__logo__img}
                    alt={item?.image?.altText}
                    src={item?.image?.mediaItemUrl}
                    width={item?.image?.width}
                    height={item?.image?.height}
                    loading="lazy"
                  />
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

AcfMediaLogoGarden.propTypes = {
  sectionHeading: PropTypes.string,
  items: PropTypes.array
}
