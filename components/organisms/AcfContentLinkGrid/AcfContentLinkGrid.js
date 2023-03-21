import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image/Image'
import SectionHead from '@/components/molecules/SectionHead'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from './AcfContentLinkGrid.module.scss'

export const acfContentLinkGridFragment = `
  fragment AcfContentLinkGridFragment on AcfAcfContentLinkGrid {
    acfFields {
      heading
      copy
      items {
        link {
          url
          title
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
 * Render the AcfContentLinkGrid component.
 *
 * @author DAP
 * @param  {object}  props         AcfContentLinkGrid component props.
 * @param  {string}  props.heading The heading Text
 * @param  {string}  props.copy    The copy Text
 * @param  {Array}   props.items   The items for the component.
 * @return {Element}               The AcfContentLinkGrid component.
 */
export default function AcfContentLinkGrid({heading, copy, items}) {
  return (
    <div className={styles.outer}>
      <Container className={styles.container}>
        <SectionHead
          className={styles.container__sectionhead}
          heading={heading}
          subheading={copy}
          alignment="left"
        />
        {items && Array.isArray(items) && items.length > 0 && (
          <div className={styles.container__links}>
            {items.map((item, index) => {
              return (
                item.link && (
                  <Link href={item?.link?.url ?? '#'} key={index}>
                    <a
                      alt={item?.link?.text}
                      title={item.title}
                      target={item?.link?.target}
                      className={styles.container__links__link}
                    >
                      <div className={styles.container__links__link__image}>
                        <DisplayImage
                          className={styles.container__links__link__image__img}
                          alt={item?.image?.altText}
                          url={item?.image?.mediaItemUrl}
                          imageMeta={item?.image}
                          nextImageFill={true}
                        />
                      </div>
                      <div
                        className={styles.container__links__link__text}
                        dangerouslySetInnerHTML={{
                          __html: item?.link?.title
                        }}
                      />
                    </a>
                  </Link>
                )
              )
            })}
          </div>
        )}
      </Container>
    </div>
  )
}

AcfContentLinkGrid.propTypes = {
  heading: PropTypes.string,
  copy: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
        target: PropTypes.string
      }),
      image: PropTypes.shape({
        altText: PropTypes.string,
        mediaItemUrl: PropTypes.string,
        mediaDetails: PropTypes.shape({
          height: PropTypes.number,
          width: PropTypes.number,
          sizes: PropTypes.arrayOf(
            PropTypes.shape({
              height: PropTypes.string,
              name: PropTypes.string,
              sourceUrl: PropTypes.string,
              width: PropTypes.string
            })
          )
        })
      })
    })
  )
}
