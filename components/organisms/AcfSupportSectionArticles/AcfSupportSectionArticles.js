import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import BulletItem from '@/components/molecules/BulletItem'
import SectionHead from '@/components/molecules/SectionHead'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from './AcfSupportSectionArticles.module.scss'

/**
 * Render the AcfSupportSectionArticles component.
 *
 * @param  {object}  props         AcfSupportSectionArticles component props.
 * @param  {string}  props.heading The heading.
 * @param  {string}  props.copy    The copy text.
 * @param  {Array}   props.items   The stats for the section.
 * @return {Element}               The AcfSupportSectionArticles component.
 */
export default function AcfSupportSectionArticles({heading, copy, items}) {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHead heading={heading} subheading={copy} alignment="center" />
        {items && items.length > 0 && (
          <div
            className={`${styles.section__tiles} ${styles['grid']} ${styles['gap-xl@sm']}`}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className={`${styles.section__tiles__tile} ${styles['col-12@sm']} ${styles['col-6@md']} ${styles['col-4@lg']}`}
              >
                <div>
                  <div className={styles.section__tiles__tile__section}>
                    {item.section}
                  </div>
                  <div className={styles.section__tiles__tile__title}>
                    {item.title}
                  </div>
                  <div className={styles.section__tiles__tile__articles}>
                    {item.articlesChildNode.map((article, index) => (
                      <div
                        key={index}
                        className={
                          styles.section__tiles__tile__articles__article
                        }
                      >
                        {article.link && (
                          <Link href={article.link.url ?? '#'}>
                            <a
                              target={'_self'}
                              className={
                                styles.section__tiles__tile__articles__article__link
                              }
                            >
                              {' '}
                              <BulletItem
                                key={index}
                                text={article.link.title}
                              ></BulletItem>
                            </a>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  className={styles.section__tiles__tile__cta}
                  url={item.cta.url}
                  target={item.cta.target}
                  text={item.cta.title}
                  type="primary"
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

AcfSupportSectionArticles.propTypes = {
  heading: PropTypes.string,
  copy: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      section: PropTypes.string,
      title: PropTypes.string
    })
  )
}

AcfSupportSectionArticles.defaultProps = {}
