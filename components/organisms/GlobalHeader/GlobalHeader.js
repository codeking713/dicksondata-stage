import Container from '@/components/atoms/Container'
import Logo from '@/components/atoms/Logo'
import MainNavToggle from '@/components/atoms/MainNavToggle'
import CartIcon from '@/components/molecules/Checkout/CartIcon'
import MobileMenu from '@/components/molecules/GlobalHeader/MobileMenu'
import MobileSearch from '@/components/molecules/GlobalHeader/MobileSearch'
import PrimaryNavigation from '@/components/molecules/GlobalHeader/PrimaryNavigation'
import parseQuerystring from '@/functions/parseQuerystring'
import {useWordPressContext} from 'components/common/WordPressProvider'
import NextLink from 'next/link'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import HeaderTop from '../HeaderTop'
import styles from './GlobalHeader.module.scss'

/**
 * @return {Element}                          The GlobalHeader component.
 * @param  {object}   props                   Props for GlobalHeader
 * @param  {boolean}  props.mobileMenuOpen    Menu open
 * @param  {Function} props.setMobileMenuOpen Function to set menu state
 */
export default function GlobalHeader({mobileMenuOpen, setMobileMenuOpen}) {
  const {menus, headlessConfig} = useWordPressContext()
  const topNav = {
    phone_menu: [
      {
        id: '1231',
        label: headlessConfig?.additionalSettings?.contactInfo?.hotline,
        path: 'https://'
      }
    ]
  }

  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleSearchClick = () => {
    setMobileMenuOpen(false)
    setIsSearchOpen(!isSearchOpen)
  }
  const handleMainMenuClick = () => {
    setIsSearchOpen(false)
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const router = useRouter()
  const [isSearchingArtifact, setIsSearchingArtifact] = useState(false)
  const path = router?.asPath // URL from router.
  const query = path.includes('s=') ? parseQuerystring(path, 's') : ''
  const [searchQuery, setSearchQuery] = useState(query)

  const handleSearchInputOnChange = (searchText) => {
    setSearchQuery(searchText)
  }

  const handleSearchOnSubmit = (e) => {
    e.preventDefault()

    if (searchQuery.trim() === '') return

    setIsSearchingArtifact(true)
    router.push(`/search?s=${searchQuery.trim()}`)
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const handleRouteChange = () => {
    setIsSearchingArtifact(false)
  }

  return (
    <header className={styles.header}>
      {topNav?.phone_menu && (
        <HeaderTop
          phones={topNav?.phone_menu}
          handleSearchOnSubmit={handleSearchOnSubmit}
          handleSearchInputOnChange={handleSearchInputOnChange}
          isSearchingArtifact={isSearchingArtifact}
          searchQuery={searchQuery}
          headlessConfig={headlessConfig}
        />
      )}
      <div className={styles.header__container}>
        <Container
          noPaddingTop={true}
          noPaddingBtm={true}
          className={styles.header__container__content}
        >
          <NextLink href="/">
            <a
              className={styles.header__container__content__logo}
              aria-label="Digital Authority Partners"
            >
              <Logo />
            </a>
          </NextLink>
          <div className={styles.header__container__content__navigation}>
            <PrimaryNavigation />
            <div
              className={styles.header__container__content__navigation__cart}
            >
              <CartIcon />
            </div>
          </div>
          <div
            className={styles.header__container__content__navigation__mobile}
          >
            <MobileSearch
              handleSearchClick={handleSearchClick}
              isSearchOpen={isSearchOpen}
              handleSearchOnSubmit={handleSearchOnSubmit}
              handleSearchInputOnChange={handleSearchInputOnChange}
              isSearchingArtifact={isSearchingArtifact}
              searchQuery={searchQuery}
            />
            <MainNavToggle
              mobileMenuOpen={mobileMenuOpen}
              handleClick={handleMainMenuClick}
            />
          </div>
        </Container>
      </div>
      {menus?.primary_menu && (
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          menuData={menus?.primary_menu}
        />
      )}
    </header>
  )
}
