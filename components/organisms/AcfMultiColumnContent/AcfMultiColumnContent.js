import Container from '@/components/atoms/Container'
import PropTypes from 'prop-types'
import styles from './AcfMultiColumnContent.module.scss'

export const acfMultiColumnContentFragment = `
  fragment AcfMultiColumnContentFragment on AcfAcfMultiColumnContent {
    acfFields {
      items {
        copy
        heading
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
 * Render the AcfMultiColumnContent component.
 *
 * @param  {object}  props       AcfMultiColumnContent component props.
 * @param  {Array}   props.items The items for the component.
 * @return {Element}             The AcfMultiColumnContent component.
 */
export default function AcfMultiColumnContent({items}) {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <Container className={styles.section__container}>
          {items &&
            items.map((item, index) => (
              <div key={index} className={styles.items__container}>
                <div className={styles['items__container--content']}>
                  <img
                    className={styles['items__img']}
                    src={item.image?.mediaItemUrl}
                    alt={item.image?.altText}
                  />
                  <div
                    className={styles['items__heading']}
                    dangerouslySetInnerHTML={{
                      __html: item.heading
                    }}
                  />
                </div>
                <div
                  className={styles['items__copy']}
                  dangerouslySetInnerHTML={{
                    __html: item.copy
                  }}
                />
              </div>
            ))}
        </Container>
      </section>
    </div>
  )
}

AcfMultiColumnContent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      copy: PropTypes.string,
      image: PropTypes.shape({
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
