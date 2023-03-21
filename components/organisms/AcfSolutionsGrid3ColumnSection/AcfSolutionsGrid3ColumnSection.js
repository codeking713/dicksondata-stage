import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image'
import RichText from '@/components/atoms/RichText'
import {ModalContext} from '@/components/context/ModalContext'
import IconCaretRight from '@/components/icons/caretRight.js'
import SectionHead from '@/components/molecules/SectionHead'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {useContext} from 'react'
import styles from './AcfSolutionsGrid3ColumnSection.module.scss'

export const acfSolutionsGrid3ColumnSectionFragment = `
  fragment AcfSolutionsGrid3ColumnSectionFragment on AcfAcfSolutionsGrid3ColumnSection {
    acfFields {
      copy
      ctamodalcontents
      ctatext
      ctatriggersmodal
      fieldGroupName
      heading
      cta {
        target
        title
        url
      }
      items {
        title
        subtitle
        background {
          id
          altText
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
        link {
          target
          title
          url
        }
      }
    }
  }
`

/**
 * Render the AcfSolutionsGrid3ColumnSection component.
 *
 * @param  {object}  props                  AcfSolutionsGrid3ColumnSection component props.
 * @param  {string}  props.heading          The header text.
 * @param  {string}  props.copy             The copy text.
 * @param  {Array}   props.items            The items for the section.
 * @param  {object}  props.cta              The call to action.
 * @param  {string}  props.ctaTriggersModal Cta Triggers Modal
 * @param  {string}  props.ctaModalContents Cta Modal Contents
 * @param  {string}  props.ctaText          Model Cta text
 * @return {Element}                        The AcfSolutionsGrid3ColumnSection component.
 */
export default function AcfSolutionsGrid3ColumnSection({
  heading,
  copy,
  items,
  cta,
  ctaTriggersModal,
  ctaText,
  ctaModalContents
}) {
  const [setIsOpen, setModalContent] = useContext(ModalContext)

  const openCTAModel = (content) => {
    setModalContent(content)
    setIsOpen(true)
  }

  const renderTile = (item, index) => {
    let content = (
      <div key={index}>
        {item.title && (
          <div className={styles.section__tile__other__heading}>
            {item.title}
          </div>
        )}

        {item.subtitle && (
          <div className={styles.section__tile__other__copy}>
            <RichText>{item.subtitle}</RichText>
          </div>
        )}

        {item.link && item.link.url != '' && (
          <span className={styles.section__tile__other__link}>
            <span className={styles.section__tile__other__link__text}>
              {item.link.title}
            </span>
            <IconCaretRight
              className={styles.section__tile__other__link__icon}
              backgroundColor="#6dc4b0"
            />
          </span>
        )}
        <div>
          {item.background && item.background?.mediaItemUrl && (
            <DisplayImage
              className={styles.section__tile__other__bgimage}
              id={item.background}
              alt={item.background?.altText}
              url={item.background?.mediaItemUrl}
              imageMeta={item.background}
              nextImageFill={true}
            />
          )}
        </div>
      </div>
    )

    let contentInLinkWrapper = (
      <Link href={item?.link?.url ?? '#'} key={index}>
        <a
          alt={item?.link?.text}
          title={item?.title}
          target={item?.link?.target}
          className={`${styles.section__tile} ${styles['col-6@sm']} ${styles['col-4@md']} ${styles.section__tile__other}`}
        >
          {content}
        </a>
      </Link>
    )

    let contentInRegularWrapper = (
      <div
        className={`${styles.section__tile} ${styles['col-6@sm']} ${styles['col-4@md']} ${styles.section__tile__other}`}
        key={index}
      >
        {content}
      </div>
    )

    return item.link ? contentInLinkWrapper : contentInRegularWrapper
  }
  return (
    <section className={styles.section}>
      <Container className={`${styles['grid']} ${styles['gap-xs']}`}>
        <div
          className={`${styles.section__tile} ${styles.section__tile__first} ${styles['col-6@sm']} ${styles['col-4@md']}`}
        >
          <SectionHead heading={heading} subheading={copy} alignment="left" />
        </div>
        {items &&
          items.length > 0 &&
          items.map((item, index) => renderTile(item, index))}

        {ctaTriggersModal ? (
          <div className={`${styles.section__cta} ${styles['col-12']}`}>
            <Button
              className={styles.section__cta__btn}
              onClick={() => {
                openCTAModel(ctaModalContents)
              }}
              text={ctaText ? ctaText : 'Submit'}
              typed="secondary"
              size="md"
            />
          </div>
        ) : (
          cta?.url &&
          cta?.title && (
            <div className={`${styles.section__cta} ${styles['col-12']}`}>
              <Button
                className={styles.section__cta__btn}
                url={cta?.url}
                text={cta?.title}
                typed="secondary"
                size="md"
              />
            </div>
          )
        )}

        {}
      </Container>
    </section>
  )
}

AcfSolutionsGrid3ColumnSection.propTypes = {
  heading: PropTypes.string,
  copy: PropTypes.string,
  cta: PropTypes.object,
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      link: PropTypes.any
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

AcfSolutionsGrid3ColumnSection.defaultProps = {}
