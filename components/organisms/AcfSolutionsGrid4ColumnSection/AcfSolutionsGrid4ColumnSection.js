import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image'
import RichText from '@/components/atoms/RichText'
import IconArrowRight from '@/components/icons/arrowRight.js'
import SectionHead from '@/components/molecules/SectionHead'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from './AcfSolutionsGrid4ColumnSection.module.scss'

export const acfSolutionsGrid4ColumnSectionFragment = `
  fragment AcfSolutionsGrid4ColumnSectionFragment on AcfAcfSolutionsGrid4ColumnSection {
    acfFields {
      heading
      copy
      cards {
        heading
        copy
        link {
          title
          url
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
 * Render the AcfSolutionsGrid4ColumnSection component.
 *
 * @param  {object}  props         AcfSolutionsGrid4ColumnSection component props.
 * @param  {string}  props.heading The header text.
 * @param  {string}  props.copy    The copy text.
 * @param  {Array}   props.cards   The items for the section.
 * @return {Element}               The AcfSolutionsGrid4ColumnSection component.
 */
export default function AcfSolutionsGrid4ColumnSection({heading, copy, cards}) {
  const renderTile = (card, index) => {
    let content = (
      <>
        {card?.image && card?.image?.mediaItemUrl && (
          <div className={styles.section__tile__body}>
            <DisplayImage
              className={styles.section__tile__body__image}
              id={card?.image.id}
              alt={card?.image?.altText}
              url={card?.image?.mediaItemUrl}
              image={card?.image}
              nextImageFill={true}
            />
            <div className={styles.section__tile__body__overlay}>
              {card?.heading != '' && (
                <RichText
                  className={styles.section__tile__body__overlay__heading}
                >
                  {card?.heading}
                </RichText>
              )}
              {card?.copy && (
                <RichText className={styles.section__tile__body__overlay__text}>
                  {card?.copy}
                </RichText>
              )}
            </div>
          </div>
        )}

        <div className={styles.section__tile__footer}>
          <RichText tag="span" className={styles.section__tile__footer__title}>
            {card?.heading}
          </RichText>
          {card?.link && (
            <IconArrowRight
              className={styles.section__tile__footer__icon}
              color="#6dc4b0"
            />
          )}
        </div>
      </>
    )

    let contentInLinkWrapper = (
      <Link href={card?.link?.url ?? '#'} key={index}>
        <a
          alt={card?.link?.text}
          title={card?.heading}
          target={card?.link?.target}
          className={styles.section__tile}
        >
          {content}
        </a>
      </Link>
    )

    let contentInRegularWrapper = (
      <div className={styles.section__tile} key={index}>
        {content}
      </div>
    )

    return card?.link ? contentInLinkWrapper : contentInRegularWrapper
  }

  return (
    <section className={styles.section}>
      <Container>
        <SectionHead
          heading={heading}
          subheading={copy}
          alignment="center"
          className={styles.section__header}
        />
        {cards && cards.length > 0 && (
          <div className={styles.section__cards}>
            {cards.map((card, index) => renderTile(card, index))}
          </div>
        )}
      </Container>
    </section>
  )
}

AcfSolutionsGrid4ColumnSection.propTypes = {
  heading: PropTypes.string,
  copy: PropTypes.string,
  className: PropTypes.string,
  background: PropTypes.number,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      link: PropTypes.any
    })
  )
}

AcfSolutionsGrid4ColumnSection.defaultProps = {}
