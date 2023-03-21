import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image'
import RichText from '@/components/atoms/RichText'
import {ModalContext} from '@/components/context/ModalContext'
import IconArrowRight from '@/components/icons/arrowRight.js'
import SectionHead from '@/components/molecules/SectionHead'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {useContext} from 'react'
import styles from './AcfViewProductSubcategoriesSection.module.scss'

export const acfViewProductSubcategoriesSectionFragment = `
  fragment AcfViewProductSubcategoriesSectionFragment on AcfAcfViewProductSubcategoriesSection {
    acfFields {
      copy
      cta {
        target
        title
        url
      }
      ctamodalcontents
      ctatext
      ctatriggersmodal
      heading
      subheading
      items {
        description
        heading
        link {
          target
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
 * Render the AcfViewProductSubcategoriesSection component.
 *
 * @param  {object}  props                  AcfViewProductSubcategoriesSection component props.
 * @param  {Array}   props.items            The items for the section.
 * @param  {string}  props.heading          The heading
 * @param  {string}  props.subheading       The subheading
 * @param  {string}  props.copy             Section copy
 * @param  {object}  props.cta              Section CTA
 * @param  {string}  props.ctaTriggersModal Cta triggers modal flag
 * @param  {string}  props.ctaModalContents Cta modal contents
 * @param  {string}  props.ctaText          Model cta text
 * @return {Element}                        The AcfViewProductSubcategoriesSection component.
 */
export default function AcfViewProductSubcategoriesSection({
  heading,
  subheading,
  copy,
  cta,
  ctaTriggersModal,
  ctaText,
  ctaModalContents,
  items
}) {
  const [setIsOpen, setModalContent] = useContext(ModalContext)

  const openCTAModel = (content) => {
    setModalContent(content)
    setIsOpen(true)
  }

  const renderTile = (item, index) => {
    let content = (
      <>
        <div className={styles.section__items__item__header}>
          {item.heading && (
            <div className={styles.section__items__item__header__title}>
              {item.heading}
            </div>
          )}
          <DisplayImage
            className={styles.section__items__item__img}
            alt={item.image?.altText}
            url={item.image?.mediaItemUrl}
            imageMeta={item.image}
            nextImageFill={true}
          />
        </div>
        <div className={styles.section__items__item__body}>
          {item.description && (
            <div className={styles.section__items__item__body__description}>
              {item.description}
            </div>
          )}

          {item.link && (
            <div className={styles.section__items__item__body__link}>
              <span className={styles.section__items__item__body__link__text}>
                {item.link.title}
              </span>
              <IconArrowRight
                className={styles['section__items__item__body__link__icon']}
                color={'#6dc4b0'}
              />
              <IconArrowRight
                className={
                  styles['section__items__item__body__link__icon--active']
                }
                color={'#45525b'}
              />
            </div>
          )}
        </div>
      </>
    )

    let contentInLinkWrapper = (
      <Link href={item?.link?.url ?? '#'} key={index}>
        <a
          alt={item?.link?.text}
          title={item?.title}
          target={item?.link?.target}
          className={`${styles.section__items__item}`}
        >
          {content}
          <div className={styles.section__items__item__border}></div>
        </a>
      </Link>
    )

    let contentInRegularWrapper = (
      <div className={`${styles.section__items__item}`} key={index}>
        {content}
        <div className={styles.section__items__item__border}></div>
      </div>
    )

    return item.link ? contentInLinkWrapper : contentInRegularWrapper
  }

  return (
    <section className={styles.section}>
      <Container>
        <SectionHead
          heading={heading}
          alignment="center"
          className={styles.section__head}
        />
        <div className={styles.section__body}>
          <div className={styles.section__body__head}>{subheading}</div>
          <RichText className={styles.section__body__copy}>{copy}</RichText>
          <div className={styles.section__body__items}>
            {items && items.length > 0 && (
              <div className={`${styles.section__items}`}>
                {items.map((item, index) => renderTile(item, index))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.section__footer}>
          {ctaTriggersModal ? (
            <Button
              className={styles.section__footer__cta}
              onClick={() => {
                openCTAModel(ctaModalContents)
              }}
              text={ctaText ? ctaText : 'Submit'}
              type="primary"
            />
          ) : (
            cta?.url && (
              <Button
                className={styles.section__footer__cta}
                url={cta.url}
                target={cta.target}
                text={cta.title}
                type="primary"
              />
            )
          )}
        </div>
      </Container>
    </section>
  )
}

AcfViewProductSubcategoriesSection.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  copy: PropTypes.string,
  cta: PropTypes.oneOfType([
    PropTypes.shape({
      target: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string
    }),
    PropTypes.string
  ]),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      image: PropTypes.shape({
        altText: PropTypes.string,
        mediaItemUrl: PropTypes.string,
        mediaDetails: PropTypes.shape({
          height: PropTypes.number,
          sizes: PropTypes.array,
          width: PropTypes.number
        })
      }),
      description: PropTypes.string,
      link: PropTypes.oneOfType([
        PropTypes.shape({
          target: PropTypes.string,
          title: PropTypes.string,
          url: PropTypes.string
        }),
        PropTypes.string
      ])
    })
  )
}

AcfViewProductSubcategoriesSection.defaultProps = {}
