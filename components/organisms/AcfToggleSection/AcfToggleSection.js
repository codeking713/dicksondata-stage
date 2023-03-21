import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import DisplayImage from '@/components/atoms/Image'
import RichText from '@/components/atoms/RichText'
import {ModalContext} from '@/components/context/ModalContext'
import ListItem from '@/components/molecules/ListItem'
import SectionHead from '@/components/molecules/SectionHead'
import Tab from '@/components/molecules/Tab'
import PropTypes from 'prop-types'
import {useContext} from 'react'
import styles from './AcfToggleSection.module.scss'

export const acfToggleSectionFragment = `
  fragment AcfToggleSectionFragment on AcfAcfToggleSection {
    acfFields {
      sectionHeading
      sectionCopy
      tabs {
        bubble
        ctamodalcontents
        ctatext
        ctatriggersmodal
        heading
        title
        copy
        cta {
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
        logo {
          id
          altText
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
        list {
          text
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
      background {
        id
        altText
        mediaItemUrl
        mediaDetails {
          height
          width
        }
      }
      tabs {
        heading
        copy
        cta {
          title
          target
          url
        }
        bubble
        ctamodalcontents
        ctatext
        ctatriggersmodal
        image {
          id
          altText
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
        list {
          icon {
            id
            altText
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
          text
        }
        logo {
          id
          altText
          mediaItemUrl
          mediaDetails {
            height
            width
          }
        }
        title
      }
    }
  }
`

/**
 * Render the AcfToggleSection component.
 *
 * @param  {object}  props                AcfToggleSection component props.
 * @param  {string}  props.sectionHeading The header text.
 * @param  {string}  props.sectionCopy    The copy text.
 * @param  {Array}   props.tabs           The tabs for the section.
 * @param  {object}  props.background     The background image for the section.
 * @return {Element}                      The AcfToggleSection component.
 */
export default function AcfToggleSection({
  sectionHeading,
  sectionCopy,
  tabs,
  background
}) {
  const [setIsOpen, setModalContent] = useContext(ModalContext)

  const openCTAModel = (content) => {
    setModalContent(content)
    setIsOpen(true)
  }

  return (
    <section className={styles.section}>
      <SectionHead
        heading={sectionHeading}
        subheading={sectionCopy}
        className={styles.section__head}
        alignment="center"
      />
      {tabs && (
        <Tab backgroundMeta={background}>
          {tabs?.map((tab, index) => (
            <Tab.TabPane
              key={`Tab-${index}`}
              tab={tab.title}
              tabBubble={tab.bubble}
            >
              <Container className={styles.section__body}>
                <div className={styles.section__body__left}>
                  <DisplayImage
                    id={tab.image.id}
                    alt={tab.image?.altText}
                    url={tab.image?.mediaItemUrl}
                    imageMeta={tab.image}
                    width={
                      tab.image?.mediaDetails?.width
                        ? tab.image.mediaDetails.width
                        : '100%'
                    }
                    height={
                      tab.image?.mediaDetails?.height
                        ? tab.image.mediaDetails.height
                        : 'auto'
                    }
                  />
                </div>
                <div className={styles.section__body__right}>
                  {tab.logo && (
                    <div className={styles.section__body__right__logo}>
                      <DisplayImage
                        id={tab.logo}
                        alt={tab.logo?.altText}
                        url={tab.logo?.mediaItemUrl}
                        imageMeta={tab.logo}
                        width={
                          tab.image?.mediaDetails?.width
                            ? tab.image.mediaDetails.width
                            : '100%'
                        }
                        height={
                          tab.image?.mediaDetails?.height
                            ? tab.image.mediaDetails.height
                            : 'auto'
                        }
                      />
                    </div>
                  )}
                  {tab.heading && (
                    <h3 className={styles.section__body__right__heading}>
                      {tab.heading}
                    </h3>
                  )}
                  <RichText
                    tag="div"
                    className={styles.section__body__right__copy}
                  >
                    {tab.copy}
                  </RichText>
                  {tab.listChildNode && tab.listChildNode.length > 0 && (
                    <div className={styles.section__body__right__lists}>
                      {tab.list.map((listItem, listItemIndex) => (
                        <ListItem
                          key={listItemIndex}
                          icon={listItem.icon}
                          text={listItem.text}
                          iconStyle={1}
                          iconAlignment="center"
                        ></ListItem>
                      ))}
                    </div>
                  )}

                  {tab.ctaTriggersModal ? (
                    <div
                      className={`${styles.section__body__right__cta} ${styles['col-12']}`}
                    >
                      <Button
                        className={styles.section__body__right__cta__btn}
                        onClick={() => {
                          openCTAModel(tab.ctaModalContents)
                        }}
                        text={tab?.ctaText ? tab?.ctaText : 'Submit'}
                        typed="secondary"
                        size="md"
                      />
                    </div>
                  ) : (
                    tab.cta &&
                    tab.cta.url &&
                    tab.cta.title && (
                      <div className={styles.section__body__right__cta}>
                        <Button
                          className={styles.section__body__right__cta__btn}
                          url={tab?.cta?.url}
                          text={tab?.cta?.title}
                          typed="secondary"
                          size="md"
                        />
                      </div>
                    )
                  )}
                </div>
              </Container>
            </Tab.TabPane>
          ))}
        </Tab>
      )}
    </section>
  )
}

AcfToggleSection.propTypes = {
  className: PropTypes.string,
  sectionHeading: PropTypes.string,
  sectionCopy: PropTypes.string,
  background: PropTypes.shape({
    altText: PropTypes.string,
    mediaItemUrl: PropTypes.string,
    mediaDetails: PropTypes.shape({
      height: PropTypes.number,
      sizes: PropTypes.array,
      width: PropTypes.number
    })
  }),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      bubble: PropTypes.string,
      image: PropTypes.shape({
        altText: PropTypes.string,
        mediaItemUrl: PropTypes.string,
        mediaDetails: PropTypes.shape({
          height: PropTypes.number,
          sizes: PropTypes.array,
          width: PropTypes.number
        })
      }),
      logo: PropTypes.shape({
        altText: PropTypes.string,
        mediaItemUrl: PropTypes.string,
        mediaDetails: PropTypes.shape({
          height: PropTypes.number,
          sizes: PropTypes.array,
          width: PropTypes.number
        })
      }),
      heading: PropTypes.string,
      copy: PropTypes.string,
      cta: PropTypes.any,
      list: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.shape({
            altText: PropTypes.string,
            mediaItemUrl: PropTypes.string,
            mediaDetails: PropTypes.shape({
              height: PropTypes.number,
              sizes: PropTypes.array,
              width: PropTypes.number
            })
          }),
          text: PropTypes.string
        })
      )
    })
  )
}
