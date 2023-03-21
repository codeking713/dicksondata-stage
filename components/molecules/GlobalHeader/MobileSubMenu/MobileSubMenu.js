import IconArrow from '@/components/icons/IconArrow'
import NextLink from 'next/link'
import {useState} from 'react'
import styles from './MobileSubMenu.module.scss'
import {replaceAdditionalLangCodes} from '@/functions/utility'

/**
 * @param  {object}   props                 Props for MobileSubMenu
 * @param  {Array}    props.items           Items
 * @param  {boolean}  props.dropdownOpen    Dropdown open
 * @param  {Function} props.handleLinkClick Function to set menu state
 * @return {Element}                        The MobileSubMenu component.
 */
export default function MobileSubMenu({items, handleLinkClick, dropdownOpen}) {
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

  const hasChildren = (products) => products && products?.length > 0

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
    <ul
      className={
        dropdownOpen ? `${styles.subnav} ${styles.subnav__open}` : styles.subnav
      }
    >
      {hasChildren(items)
        ? items.map((product) => {
            return (
              <li
                key={product.id}
                className={`${
                  !hasChildren(product.children) && styles.subnav__link
                }`}
              >
                {hasChildren(product.children) ? (
                  <div className={styles['subnav--dropdwn']}>
                    <a
                      href={replaceAdditionalLangCodes(product.path)}
                      className={styles.subnav__label}
                      onClick={
                        isPathReallyMenuToggle(product)
                          ? () => handleMenuToggle(product.id)
                          : handleLinkClick
                      }
                    >
                      <IconArrow className={styles.subnav__icon__link} />
                      {product.label}
                    </a>
                    {hasChildren(product.children) && (
                      <span onClick={() => handleMenuToggle(product.id)}>
                        <IconArrow
                          fill="#313F49"
                          className={styles.subnav__icon}
                        />
                      </span>
                    )}
                  </div>
                ) : (
                  <NextLink
                    href={replaceAdditionalLangCodes(product?.path) ?? '#'}
                  >
                    <a
                      href={replaceAdditionalLangCodes(product.path)}
                      onClick={
                        isPathReallyMenuToggle(product)
                          ? () => handleMenuToggle(product.id)
                          : handleLinkClick
                      }
                    >
                      <IconArrow className={styles.subnav__icon__link} />
                      {product.label}
                    </a>
                  </NextLink>
                )}
                {hasChildren(product.children) && (
                  <ul
                    className={`${styles.subnav} ${
                      openDropdowns.find((t) => t === product.id)
                        ? styles.subnav__open
                        : ''
                    }`}
                  >
                    {product.children.map((subProduct) => (
                      <li key={subProduct.id} className={styles.subnav__link}>
                        <NextLink
                          href={
                            replaceAdditionalLangCodes(subProduct?.path) ?? '#'
                          }
                        >
                          <a
                            href={replaceAdditionalLangCodes(subProduct?.path)}
                            onClick={handleLinkClick}
                          >
                            <IconArrow className={styles.subnav__icon__link} />
                            {subProduct.label}
                          </a>
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })
        : null}
    </ul>
  )
}
