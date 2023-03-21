import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image'
import SectionHead from '@/components/molecules/SectionHead'
import cn from 'classnames'
import PropTypes from 'prop-types'
import {returnUnformattedTel} from '@/functions/utility'
import styles from './AcfSupportContactSection.module.scss'

/**
 * Render the AcfSupportContactSection component.
 *
 * @param  {object}  props         AcfSupportContactSection component props.
 * @param  {string}  props.heading The heading.
 * @param  {string}  props.copy    The copy text.
 * @param  {Array}   props.items   The stats for the section.
 * @return {Element}               The AcfSupportContactSection component.
 */
export default function AcfSupportContactSection({heading, copy, items}) {
  const handleChat = () => {
    window?.SnapEngage?.startLink()
  }

  return (
    <section className={styles.section}>
      <Container>
        <SectionHead heading={heading} subheading={copy} alignment="center" />
        {items && items.length > 0 && (
          <div
            className={`${styles.section__tiles} ${styles['grid']} ${styles['gap-xl']}`}
          >
            {items.map((item, index) => (
              <div key={index} className={`${styles['col-4@md']}`}>
                {item.imageMeta && item.imageMeta?.mediaItemUrl && (
                  <div
                    className={cn(
                      styles.list__icon__outline,
                      styles['list__icon__outline--style']
                    )}
                  >
                    <DisplayImage
                      alt={item.imageMeta?.altText}
                      url={item.imageMeta?.mediaItemUrl}
                      imageMeta={item.imageMeta}
                      nextImageFill={false}
                      width={197}
                      height={186}
                      className={styles.section__tiles__image}
                      // loading="lazy"
                    />
                  </div>
                )}
                {item.title && item.linkType === 'chat' ? (
                  <div
                    onClick={handleChat}
                    className={`${styles.section__tiles__title} ${styles['section__tiles__title--chat']}`}
                  >
                    {item.title}
                  </div>
                ) : (
                  <div className={`${styles.section__tiles__title}`}>
                    {item.title}
                  </div>
                )}

                <div className={styles.section__tiles__cta}>
                  {item.linkType === 'email' && (
                    <a alt={item.title} href={'mailto:' + item.link}>
                      {item.link}
                    </a>
                  )}
                  {item.linkType === 'tel' && (
                    <a
                      alt={item.title}
                      href={`tel:${returnUnformattedTel(item?.link)}`}
                    >
                      {item.link}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

AcfSupportContactSection.propTypes = {
  heading: PropTypes.string,
  copy: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      linkType: PropTypes.string,
      imageMeta: PropTypes.shape({
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

AcfSupportContactSection.defaultProps = {}
