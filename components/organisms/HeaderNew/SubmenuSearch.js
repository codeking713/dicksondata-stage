import React from 'react'
import PropTypes from 'prop-types'
import css from './header.module.scss'
import IconSearch from 'components/icons/search.js'

const SubmenuSearch = () => {
  return (
    <li className={css.header__wrapper__nav__links__search}>
      <form>
        <label
          className={css.header__wrapper__nav__links__search__label}
          htmlFor="search-mobile"
        >
          Search
        </label>
        <IconSearch
          className={css.header__wrapper__nav__links__search__icon}
          strokeWidth="2"
        />
        <input
          className={css.header__wrapper__nav__links__search__input}
          id="search-mobile"
          type="text"
          name="query"
          placeholder="Search"
        />
      </form>
    </li>
  )
}

SubmenuSearch.propTypes = {
  handleSearch: PropTypes.func
}

export default SubmenuSearch
