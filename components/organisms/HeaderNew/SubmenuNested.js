import IconCaretDown from 'components/icons/caretDown.js'
import {stringCamelCase, stringCapitalize} from 'functions/stringFunctions'
import Link from 'next/link'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import css from './header.module.scss'

const SubmenuNested = ({submenuItem}) => {
  const [isSubmenuNestedOpen, setIsSubmenuNestedOpen] = useState(false)

  const handleSubmenuNestedNestedClick = () => {
    setIsSubmenuNestedOpen(!isSubmenuNestedOpen)
  }

  return (
    <React.Fragment>
      {submenuItem.url && submenuItem.name && !submenuItem.subitemnested && (
        <Link href={submenuItem.url ?? '#'} as={submenuItem.url ?? '#'}>
          <a
            href={submenuItem.url}
            className={css.header__wrapper__nav__links__link__submenu__href}
          >
            {submenuItem.name}
          </a>
        </Link>
      )}
      {submenuItem.subitemnested && !!submenuItem.subitemnested.length && (
        <>
          {submenuItem.name && (
            <button
              className={
                isSubmenuNestedOpen
                  ? `${css.header__wrapper__nav__links__link__submenu__toggle} ${css['header__wrapper__nav__links__link__submenu__toggle--open']}`
                  : css.header__wrapper__nav__links__link__submenu__toggle
              }
              aria-controls={`dapSubmenuNestedNavItem${stringCapitalize(
                stringCamelCase(submenuItem.name)
              )}`}
              aria-expanded="false"
              onClick={handleSubmenuNestedNestedClick}
            >
              <span
                className={
                  css.header__wrapper__nav__links__link__submenu__toggle__name
                }
              >
                {submenuItem.name}
              </span>
              <IconCaretDown
                className={
                  css.header__wrapper__nav__links__link__submenu__toggle__icon
                }
                strokeWidth="1.25"
              />
            </button>
          )}
          <ul
            className={
              isSubmenuNestedOpen
                ? `${css.header__wrapper__nav__links__link__submenu__nested} ${css['header__wrapper__nav__links__link__submenu__nested--open']}`
                : css.header__wrapper__nav__links__link__submenu__nested
            }
            id={`dapSubmenuNestedNavItem${stringCapitalize(
              stringCamelCase(submenuItem.name)
            )}`}
            aria-hidden="true"
          >
            {submenuItem.subitemnested.map((subitemNested) => (
              <Link
                href={subitemNested.url ?? '#'}
                as={subitemNested.url}
                key={uuidv4()}
              >
                <a
                  href={subitemNested.url}
                  className={
                    css.header__wrapper__nav__links__link__submenu__nested__link
                  }
                >
                  {subitemNested.name}
                </a>
              </Link>
            ))}
          </ul>
        </>
      )}
    </React.Fragment>
  )
}

SubmenuNested.defaulProps = {
  url: '/',
  name: 'Link Name'
}

SubmenuNested.propTypes = {
  submenuItem: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    subitemnested: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    )
  })
}

export default SubmenuNested
