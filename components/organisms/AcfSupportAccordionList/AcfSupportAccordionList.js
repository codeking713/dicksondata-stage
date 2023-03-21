import Container from '@/components/atoms/Container'
import Accordion from '@/components/molecules/Accordion'
import {getTranslation} from '@/functions/utility'
import {useWordPressContext} from 'components/common/WordPressProvider'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import CategoryMenu from '../CategoryMenu'
import SupportSearch from '../SupportSearch'
import styles from './AcfSupportAccordionList.module.scss'

/**
 * Render the AcfSupportAccordionList component.
 *
 * @param  {object}  props       AcfSupportAccordionList component props.
 * @param  {Array}   props.items The items for the component.
 * @return {Element}             The AcfSupportAccordionList component.
 */
export default function AcfSupportAccordionList(props) {
  const [list, setList] = useState([])
  const [userInput, setUserInput] = useState('')
  const {headlessConfig} = useWordPressContext()
  const [selected, setSelected] = useState(
    getTranslation(headlessConfig, 'GENERAL_FAQ')
  )

  useEffect(() => {
    setList(props.items)
  }, [props.items])

  /**
   * Filters items from prop to display
   *
   * @param {Function} callback Parameter to take filter arguments
   */
  // const filterProps = useCallback(
  //   (callback) => {
  //     setList(
  //       props.items.map((item) => ({
  //         ...item,
  //         subsectionChildNode: item.subsectionChildNode.map(
  //           (subsectionChildNode) => ({
  //             ...subsectionChildNode,
  //             toggleChildNode: subsectionChildNode.toggleChildNode.filter(
  //               (toggleChildNode) => callback(toggleChildNode)
  //             )
  //           })
  //         )
  //       }))
  //     )
  //   },
  //   [props.items]
  // )

  /**
   * Filters from the search field
   */
  // useEffect(() => {
  //   filterProps((toggleChildNode) =>
  //     toggleChildNode.tags.toLowerCase().includes(userInput.toLowerCase())
  //   )
  // }, [userInput, filterProps])

  /**
   * Filters from the select field
   */
  // useEffect(() => {
  //   filterProps((toggleChildNode) =>
  //     Array.isArray(toggleChildNode.category)
  //       ? toggleChildNode.category.some((category) => category === selected)
  //       : false
  //   )
  // }, [selected, filterProps])

  /**
   * Filters from the select field
   */

  useEffect(() => {
    let searchResults = props.items

    if (userInput && userInput !== '') {
      searchResults = props.items.map((item) => ({
        ...item,
        subsectionChildNode: item.subsectionChildNode.map(
          (subsectionChildNode) => ({
            ...subsectionChildNode,
            toggleChildNode: subsectionChildNode.toggleChildNode.filter(
              (toggleChildNode) =>
                toggleChildNode.text
                  ? toggleChildNode.text
                      .toLowerCase()
                      .includes(userInput.toLowerCase())
                  : false
            )
          })
        )
      }))
    } else if (
      selected &&
      selected !== getTranslation(headlessConfig, 'SELECT_CATEGORY')
    ) {
      searchResults = props.items.map((item) => ({
        ...item,
        subsectionChildNode: item.subsectionChildNode.map(
          (subsectionChildNode) => ({
            ...subsectionChildNode,
            toggleChildNode: subsectionChildNode.toggleChildNode.filter(
              (toggleChildNode) =>
                (toggleChildNode.category || toggleChildNode.category !== ''
                  ? toggleChildNode.category
                  : item.category) === selected
            )
          })
        )
      }))
    }

    setList(searchResults)
  }, [userInput, selected])

  return (
    <Container>
      <CategoryMenu>
        {list.map((item) => {
          let count = item.subsectionChildNode.reduce((total, node) => {
            return total + node.toggle
          }, 0)
          return (
            <div
              title={`${item.category} (${count})`}
              className={styles.items}
              key={uuidv4()}
            >
              <SupportSearch
                setSelected={setSelected}
                setSearch={setUserInput}
                selected={selected}
                search={userInput}
                headlessConfig={headlessConfig}
              />
              {item.subsectionChildNode.some(
                (item) => item.toggleChildNode.length > 0
              ) && <h3 className={styles.items__heading}>{item.heading}</h3>}
              {item.subsectionChildNode.map((item) => (
                <div className={styles.items__subsection} key={uuidv4()}>
                  {item.toggleChildNode.length > 0 && item.subject && (
                    <>
                      <h4 className={styles.subsection__subject}>
                        {item.subject}
                      </h4>
                      <div className={styles['items--borderbottom']} />
                    </>
                  )}
                  {item.toggleChildNode.map((item, index) => (
                    <div key={uuidv4()} index={index}>
                      <Accordion
                        accordionTitleClassName={
                          styles['subsection__title--padding']
                        }
                        accordionTextClassName={
                          styles['subsection__copy--padding']
                        }
                        title={item.text}
                        accordionContentClassName={styles.subsection__copy}
                        content={item.copy}
                      />
                    </div>
                  ))}
                </div>
              ))}
              <div className={styles['items--borderbottom']} />
            </div>
          )
        })}
      </CategoryMenu>
    </Container>
  )
}

AcfSupportAccordionList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      heading: PropTypes.string,
      subsectionChildNode: PropTypes.arrayOf(
        PropTypes.shape({
          subject: PropTypes.string,
          toggleChildNode: PropTypes.arrayOf(
            PropTypes.shape({
              tags: PropTypes.string,
              category: PropTypes.any,
              text: PropTypes.string,
              copy: PropTypes.string
            })
          ),
          toggle: PropTypes.number
        })
      ),
      subsection: PropTypes.number
    })
  )
}
