import Container from '@/components/atoms/Container'
import Search from '@/components/molecules/Search'
import {formatSupportArtificatData} from '@/functions/support/supportUtil'
import getSupportProducts from '@/functions/wordpress/support/getSupportProducts'
import debounce from 'lodash.debounce'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useCallback, useEffect, useState} from 'react'
import styles from './SupportHero.module.scss'

/**
 * Render the SupportHero component.
 *
 * @author DAP
 * @param  {object}  props             SupportHero component props.
 * @param  {string}  props.heading     The heading Text
 * @param  {string}  props.language    Language
 * @param  {string}  props.sub_heading The sub-heading Text
 * @return {Element}                   The SupportHero component.
 */
export default function SupportHero({heading, sub_heading, language}) {
  const [searchResults, setSearchResults] = useState([])
  const [searchInput, setSearchInput] = useState()
  const [isSearchingArtifact, setIsSearchingArtifact] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  const handleSearchInputOnChange = (searchText) => {
    setSearchInput(searchText)
  }

  const invokeSupportArtifactSearch = async (searchText) => {
    setIsSearchingArtifact(true)
    if (searchText && searchText.trim().length > 0) {
      await getSupportProducts(searchText.trim(), language)
        .then((response) => {
          var formattedSupportArtificatData = formatSupportArtificatData(
            response.data
          )
          setSearchResults(formattedSupportArtificatData)
          setIsSearchingArtifact(false)
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setSearchResults([])
    }
    setIsSearchingArtifact(false)
  }

  useEffect(() => {
    //Call graphql query and get the data
    debouncedSearchInputHandler(searchInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearchInputHandler = useCallback(
    debounce((searchInput) => {
      invokeSupportArtifactSearch(searchInput)
    }, 500),
    []
  )
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const handleRouteChange = () => {
    setIsNavigating(false)
    setIsSearchingArtifact(false)
  }

  const handleSearchResultClick = (result) => {
    setIsNavigating(true)
    setIsSearchingArtifact(true)
    router.push(`/support/${result.slug}`)
  }

  return (
    <Container className={styles.container}>
      <h1 className={styles.container__heading}>{heading}</h1>
      <h4 className={styles.container__subheading}>{sub_heading}</h4>
      <Search
        handleSearchInputOnChange={handleSearchInputOnChange}
        searchInput={searchInput}
        searchResults={searchResults}
        isSearchingArtifact={isSearchingArtifact}
        handleSearchResultClick={handleSearchResultClick}
        isNavigating={isNavigating}
      />
    </Container>
  )
}

SupportHero.propTypes = {
  heading: PropTypes.string,
  sub_heading: PropTypes.string
}
