import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import Loader from '@/components/atoms/Loader'
import IconSearchHeader from '@/components/icons/IconSearchHeader'
import {getTranslation} from '@/functions/utility'
import {useWordPressContext} from 'components/common/WordPressProvider'
import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import styles from './Search.module.scss'
/**
 * Render the Search component.
 *
 * @param  {object}   props                           Search component props.
 * @param  {Function} props.handleSearchInputOnChange Handle search input
 * @param  {Array}    props.searchResults             Search results
 * @param  {Function} props.handleSearchResultClick   Handle seach result item click
 * @param  {string}   props.searchInput               Search input
 * @param  {boolean}  props.isNavigating              Navigate to the support product after clicking on search result
 * @param  {boolean}  props.isSearchingArtifact       Indicate of a search is in progress
 * @param  {boolean}  props.isEnableSearchButton      Display the search button
 * @param  {Function} props.handleSearchButtonClick   Handle the search button click. Only use it if isEnableSearchButton is true
 * @param  {boolean}  props.isSearchInputFocus        Indicate if the searchbox needs to be focused
 * @return {Element}                                  The Search component.
 */
export default function Search({
  handleSearchInputOnChange,
  searchInput,
  searchResults,
  isSearchingArtifact,
  handleSearchResultClick,
  isNavigating,
  isEnableSearchButton,
  handleSearchButtonClick,
  isSearchInputFocus
}) {
  const [active, setActive] = useState(false)
  const {headlessConfig} = useWordPressContext()
  const wrapperRef = useRef(null)
  const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus()
    }

    return [htmlElRef, setFocus]
  }
  const [searchInputRef, setInputFocus] = useFocus()
  useOutsideClickHandler(wrapperRef)
  const [actionInProgressIndex, setActionInProgressIndex] = useState()

  useEffect(() => {
    if (isSearchInputFocus) setInputFocus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchInputFocus])

  /**
   * Handle Outside Click Event
   *
   * @param {any} ref ref object
   */
  function useOutsideClickHandler(ref) {
    useEffect(() => {
      /**
       * @param {any} event Event
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive(false)
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const handleOnClick = (result, index) => {
    if (!isNavigating) {
      setActionInProgressIndex(index)
      handleSearchResultClick(result)
      setActive(false)
    }
  }

  return (
    <>
      <div className={styles.container} ref={wrapperRef}>
        <div className={styles.container__icon}>
          <IconSearchHeader fill={'#064772'} />
        </div>
        <input
          ref={searchInputRef}
          type="search"
          title={getTranslation(headlessConfig, 'SEARCH')}
          aria-label={getTranslation(headlessConfig, 'SEARCH')}
          onChange={(e) => handleSearchInputOnChange(e.target.value)}
          onFocus={() => setActive(true)}
          placeholder={getTranslation(headlessConfig, 'SEARCH')}
          value={searchInput}
          disabled={actionInProgressIndex && isNavigating}
          className={styles.container__search}
        />
        {isEnableSearchButton &&
          !isSearchingArtifact &&
          searchInput.trim() !== '' && (
            <Button
              text={getTranslation(headlessConfig, 'SEARCH')}
              className={styles.container__search__button}
              onClick={(e) => handleSearchButtonClick(e)}
            ></Button>
          )}
        {isSearchingArtifact && (
          <span className={styles.container__loading}>
            <Loader processing={true} enableAnimatedLoader={true} />
          </span>
        )}
        <div
          className={`${styles.container__suggestions} ${
            active && searchResults && searchResults.length > 0
              ? styles['container__suggestions--expanded']
              : ''
          }`}
        >
          <ul>
            {active &&
              searchResults?.map((result, index) => (
                <li
                  className={styles.container__suggestions__suggestion}
                  onClick={() => handleOnClick(result, index)}
                  key={index}
                >
                  <div
                    className={styles.container__suggestions__suggestion__img}
                  >
                    <Image
                      alt={result?.altText}
                      imageMeta={result?.image}
                      height={result?.image?.height ?? 30}
                      width={result?.image?.mediaDetails?.width ?? 30}
                      src={result?.image?.mediaItemUrl}
                      nextImageFill={true}
                    />
                  </div>
                  <div
                    className={styles.container__suggestions__suggestion__name}
                  >
                    {result.name}
                  </div>
                  {isNavigating && actionInProgressIndex === index && (
                    <div
                      className={
                        styles.container__suggestions__suggestion__loading
                      }
                    >
                      <Loader processing={true} enableAnimatedLoader={true} />
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  )
}

Search.defaultProps = {
  handleSearchInputOnChange: function () {},
  isEnableSearchButton: false,
  searchInput: '',
  isSearchInputFocus: false
}

Search.propTypes = {
  searchInput: PropTypes.string,
  searchResults: PropTypes.array,
  handleSearchInputOnChange: PropTypes.func,
  isEnableSearchButton: PropTypes.bool
}
