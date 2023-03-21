import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image'
import RichText from '@/components/atoms/RichText'
import {ModalContext} from '@/components/context/ModalContext'
import PropTypes from 'prop-types'
import {useContext} from 'react'
import styles from './AcfMultiItemImageCTASection.module.scss'

export const acfMultiItemImageCtaSectionFragment = `
  fragment AcfMultiItemImageCtaSectionFragment on AcfAcfMultiItemImageCtaSection {
    acfFields {
      items {
        copy
        cta {
          target
          title
          url
        }
        ctamodalcontents
        ctatext
        ctatriggersmodal
        title
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
 * Render the AcfMultiItemImageCTASection component.
 *
 * @param  {object}  props       AcfMultiItemImageCTASection component props.
 * @param  {Array}   props.items The items for the section.
 * @return {Element}             The AcfMultiItemImageCTASection component.
 */
export default function AcfMultiItemImageCTASection({items}) {
  const [setIsOpen, setModalContent] = useContext(ModalContext)

  const openCTAModel = (content) => {
    setModalContent(content)
    setIsOpen(true)
  }
  return (
    <Container>
      <div
        className={`${styles.section} ${
          items && items.length <= 2 && styles['section--container']
        }`}
      >
        {items && items.length > 0 && (
          <div className={`${styles.section__items}`}>
            {items.map((item, index) => (
              <div key={index} className={`${styles.section__items__item}`}>
                <div>
                  <DisplayImage
                    alt={item.image?.altText}
                    url={item.image?.mediaItemUrl}
                    imageMeta={item.image}
                    className={styles.section__items__item__image}
                  />
                </div>
                <div className={`${styles['section__items__item--right']}`}>
                  {item.title && (
                    <div className={styles.section__items__item__title}>
                      {item.title}
                    </div>
                  )}
                  {item.copy && (
                    <RichText
                      tag="p"
                      className={styles.section__items__item__text}
                    >
                      {item.copy}
                    </RichText>
                  )}

                  {item.ctatriggersmodal ? (
                    <Button
                      className={styles.section__items__item__button}
                      onClick={() => {
                        openCTAModel(item.ctamodalcontents)
                      }}
                      text={item?.ctatext ? item?.ctatext : 'Submit'}
                      type="primary"
                      size="sm"
                    />
                  ) : (
                    item.cta?.url && (
                      <Button
                        className={styles.section__items__item__button}
                        url={item.cta.url}
                        target={item.cta.target}
                        text={item.cta.title}
                        type="primary"
                        size="sm"
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

AcfMultiItemImageCTASection.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      copy: PropTypes.string,
      cta: PropTypes.oneOfType([
        PropTypes.shape({
          target: PropTypes.string,
          title: PropTypes.string,
          url: PropTypes.string
        }),
        PropTypes.string
      ]),
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

AcfMultiItemImageCTASection.defaultProps = {}
