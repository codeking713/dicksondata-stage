import IconArrow from '@/components/icons/IconArrow'
import NextLink from 'next/link'
import React from 'react'
import styles from './PrimaryNavigation.module.scss'
import {v4 as uuidv4} from 'uuid'
import classNames from 'classnames'
import {replaceAdditionalLangCodes} from '@/functions/utility'

/**
 * @param  {object}  props       Props for SubMenu
 * @param  {Array}   props.items Items
 * @return {Element}             The SubMenu component.
 */
export default function DesktopSubMenu({items}) {
  const hasChildren = (products) => {
    if (products && products?.length > 0) {
      return true
    } else {
      return false
    }
  }

  const doesLinkExist = (link) => {
    if (link && link !== '#') {
      return true
    } else {
      return false
    }
  }

  const generateSubmenuClassnames = (amount) =>
    classNames({
      [styles.nav__item__row__submenu__children]: true,
      [styles['nav__item__row__submenu__children--twocol']]: amount > 7,
      [styles['nav__item__row__submenu__children--threecol']]: amount > 14
    })

  return hasChildren(items)
    ? items.map((product) => {
        return (
          <div
            key={uuidv4()}
            className={`${styles.nav__item__row__submenu} ${
              hasChildren(product.children) &&
              styles['nav__item__row__submenu--withchild']
            }`}
          >
            {doesLinkExist(product?.path) ? (
              <NextLink href={replaceAdditionalLangCodes(product?.path) ?? '#'}>
                <a className={styles.nav__item__row__submenu__headerlink}>
                  {product.label}
                </a>
              </NextLink>
            ) : (
              <div className={styles.nav__item__row__submenu__headertext}>
                {product.label}
              </div>
            )}
            {hasChildren(product.children) && (
              <div
                className={generateSubmenuClassnames(product?.children?.length)}
              >
                {product.children.map((subProduct) => (
                  <div
                    key={uuidv4()}
                    className={styles.nav__item__row__submenu__children__row}
                  >
                    <IconArrow
                      className={
                        styles.nav__item__row__submenu__children__row__arrow
                      }
                    />
                    {subProduct?.label && subProduct?.path && (
                      <NextLink
                        href={
                          replaceAdditionalLangCodes(subProduct?.path) ?? '#'
                        }
                      >
                        <a
                          className={
                            styles.nav__item__row__submenu__children__row__link
                          }
                        >
                          {subProduct.label}
                        </a>
                      </NextLink>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })
    : null
}
