import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import {ModalContext} from '@/components/context/ModalContext'
import SectionHead from '@/components/molecules/SectionHead'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {useContext, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import styles from './AcfFeaturesOverview.module.scss'

export const acfFeaturesOverviewFragment = `
  fragment AcfFeaturesOverviewFragment on AcfAcfFeaturesOverview {
    acfFields {
      sectionHeading
      sectionCopy
      sectionCta {
        url
        title
      }
      sectionCtaAlignment
      items {
        heading
        copy
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
      sectionCtaTriggersModal
      sectionCtaText
      modalContents
    }
  }
`

/**
 * Render the AcfFeaturesOverview component.
 *
 * @param  {object}  props                         AcfFeaturesOverview component props.
 * @param  {string}  props.sectionHeading          The section heading
 * @param  {string}  props.sectionCopy             The section subheading
 * @param  {string}  props.sectionCta              The section cta
 * @param  {string}  props.sectionCtaAlignment     The section cta alignemnt
 * @param  {boolean} props.sectionCtaTriggersModal The section cta trigger modal value
 * @param  {string}  props.sectionCtaText          Model cta text
 * @param  {string}  props.modalContents           The modal contents option value
 * @param  {Array}   props.items                   The items for the section.
 * @return {Element}                               The AcfFeaturesOverview component.
 */
export default function AcfFeaturesOverview(props) {
  const [setIsOpen, setModalContent] = useContext(ModalContext)
  useEffect(() => {
    setModalContent(props?.modalContents)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sectionHeadingExists = () => {
    if (props.sectionHeading !== '' || props.sectionCopy !== '') {
      return true
    } else {
      return false
    }
  }

  const wrapperClasses = classNames(styles.wrapper, {
    [styles['wrapper--navyonly']]: !props.items?.length > 0,
    [styles['wrapper--darkblueonly']]: !sectionHeadingExists()
  })

  const copyClasses = classNames(styles.copy, {
    [styles['copy--alone']]: !props.items?.length > 0
  })

  const itemsButtonClasses = classNames(styles.items__cta, {
    [styles['items__cta--left']]: props.sectionCtaAlignment === 'left',
    [styles['items__cta--center']]: props.sectionCtaAlignment === 'center',
    [styles['items__cta--right']]: props.sectionCtaAlignment === 'right'
  })

  const copyButtonClasses = classNames(styles.copy__cta, {
    [styles['copy__cta--left']]: props.sectionCtaAlignment === 'left',
    [styles['copy__cta--center']]: props.sectionCtaAlignment === 'center',
    [styles['copy__cta--right']]: props.sectionCtaAlignment === 'right'
  })

  return (
    <section className={wrapperClasses}>
      <div className={styles.wrapper__inner}>
        {sectionHeadingExists() && (
          <Container className={copyClasses}>
            <SectionHead
              heading={props.sectionHeading}
              subheading={props.sectionCopy}
              className={styles.copy__sectionhead}
              alignment="left"
            />
            {!props.items?.length &&
              !Number(props?.sectionCtaTriggersModal) &&
              props?.sectionCta?.url && (
                <Button
                  url={props?.sectionCta?.url}
                  text={props?.sectionCta?.title}
                  className={copyButtonClasses}
                />
              )}
            {!props.items?.length && props?.sectionCtaTriggersModal && (
              <Button
                onClick={() => {
                  setIsOpen(true)
                }}
                text={
                  props?.sectionCtaText
                    ? props?.sectionCtaText
                    : 'Contact A Specialist'
                }
                className={copyButtonClasses}
              />
            )}
          </Container>
        )}
        {props.items?.length > 0 && (
          <Container className={styles.items}>
            <div className={styles.items__list}>
              {props.items &&
                props.items.map((item) => (
                  <div key={uuidv4()} className={styles.items__list__item}>
                    {item.icon && (
                      <div className={styles.items__list__item__image}>
                        <img
                          className={styles.items__list__item__image__img}
                          src={item.icon?.mediaItemUrl}
                          alt={item.icon?.altText}
                        />
                      </div>
                    )}
                    <div className={styles.items__list__item__content}>
                      {item.heading && (
                        <h3
                          className={styles.items__list__item__content__heading}
                          dangerouslySetInnerHTML={{
                            __html: item.heading
                          }}
                        />
                      )}
                      {item.copy && (
                        <div
                          className={styles.items__list__item__content__copy}
                          dangerouslySetInnerHTML={{
                            __html: item.copy
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
            {!Number(props?.sectionCtaTriggersModal) &&
              props?.sectionCta?.url && (
                <Button
                  url={props?.sectionCta?.url}
                  text={props?.sectionCta?.title}
                  className={itemsButtonClasses}
                />
              )}
            {props?.sectionCtaTriggersModal && (
              <Button
                onClick={() => {
                  setIsOpen(true)
                }}
                text={
                  props?.sectionCtaText
                    ? props?.sectionCtaText
                    : 'Contact A Specialist'
                }
                className={itemsButtonClasses}
              />
            )}
          </Container>
        )}
      </div>
    </section>
  )
}

AcfFeaturesOverview.propTypes = {
  sectionHeading: PropTypes.string,
  sectionCopy: PropTypes.string,
  sectionCtaAlignment: PropTypes.oneOf(['left', 'center', 'right']),
  sectionCtaTriggersModal: PropTypes.bool,
  modalContents: PropTypes.string,
  sectionCta: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      copy: PropTypes.string,
      icon: PropTypes.shape({
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

AcfFeaturesOverview.defaultProps = {
  sectionCtaAlignment: 'center'
}
