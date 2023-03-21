import Container from '@/components/atoms/Container'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import styles from './CategoryMenu.module.scss'

/**
 * @param  {object}   props                         Component props
 * @param  {string}   props.customClassName         Override container styles
 * @param  {Array}    props.children                Repeating array of children items.
 * @param  {string}   props.heading                 The menu heading.
 * @param  {boolean}  props.toggleHeading           Toggle for the menu heading.
 * @param  {boolean}  props.loading                 Tab content loading flag
 * @param  {string}   props.defaultSelectedIndex    Default Selected Index
 * @param  {Function} props.notifyInitTabChange     Tab change init function
 * @param  {Function} props.notifyCompleteTabChange Tab change complete function
 * @param  {string}   props.defaultRef              Default/Parent ref value
 * @return {Element}                                The Category Menu component.
 */
export default function CategoryMenu({
  customClassName,
  children,
  heading,
  toggleHeading,
  loading,
  defaultSelectedIndex,
  notifyInitTabChange,
  notifyCompleteTabChange,
  defaultRef
}) {
  const [selected, setSelected] = useState(defaultSelectedIndex)
  const [refId, setRefId] = useState(defaultRef)

  const handleTabChange = (index, refId, event) => {
    //optimization, stop tab change until the content on the selected tab is fully loaded
    if (loading) return

    //If the same tab is clicked again, do nothing
    if (selected === index) return

    notifyInitTabChange()
    setRefId(refId)
    setSelected(index)

    //Try to scroll the selected tab into the view point
    const scrollContainer = event.target.parentElement
    const scrollRect = scrollContainer.getBoundingClientRect()
    const activeRect = event.target.getBoundingClientRect()

    if (activeRect.left < 0) {
      scrollContainer.scrollLeft -=
        scrollContainer.scrollWidth / 2 +
        activeRect.left / 2 +
        scrollRect.left * 2
    } else if (activeRect.right > scrollRect.width) {
      scrollContainer.scrollLeft +=
        scrollContainer.scrollWidth / 2 +
        activeRect.left / 2 +
        scrollRect.left * 2
    }
  }

  useEffect(() => {
    notifyCompleteTabChange(refId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refId])

  useEffect(() => {
    setRefId(defaultRef)
    setSelected(defaultSelectedIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSelectedIndex])

  return (
    <Container className={`${styles.container} ${customClassName}`}>
      <ul
        style={
          toggleHeading && heading ? {textAlign: 'left'} : {textAlign: 'center'}
        }
      >
        {toggleHeading && heading && (
          <>
            <li className={styles.container__heading}>{heading}</li>
            <svg
              className={styles.container__svg}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </>
        )}
        {children.map((element, index) => {
          let style = index === selected ? 'selected' : ''
          return (
            <li
              style={
                toggleHeading && heading ? {width: '22%'} : {width: '33.32%'}
              }
              key={index}
              className={styles[style]}
              onClick={(event) =>
                handleTabChange(index, element.props.refid, event)
              }
            >
              {element.props.title}
            </li>
          )
        })}
      </ul>
      <div className={styles.container__tab}>{children[selected]}</div>
    </Container>
  )
}

CategoryMenu.propTypes = {
  heading: PropTypes.string,
  toggleHeading: PropTypes.bool,
  children: PropTypes.array,
  loading: PropTypes.bool
}

CategoryMenu.defaultProps = {
  notifyCompleteTabChange: function () {},
  notifyInitTabChange: function () {},
  loading: false,
  defaultSelectedIndex: 0
}
