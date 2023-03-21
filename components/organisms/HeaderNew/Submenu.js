import IconCaretDown from 'components/icons/caretDown.js'
import {stringCamelCase, stringCapitalize} from 'functions/stringFunctions'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import css from './header.module.scss'
import SubmenuNested from './SubmenuNested'

const Submenu = ({url, name, onClick, submenuItems}) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)

  const handleSubmenuClick = () => {
    setIsSubmenuOpen(!isSubmenuOpen)
  }

  return (
    <li className={css.header__wrapper__nav__links__link}>
      {url && name && !submenuItems && (
        <Link href={url ?? '#'} as={url ?? '#'}>
          <a
            href={url}
            onClick={onClick}
            className={css.header__wrapper__nav__links__link__href}
          >
            {name}
          </a>
        </Link>
      )}
      {submenuItems && !!submenuItems.length && (
        <>
          {name && (
            <button
              className={
                isSubmenuOpen
                  ? `${css.header__wrapper__nav__links__link__toggle} ${css['header__wrapper__nav__links__link__toggle--open']}`
                  : css.header__wrapper__nav__links__link__toggle
              }
              aria-controls={`dapSubmenuNavItem${stringCapitalize(
                stringCamelCase(name)
              )}`}
              aria-expanded={isSubmenuOpen}
              onClick={handleSubmenuClick}
            >
              <span
                className={css.header__wrapper__nav__links__link__toggle__name}
              >
                {name}
              </span>
              <IconCaretDown
                className={css.header__wrapper__nav__links__link__toggle__icon}
                strokeWidth="1.25"
              />
            </button>
          )}
          <ul
            className={
              isSubmenuOpen
                ? `${css.header__wrapper__nav__links__link__submenu} ${css['header__wrapper__nav__links__link__submenu--open']}`
                : css.header__wrapper__nav__links__link__submenu
            }
            id={`dapSubmenuNavItem${stringCapitalize(stringCamelCase(name))}`}
            aria-hidden={!isSubmenuOpen}
          >
            {submenuItems.map((subitem) => (
              <SubmenuNested submenuItem={subitem} key={uuidv4()} />
            ))}
          </ul>
        </>
      )}
    </li>
  )
}

Submenu.defaulProps = {
  url: '/',
  name: 'Link Name'
}

Submenu.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  submenuItems: PropTypes.arrayOf(
    PropTypes.shape({
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
  )
}

export default Submenu
