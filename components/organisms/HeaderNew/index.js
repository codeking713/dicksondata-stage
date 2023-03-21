import Logout from '@/components/atoms/LogoutButton'
import Logo from 'components/atoms/Logo'
import MainNavCart from 'components/atoms/MainNavCart'
import MainNavToggle from 'components/atoms/MainNavToggle'
import {useSession} from 'next-auth/client'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
// import { useWordPressContext } from 'components/common/WordPressProvider'
import css from './header.module.scss'
import Submenu from './Submenu'
import SubmenuSearch from './SubmenuSearch'

const Header = ({menu}) => {
  // const { menus } = useWordPressContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [itemsInCart, setItemsInCart] = useState(0)

  const handleMainMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen)
    // TODO Remove this
    setItemsInCart(itemsInCart + 1)
  }

  const handleSearch = () => {
    //
  }

  const [session, loading] = useSession()

  return (
    <header className={css.header} role="banner">
      <div className={css.header__wrapper}>
        <div className={css.header__wrapper__brand}>
          <MainNavToggle
            isMenuOpen={isMenuOpen}
            handleClick={handleMainMenuClick}
          />
          <NextLink href="/">
            <a
              className={css.header__wrapper__brand__logo}
              aria-label="Digital Authority Partners"
            >
              <Logo />
            </a>
          </NextLink>
          <div className={css.icons}>
            <MainNavCart
              handleClick={handleCartClick}
              itemsInCart={itemsInCart}
            />
            {session?.user.id && <Logout />}
          </div>
        </div>
        {!!menu?.length && (
          <nav
            className={
              isMenuOpen
                ? `${css.header__wrapper__nav} ${css['header__wrapper__nav--open']}`
                : css.header__wrapper__nav
            }
            role="navigation"
          >
            <ul
              className={
                isMenuOpen
                  ? `${css.header__wrapper__nav__links} ${css['header__wrapper__nav__links--open']}`
                  : css.header__wrapper__nav__links
              }
              role="navigation"
              itemScope="itemscope"
              itemType="http://schema.org/SiteNavigationElement"
              id="dapHeaderNav"
              aria-hidden={!isMenuOpen}
            >
              <SubmenuSearch handleSearch={handleSearch} />
              {menu.map((menuItem) => (
                <Submenu
                  url={menuItem.url}
                  name={menuItem.name}
                  submenuItems={menuItem.subitem ? menuItem.subitem : null}
                  key={uuidv4()}
                />
              ))}
              <div className={css.header__wrapper__nav__cart}>
                <MainNavCart
                  handleClick={handleCartClick}
                  itemsInCart={itemsInCart}
                />
              </div>

              {session?.user.firstName && !loading && (
                <div className={css.header__wrapper__nav__cart}>
                  <Logout />
                </div>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

Header.defaultProps = {
  menu: [
    {
      url: '/',
      name: 'Products',
      subitem: [
        {
          url: '/',
          name: 'View All Products'
        },
        {
          url: '/',
          name: 'Data Loggers',
          subitemnested: [
            {
              url: '/',
              name: 'View All Data Loggers'
            },
            {
              url: '/',
              name: 'DicksonOne'
            },
            {
              url: '/',
              name: 'Vaccine Monitoring'
            },
            {
              url: '/',
              name: 'USB'
            }
          ]
        },
        {
          url: '/',
          name: 'Chart Recorders',
          subitemnested: [
            {
              url: '/',
              name: 'View All Chart Recorders'
            },
            {
              url: '/',
              name: '3-Inch'
            },
            {
              url: '/',
              name: '4-Inch'
            },
            {
              url: '/',
              name: '6-Inch'
            },
            {
              url: '/',
              name: '8-Inch'
            }
          ]
        },
        {
          url: '/',
          name: 'Charts & Pens',
          subitemnested: [
            {
              url: '/',
              name: 'View All Charts & Pens'
            },
            {
              url: '/',
              name: 'Charts'
            },
            {
              url: '/',
              name: 'Pens'
            }
          ]
        },
        {
          url: '/',
          name: 'Product Overview'
        },
        {
          url: '/',
          name: 'Replaceable Sensors'
        },
        {
          url: '/',
          name: 'Calibrations'
        },
        {
          url: '/',
          name: 'Software'
        },
        {
          url: '/',
          name: 'Accessories'
        }
      ]
    },
    {
      url: '/',
      name: 'Solutions',
      subitem: [
        {
          url: '/',
          name: 'View All Solutions'
        },
        {
          url: '/',
          name: 'By Space',
          subitemnested: [
            {
              url: '/',
              name: 'View All By Space'
            },
            {
              url: '/',
              name: 'Vaccine Monitoring'
            },
            {
              url: '/',
              name: 'Ambient Monitoring'
            },
            {
              url: '/',
              name: 'Chamber Monitoring'
            },
            {
              url: '/',
              name: 'Cold Room & Refrigerator Monitoring'
            },
            {
              url: '/',
              name: 'Incubator Monitoring'
            }
          ]
        },
        {
          url: '/',
          name: 'By Variable',
          subitemnested: [
            {
              url: '/',
              name: 'View All By Variable'
            },
            {
              url: '/',
              name: 'Temperator Monitoring'
            },
            {
              url: '/',
              name: 'Humidity Monitoring'
            },
            {
              url: '/',
              name: 'Differential Pressure Monitoring'
            },
            {
              url: '/',
              name: 'Pressure Monitoring'
            }
          ]
        },
        {
          url: '/',
          name: 'By Industry',
          subitemnested: [
            {
              url: '/',
              name: 'View All By Industry'
            },
            {
              url: '/',
              name: 'Hospital & Healthcare'
            },
            {
              url: '/',
              name: 'Pharmaceutical'
            },
            {
              url: '/',
              name: 'Medical Device Manufacturers'
            },
            {
              url: '/',
              name: 'Food and Beverage'
            },
            {
              url: '/',
              name: 'Manufacturing & Production'
            },
            {
              url: '/',
              name: 'Aerospace'
            },
            {
              url: '/',
              name: '3PL'
            }
          ]
        }
      ]
    },
    {
      url: '/',
      name: 'Services',
      subitem: [
        {
          url: '/',
          name: 'View All Services'
        },
        {
          url: '/',
          name: 'Mapping'
        },
        {
          url: '/',
          name: 'Installation'
        },
        {
          url: '/',
          name: 'Validation'
        },
        {
          url: '/',
          name: 'Calibration'
        }
      ]
    },
    {
      url: '/',
      name: 'Insights',
      subitem: [
        {
          url: '/',
          name: 'View All Insights'
        },
        {
          url: '/',
          name: 'Mapping'
        },
        {
          url: '/',
          name: 'Installation'
        },
        {
          url: '/',
          name: 'Validation'
        },
        {
          url: '/',
          name: 'Calibration'
        }
      ]
    },
    {
      url: '/',
      name: 'Support',
      subitem: [
        {
          url: '/',
          name: 'View All Support'
        },
        {
          url: '/',
          name: 'Support',
          subitemnested: [
            {
              url: '/',
              name: 'View All Support'
            },
            {
              url: '/',
              name: 'FAQs'
            },
            {
              url: '/',
              name: 'Support Articles'
            },
            {
              url: '/',
              name: 'Manuals'
            }
          ]
        },
        {
          url: '/',
          name: 'Contact',
          subitemnested: [
            {
              url: '/',
              name: 'View All Contact'
            },
            {
              url: '/',
              name: 'About Dickson'
            },
            {
              url: '/',
              name: 'Careers'
            },
            {
              url: '/',
              name: 'Contact Us'
            }
          ]
        },
        {
          url: '/',
          name: 'White Papers'
        },
        {
          url: '/',
          name: 'Dickson Blog'
        },
        {
          url: '/',
          name: 'Catalog Archive'
        },
        {
          url: '/',
          name: 'Press Releases'
        }
      ]
    },
    {
      url: '/',
      name: 'About',
      subitem: [
        {
          url: '/',
          name: 'View All Account'
        },
        {
          url: '/',
          name: 'DicksonOne Login'
        },
        {
          url: '/',
          name: 'Cal Club'
        },
        {
          url: '/',
          name: 'Account Overview'
        },
        {
          url: '/',
          name: 'Account Details'
        },
        {
          url: '/',
          name: 'Orders'
        }
      ]
    }
  ]
}

Header.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      subitem: PropTypes.arrayOf(
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
    })
  )
}

export default Header
