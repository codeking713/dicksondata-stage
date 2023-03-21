import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image/Image'
import Link from 'next/dist/client/link'
import PropTypes from 'prop-types'
import {v4 as uuidv4} from 'uuid'
import styles from './AcfQuicklinksNav.module.scss'

export const acfQuicklinksNavFragment = `
  fragment AcfQuicklinksNavFragment on AcfAcfQuicklinksNav {
    acfFields {
      sectionHeading
      items {
        itemLink {
          target
          title
          url
        }
        itemImage {
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
 * Render the AcfQuicklinksNav component.
 *
 * @param  {object}  props                AcfQuicklinksNav component props.
 * @param  {string}  props.sectionHeading The section heading
 * @param  {Array}   props.items          The items for the section.
 * @return {Element}                      The AcfQuicklinksNav component.
 */
export default function AcfQuicklinksNav({sectionHeading, items}) {
  return (
    <Container className={styles.container}>
      {sectionHeading && (
        <div className={styles.container__headouter}>
          <div className={styles.container__headouter__heading}>
            {sectionHeading}
          </div>
        </div>
      )}
      <div className={styles.container__items}>
        {items &&
          items.map((item) => {
            if (!item?.itemLink?.url) return
            return (
              <Link href={item?.itemLink?.url ?? '#'} key={uuidv4()}>
                <a
                  href={item?.itemLink?.url}
                  className={styles.container__items__item}
                >
                  {item?.itemImage?.mediaItemUrl && (
                    <span className={styles.container__items__item__image}>
                      <DisplayImage
                        id={item?.itemImage?.id}
                        imageMeta={item?.itemImage}
                        width={item?.itemImage?.mediaDetails.width}
                        height={item?.itemImage?.mediaDetails.height}
                        className={styles.container__items__item__image__img}
                        nextImageFill={true}
                      />
                    </span>
                  )}
                  {item?.itemLink?.title && (
                    <span className={styles.container__items__item__text}>
                      {item.itemLink.title}
                    </span>
                  )}
                </a>
              </Link>
            )
          })}
      </div>
    </Container>
  )
}

AcfQuicklinksNav.propTypes = {
  sectionHeading: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      itemImage: PropTypes.number,
      itemLink: PropTypes.shape({
        target: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string
      })
    })
  )
}

AcfQuicklinksNav.defaultProps = {
  section_heading: 'Go to'
}
