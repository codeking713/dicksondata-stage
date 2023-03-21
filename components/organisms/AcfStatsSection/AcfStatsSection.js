import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image'
import RichText from '@/components/atoms/RichText'
import PropTypes from 'prop-types'
import styles from './AcfStatsSection.module.scss'

export const acfStatsSectionFragment = `
  fragment AcfStatsSectionFragment on AcfAcfStatsSection {
    acfFields {
      copy
      stats {
        description
        value
        valuesubscript
      }
      background {
        id
        altText
        mediaItemUrl
        mediaDetails {
          height
          width
        }
      }
      stats {
        description
        value
        valuesubscript
      }
    }
  }
`

/**
 * Render the AcfStatsSection component.
 *
 * @param  {object}  props            AcfStatsSection component props.
 * @param  {string}  props.copy       The copy text.
 * @param  {object}  props.background The background image ID.
 * @param  {Array}   props.stats      The stats for the section.
 * @return {Element}                  The AcfStatsSection component.
 */
export default function AcfStatsSection({copy, background, stats}) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.section__text}>
          {copy && (
            <RichText className={styles.section__text__copy}>{copy}</RichText>
          )}
        </div>
        {background && (
          <DisplayImage
            className={styles.section__bgimage}
            id={background.id}
            alt={background?.altText}
            url={background?.mediaItemUrl}
            imageMeta={background}
            width={836}
            height={446}
          />
        )}
        {stats && stats.length > 0 && (
          <div
            className={`${styles.section__tiles} ${styles['grid']} ${styles['gap-lg']}`}
          >
            {stats.map((item, index) => (
              <div key={index} className={`${styles['col-4@md']}`}>
                <div className={styles.section__tiles__header}>
                  <span className={styles.section__tiles__header__main}>
                    {item.value}
                  </span>
                  <span className={styles.section__tiles__header__subscript}>
                    {item.valuesubscript}
                  </span>
                </div>
                <div className={styles.section__tiles__description}>
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

AcfStatsSection.propTypes = {
  copy: PropTypes.string,
  className: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      value: PropTypes.string,
      valuesubscript: PropTypes.string
    })
  ),
  background: PropTypes.shape({
    altText: PropTypes.string,
    mediaItemUrl: PropTypes.string,
    mediaDetails: PropTypes.shape({
      height: PropTypes.number,
      sizes: PropTypes.array,
      width: PropTypes.number
    })
  })
}

AcfStatsSection.defaultProps = {}
