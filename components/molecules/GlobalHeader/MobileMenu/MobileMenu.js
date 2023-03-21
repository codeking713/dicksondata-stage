import IconArrow from '@/components/icons/IconArrow'
import NextLink from 'next/link'
import {useState} from 'react'
import MobileSubMenu from '../MobileSubMenu'
import styles from './MobileMenu.module.scss'
import {replaceAdditionalLangCodes} from '@/functions/utility'

/**
 * @param  {object}   props                   Props for MobileMenu
 * @param  {boolean}  props.mobileMenuOpen    Menu open
 * @param  {Function} props.setMobileMenuOpen Function to set menu state
 * @param  {Array}    props.menuData          Menu data
 * @return {Element}                          The MobileMenu component.
 */
export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  menuData
}) {
  const [openDropdowns, setOpenDropdowns] = useState([])

  const handleMenuToggle = (menuId) => {
    var menuOpen = openDropdowns?.find((t) => t === menuId)
    if (menuOpen) {
      const newMenusIndexs = openDropdowns.filter((t) => !(t === menuId))
      setOpenDropdowns(newMenusIndexs)
    } else if (!menuOpen && openDropdowns?.length == 0) {
      setOpenDropdowns([menuId])
    } else {
      setOpenDropdowns([...openDropdowns, menuId])
    }
  }

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  const isPathReallyMenuToggle = (product) => {
    if (
      product?.children?.length &&
      (product?.path === '' || product?.path === '#')
    ) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className={`${styles.nav} ${mobileMenuOpen && styles['nav--open']}`}>
      <nav className={styles.nav__content}>
        <ul className={styles.nav__content__main}>
          {!!menuData &&
            menuData.length &&
            menuData.map((product) => (
              <li
                className={styles.nav__content__main__dropdown__outer}
                key={product?.id}
              >
                <div className={styles.nav__content__main__dropdown}>
                  <NextLink
                    href={replaceAdditionalLangCodes(product?.path) ?? '#'}
                  >
                    <a
                      href={replaceAdditionalLangCodes(product?.path)}
                      className={styles.nav__content__main__dropdown__label}
                      onClick={
                        isPathReallyMenuToggle(product)
                          ? () => handleMenuToggle(product.id)
                          : handleLinkClick
                      }
                    >
                      <IconArrow
                        className={
                          styles.nav__content__main__dropdown__icon__link
                        }
                      />
                      {product?.label}
                    </a>
                  </NextLink>
                  {product?.children?.length > 0 && (
                    <span onClick={() => handleMenuToggle(product.id)}>
                      <IconArrow
                        fill="#313F49"
                        className={styles.nav__content__main__dropdown__icon}
                      />
                    </span>
                  )}
                </div>
                {product?.children?.length > 0 && (
                  <MobileSubMenu
                    items={product.children}
                    dropdownOpen={openDropdowns.find((t) => t === product.id)}
                    handleLinkClick={handleLinkClick}
                  />
                )}
              </li>
            ))}
        </ul>
      </nav>
    </div>
  )
}
