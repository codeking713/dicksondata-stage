import IconArrow from '@/components/icons/IconArrow'
import {getLangCode} from '@/functions/checkout/commonUtil'
import cn from 'classnames'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'
import Select, {components} from 'react-select'
import styles from './LanguageSelect.module.scss'
/**
 * Used react-select library to select, more detail: https://react-select.com/
 */

const fr_value = 'fr-fr'
const en_us_value = 'en-us'
const en_gb_value = 'en-gb'

/**
 * Render the LanguageSelect component.
 *
 * @author DAP
 * @param  {object}  props           The component attributes as props.
 * @param  {string}  props.className The LanguageSelect wrapper className.
 * @return {Element}                 The LanguageSelect component.
 */
export default function LanguageSelect({className}) {
  const router = useRouter()
  const {pathname, asPath, query, locale} = router
  const locales = [
    {
      label: 'English (US)',
      value: en_us_value
    },
    {
      label: 'English (GB)',
      value: en_gb_value
    },
    {
      label: 'French (FR)',
      value: fr_value
    }
  ]

  const [selectedLocal, setSelectedLocal] = useState(
    locales.find((l) => l.value === locale)
  )

  useEffect(() => {
    setSelectedLocal(locales.find((l) => l.value === getLangCode(locale)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  const changeLang = (e) => {
    if (e.value === fr_value && pathname.includes('product')) {
      return router.push(
        {pathname: pathname.replace('product', 'produit'), query},
        asPath,
        {locale: e.value}
      )
    }

    if (e.value !== fr_value && pathname.includes('produit')) {
      return router.push(
        {pathname: pathname.replace('produit', 'product'), query},
        asPath,
        {locale: e.value}
      )
    }

    router.push({pathname, query}, asPath, {locale: e.value})
  }

  // Country flags render
  const formatOptionLabel = ({label, value}) => (
    <div className={styles.formatOptionLabel}>
      {value == en_us_value ? (
        <img src="/images/USA.png" alt="USA" />
      ) : value == en_gb_value ? (
        <img src="/images/UK.png" alt="UK" />
      ) : value == fr_value ? (
        <img src="/images/France.png" alt="France" />
      ) : (
        ''
      )}
      <div className={styles.label}>{label}</div>
    </div>
  )

  // Custom styles for select
  const customStyles = {
    option: (provided, {isSelected}) => ({
      ...provided,
      color: '#ffffff',
      backgroundColor: isSelected ? '#3BAEFA' : '#064772',
      padding: '10px',
      margin: 0,
      borderRadius: 0,
      boxShadow: '0px 2px 30px rgba(0, 0, 0, 0.2)',
      ':hover': {
        background: '#3BAEFA'
      }
    }),
    menuList: () => ({
      background: '#064772'
    }),
    control: (provided) => ({
      ...provided,
      border: 'none',
      background: '#064772',
      borderRadius: 0,
      boxShadow: 'none'
    })
  }

  return (
    <>
      <div className={cn(styles.container, className)}>
        <Select
          instanceId={'selectLocale'}
          components={{DropdownIndicator, IndicatorSeparator: () => null}}
          value={selectedLocal}
          defaultValue={selectedLocal}
          formatOptionLabel={formatOptionLabel}
          styles={customStyles}
          isSearchable={false}
          options={locales}
          onChange={(e) => changeLang(e)}
        />
      </div>
    </>
  )
}

// Custom Dropdown Indicator (up/down arrows)
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <div className={styles.arrowContainer}>
          <IconArrow className={styles.arrowDown} />
        </div>
      ) : (
        <div className={styles.arrowContainer}>
          <IconArrow className={styles.arrowUp} />
        </div>
      )}
    </components.DropdownIndicator>
  )
}

LanguageSelect.propTypes = {
  className: PropTypes.string
}
