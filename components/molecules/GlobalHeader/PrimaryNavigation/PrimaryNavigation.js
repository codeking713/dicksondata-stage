import {useWordPressContext} from 'components/common/WordPressProvider'
import NextLink from 'next/link'
import styles from './PrimaryNavigation.module.scss'
import PrimaryNavigationSubmenu from './PrimaryNavigationSubmenu'

/**
 * @return {Element} The PrimaryNavigation component.
 */
export default function PrimaryNavigation() {
  const {menus} = useWordPressContext()
  const doesLinkExist = (link) => {
    if (link && link !== '#') {
      return true
    } else {
      return false
    }
  }

  const showFullMenu = (items) => {
    //If a main item have child items and main item count is more than 1, we will display the full menu
    return items?.length > 1 && items?.find((a) => a.children.length > 1)
  }

  return (
    <nav>
      <ul className={styles.nav}>
        {!!menus?.primary_menu?.length &&
          menus?.primary_menu.map((product) => {
            return (
              <li key={product.id} className={styles.nav__item}>
                {product?.label && product?.path && (
                  <>
                    {doesLinkExist(product?.path) ? (
                      <NextLink href={product?.path ?? '#'}>
                        <a className={styles.nav__item__menulink}>
                          {product?.label}
                        </a>
                      </NextLink>
                    ) : (
                      <div className={styles.nav__item__menulink}>
                        {product?.label}
                      </div>
                    )}
                    {product?.children?.length > 0 && (
                      <div
                        className={`${styles['nav__item__content']} ${
                          showFullMenu(product?.children) &&
                          styles['nav__item__content--fullwidth']
                        }`}
                      >
                        <div
                          className={styles.nav__item__row}
                          data-children={product?.children?.length}
                        >
                          <PrimaryNavigationSubmenu items={product.children} />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </li>
            )
          })}
      </ul>
    </nav>
  )
}
