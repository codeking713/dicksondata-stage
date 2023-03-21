import Container from '@/components/atoms/Container'
import ListItem from '@/components/molecules/ListItem'
import SectionHead from '@/components/molecules/SectionHead'
import PropTypes from 'prop-types'
import styles from './AcfProductFeaturesSection.module.scss'

export const acfProductFeaturesSectionFragment = `
  fragment AcfProductFeaturesSectionFragment on AcfAcfProductFeaturesSection {
    acfFields {
      heading
      copy
      items {
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
    }
  }
`

/**
 * Render the AcfProductFeaturesSection component.
 *
 * @param  {object}  props         AcfProductFeaturesSection component props.
 * @param  {string}  props.heading The heading text.
 * @param  {string}  props.copy    The copy text.
 * @param  {Array}   props.items   The items for the section.
 * @return {Element}               The AcfProductFeaturesSection component.
 */
export default function AcfProductFeaturesSection({heading, copy, items}) {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHead
          heading={heading}
          subheading={copy}
          alignment="center"
          className={styles.section__head}
        />
        {items && items.length > 0 && (
          <div
            className={`${styles.section__items} ${styles['grid']} ${styles['gap-lg']}`}
          >
            {items.map((item, index) => (
              <div key={index} className={`${styles['col-4@md']}`}>
                <ListItem
                  key={index}
                  icon={item.iconMeta}
                  title={item.title}
                  iconStyle={1}
                  iconPosition="top"
                  titleSize="large"
                ></ListItem>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

AcfProductFeaturesSection.propTypes = {
  heading: PropTypes.string,
  copy: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
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

AcfProductFeaturesSection.defaultProps = {}
