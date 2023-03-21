import IconSearchHeader from '@/components/icons/IconSearchHeader'
import Search from '@/components/molecules/Search'
import styles from './MobileSearch.module.scss'

/**
 * @param  {object}   props                           Props for MobileSearch
 * @param  {Function} props.handleSearchClick         Handle Search Click
 * @param  {boolean}  props.isSearchOpen              Search Open Flag
 * @param  {Function} props.handleSearchOnSubmit      Handle Search On Submit
 * @param  {Function} props.handleSearchInputOnChange Handle Search Input On Change
 * @param  {boolean}  props.isSearchingArtifact       Searching Artifact flag
 * @param  {string}   props.searchQuery               Search string
 * @return {Element}                                  The MobileSearch component.
 */
export default function MobileSearch({
  handleSearchClick,
  isSearchOpen,
  handleSearchOnSubmit,
  handleSearchInputOnChange,
  isSearchingArtifact,
  searchQuery
}) {
  return (
    <div className={styles.search}>
      <button
        className={styles.search__button}
        aria-expanded={isSearchOpen}
        onClick={handleSearchClick}
      >
        <IconSearchHeader />
      </button>
      <div
        className={
          isSearchOpen
            ? `${styles.search__input_wrapper} ${styles.search__open}`
            : styles.search__input_wrapper
        }
      >
        <form onSubmit={(e) => handleSearchOnSubmit(e)} role="search">
          <Search
            handleSearchInputOnChange={handleSearchInputOnChange}
            isSearchingArtifact={isSearchingArtifact}
            isEnableSearchButton={
              searchQuery && searchQuery.length > 0 ? true : false
            }
            handleSearchButtonClick={handleSearchOnSubmit}
            searchInput={searchQuery}
            isSearchInputFocus={isSearchOpen}
          />
        </form>
      </div>
    </div>
  )
}
