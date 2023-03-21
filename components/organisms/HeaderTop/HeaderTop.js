import Container from '@/components/atoms/Container'
import CartIcon from '@/components/molecules/Checkout/CartIcon'
import Search from '@/components/molecules/Search'
import TalkToUs from '@/components/molecules/TalkToUs'
import LanguageSelect from '@/components/organisms/LanguageSelect'
import {getTranslation} from '@/functions/utility'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './HeaderTop.module.scss'

/**
 * Render the HeaderTop component.
 *
 * @author DAP
 * @param  {object}   props                           HeaderTop component props.
 * @param  {Array}    props.phones                    The Array of phones
 * @param  {Function} props.handleSearchOnSubmit      Handle Search On Submit
 * @param  {Function} props.handleSearchInputOnChange Handle Search Input On Change
 * @param  {boolean}  props.isSearchingArtifact       Searching Artifact flag
 * @param  {string}   props.searchQuery               Search string
 * @param  {object}   props.headlessConfig            Headless config data
 * @return {Element}                                  The HeaderTop component.
 */
export default function HeaderTop({
  phones,
  handleSearchOnSubmit,
  handleSearchInputOnChange,
  isSearchingArtifact,
  searchQuery,
  headlessConfig
}) {
  return (
    <div className={styles.container}>
      <Container
        noPaddingTop={true}
        noPaddingBtm={true}
        className={styles.container__content}
      >
        <div className={styles.container__content__hotline}>
          {headlessConfig && (
            <TalkToUs
              phoneLabel={getTranslation(headlessConfig, 'TALK_TO_US')}
              phones={phones}
            />
          )}
        </div>
        <div className={styles['container__content--spacer']}></div>
        <div className={styles.container__content__search}>
          <form
            className={styles.container__content__search__form}
            onSubmit={(e) => handleSearchOnSubmit(e)}
            role="search"
          >
            <Search
              handleSearchInputOnChange={handleSearchInputOnChange}
              isSearchingArtifact={isSearchingArtifact}
              isEnableSearchButton={
                searchQuery && searchQuery.length > 0 ? true : false
              }
              handleSearchButtonClick={handleSearchOnSubmit}
              searchInput={searchQuery}
            />
          </form>
        </div>
        <div className={styles['container__content--spacer']}></div>
        <LanguageSelect
          className={styles.container__content__lang}
        ></LanguageSelect>
        <div className={styles.container__content__cart}>
          <CartIcon style="MOBILE" />
        </div>
      </Container>
    </div>
  )
}

HeaderTop.propTypes = {
  phoneLabel: PropTypes.string,
  phones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      path: PropTypes.string
    })
  )
}
