import Icon from '@/components/atoms/Icon'
import {getTranslation} from '@/functions/utility'
import cn from 'classnames'
import {useWordPressContext} from 'components/common/WordPressProvider'
import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from 'react'
import styles from './Accordion.module.scss'

/**
 * Render the Accordion component.
 *
 * @param  {object}   props                                 FAQSection component props.
 * @param  {number}   props.index                           Index
 * @param  {Function} props.notifyToggleAccordion           Notify Toggle Accordion
 * @param  {boolean}  props.defaultActive                   Should accordian be open by default
 * @param  {boolean}  props.refresh                         Refresh the accordion content
 * @param  {string}   props.accordionSectionClasName        Override style - accordion section class name
 * @param  {string}   props.accordionTitleClassName         Override style - accordion title class name
 * @param  {boolean}  props.isRichtextTitle                 Indicate if the title is rich text
 * @param  {string}   props.title                           Title
 * @param  {string}   props.accordionIconClassName          Override style - accordion icon class name
 * @param  {string}   props.accordionContentClassName       Override style - accordion content class name
 * @param  {string}   props.accordionContentActiveClassName Override style - accordion content active class name
 * @param  {boolean}  props.dangerouslySetInnerHTML         Indicate whether to dangerously set inner HTML
 * @param  {string}   props.accordionTextClassName          Override style - accordion text class name
 * @param  {object}   props.content                         Accordian content
 * @return {Element}                                        The Accordion component.
 */
export default function Accordion({
  index,
  notifyToggleAccordion,
  defaultActive,
  refresh,
  accordionSectionClasName,
  accordionTitleClassName,
  isRichtextTitle,
  title,
  accordionIconClassName,
  accordionContentClassName,
  accordionContentActiveClassName,
  dangerouslySetInnerHTML,
  accordionTextClassName,
  content
}) {
  const {headlessConfig} = useWordPressContext()
  const [activeState, setActiveState] = useState('')
  const [heightState, setHeightState] = useState('0px')
  const [rotateState, setRotateState] = useState(styles.accordion__icon)
  const contentRef = useRef(null)

  /**
   * Toggles the accordion state
   */
  function toggleAccordion() {
    notifyToggleAccordion(index)
    setActiveState(activeState === '' ? styles.active : '')
    setHeightState(
      activeState === styles.active
        ? '0px'
        : `${contentRef.current.scrollHeight}px`
    )
    setRotateState(
      activeState === styles.active
        ? styles.accordion__icon
        : (styles.accordion__icon, styles.rotate)
    )
  }

  useEffect(() => {
    if (defaultActive && activeState === '') toggleAccordion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultActive])

  useEffect(() => {
    if (refresh) setHeightState(`${contentRef.current.scrollHeight}px`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  return (
    <div className={`${styles.accordion__section} ${accordionSectionClasName}`}>
      <button
        className={cn(styles.accordion, accordionTitleClassName, activeState)}
        onClick={toggleAccordion}
      >
        {isRichtextTitle ? (
          <div className={styles.accordion__title}>{title}</div>
        ) : (
          <p className={styles.accordion__title}>{title}</p>
        )}
        <span className={accordionIconClassName}>
          <Icon
            className={rotateState}
            title={`${
              activeState
                ? getTranslation(headlessConfig, 'COLLAPSE')
                : getTranslation(headlessConfig, 'EXPAND')
            } `}
            style="fill"
            icon="chevron"
          />
        </span>
      </button>
      <div
        ref={contentRef}
        style={{maxHeight: `${heightState}`}}
        className={`${styles.accordion__content} ${accordionContentClassName} ${
          activeState && accordionContentActiveClassName
        }`}
      >
        {dangerouslySetInnerHTML ? (
          <div
            className={cn(styles.accordion__text, accordionTextClassName)}
            dangerouslySetInnerHTML={{__html: content}}
          />
        ) : (
          <div className={cn(styles.accordion__text, accordionTextClassName)}>
            {content}
          </div>
        )}
      </div>
    </div>
  )
}

Accordion.defaultProps = {
  dangerouslySetInnerHTML: true,
  isRichtextTitle: false,
  notifyToggleAccordion: function () {}
}

Accordion.propTypes = {
  title: PropTypes.any,
  notifyToggleAccordion: PropTypes.func,
  content: PropTypes.any,
  className: PropTypes.string,
  accordionSectionClasName: PropTypes.string,
  accordionContentClassName: PropTypes.string,
  accordionContentActiveClassName: PropTypes.string,
  accordionTitleClassName: PropTypes.string,
  accordionTextClassName: PropTypes.string,
  accordionIconClassName: PropTypes.string,
  dangerouslySetInnerHTML: PropTypes.bool,
  isRichtextTitle: PropTypes.bool,
  refresh: PropTypes.bool
}
