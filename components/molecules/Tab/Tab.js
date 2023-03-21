import DisplayImage from '@/components/atoms/Image'
import IconCaretDown from '@/components/icons/caretDown.js'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import styles from './Tab.module.scss'

/**
 * Render the Tab component.
 *
 * @param  {object}  props                Tab component props.
 * @param  {Array}   props.children       Content of each tab.
 * @param  {number}  props.active         Indicate the active tab
 * @param  {object}  props.backgroundMeta Tab background image
 * @param  {number}  props.background     Tab background image ID
 * @return {Element}                      The Tab component.
 */
export default function Tab({
  children,
  active = 0,
  backgroundMeta,
  background
}) {
  const [activeTab, setActiveTab] = useState(active)
  const [activeExpander, setActiveExpander] = useState(active)
  const [tabsData, setTabsData] = useState([])

  useEffect(() => {
    let data = []
    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return
      const {
        props: {tab, tabBubble, children}
      } = element
      data.push({tab, tabBubble, children})
    })

    setTabsData(data)
  }, [children])

  return (
    <div className={styles.tabs}>
      <div className={styles.tabs__nav}>
        <ul className={styles.tabs__nav__items}>
          {tabsData.map(({tab, tabBubble}, index) => (
            <li
              key={index}
              className={`${styles.tabs__nav__items__tab} ${
                index === activeTab
                  ? styles['tabs__nav__items__tab--active']
                  : ''
              }`}
              onClick={() => setActiveTab(index)}
            >
              <span className={styles.tabs__nav__items__tab__text}>{tab}</span>
              {tabBubble && tabBubble != '' && (
                <span className={styles.tabs__nav__items__tab__bubble}>
                  {tabBubble}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.tabs__content}>
        {backgroundMeta && (
          <>
            <DisplayImage
              id={background}
              alt={backgroundMeta?.altText}
              url={backgroundMeta?.mediaItemUrl}
              imageMeta={backgroundMeta.imageMeta}
              nextImageFill={true}
              className={styles.tabs__content__backgroundLeft}
            />
            <DisplayImage
              id={background}
              alt={backgroundMeta?.altText}
              url={backgroundMeta?.mediaItemUrl}
              imageMeta={backgroundMeta.imageMeta}
              nextImageFill={true}
              className={styles.tabs__content__backgroundRight}
            />
          </>
        )}

        {tabsData.map((tab, index) => (
          <div
            className={`${styles.tabs__content__item} ${
              activeTab == index ? styles['tabs__content__item--active'] : ''
            }`}
            key={index}
            onClick={() =>
              activeExpander == index
                ? setActiveExpander(-1)
                : setActiveExpander(index)
            }
          >
            <>
              <div className={styles.tabs__content__item__mobileHeader}>
                <span
                  className={styles.tabs__content__item__mobileHeader__text}
                >
                  {tab.tab}
                </span>
                {tab.tabBubble && tab.tabBubble != '' && (
                  <span
                    className={styles.tabs__content__item__mobileHeader__bubble}
                  >
                    {tab.tabBubble}
                  </span>
                )}
                <IconCaretDown
                  className={`${
                    styles.tabs__content__item__mobileHeader__expander
                  } ${
                    activeExpander == index
                      ? styles[
                          'tabs__content__item__mobileHeader__expander--open'
                        ]
                      : ''
                  }`}
                  strokeWidth="1.25"
                />
              </div>
              <div
                className={`${styles.tabs__content__item__body} ${
                  styles.tabs__content__item__body__expander
                } ${
                  activeExpander == index
                    ? styles['tabs__content__item__body__expander--open']
                    : ''
                }`}
              >
                {tab.children}
              </div>
            </>
          </div>
        ))}
      </div>
    </div>
  )
}

const TabPane = ({children}) => {
  return {children}
}

Tab.TabPane = TabPane

Tab.propTypes = {
  children: PropTypes.array,
  active: PropTypes.number,
  background: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  backgroundMeta: PropTypes.shape({
    altText: PropTypes.string,
    mediaItemUrl: PropTypes.string,
    mediaDetails: PropTypes.shape({
      height: PropTypes.number,
      sizes: PropTypes.array,
      width: PropTypes.number
    })
  })
}

Tab.defaultProps = {}
