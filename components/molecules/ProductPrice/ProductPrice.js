import Badge from '@/components/atoms/Badge'
import {getTranslation} from '@/functions/utility'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './ProductPrice.module.scss'

/**
 * Render the ProductPrice component.
 *
 * @param  {object}  props                 ProductPrice component props.
 * @param  {boolean} props.onSale          Is the product on sale
 * @param  {string}  props.price           Price with currency
 * @param  {number}  props.priceRaw        Price in numeric format
 * @param  {string}  props.regularPrice    Regular price of the product
 * @param  {number}  props.regularPriceRaw Regular Price in numeric format
 * @param  {string}  props.className       Override style class
 * @param  {string}  props.type            Type
 * @param  {object}  props.headlessConfig  Headless config data
 * @return {Element}                       The ProductPrice component.
 */
export default function ProductPrice({
  regularPrice,
  regularPriceRaw,
  price,
  priceRaw,
  onSale,
  className,
  type,
  headlessConfig
}) {
  const defPercent = (
    ((regularPriceRaw - priceRaw) / regularPriceRaw) *
    100
  ).toFixed(2)

  const doesPriceExist = () => {
    if (price !== null || typeof price !== 'undefined') {
      return true
    } else {
      return false
    }
  }

  return (
    <div className={className}>
      {!doesPriceExist() && <div></div>}
      {onSale &&
        price &&
        price !== null &&
        regularPrice &&
        price !== regularPrice && (
          <div className={styles.price__old}>{`${regularPrice}`}</div>
        )}
      <div className={styles.price__current}>
        {onSale && doesPriceExist() && (
          <div className={styles.price__current__number}>
            {type === 'BUNDLE' || type === 'COMPOSITE'
              ? `${getTranslation(headlessConfig, 'FROM')}: ${price}`
              : price}
          </div>
        )}
        {!onSale && doesPriceExist() && (
          <div className={styles.price__current__number}>
            {type === 'BUNDLE' || type === 'COMPOSITE'
              ? `${getTranslation(headlessConfig, 'FROM')}: ${price}`
              : price}
          </div>
        )}
        {onSale &&
          regularPrice &&
          price &&
          doesPriceExist() &&
          price !== regularPrice &&
          defPercent &&
          defPercent != 'NaN' && (
            <Badge
              vol={defPercent}
              discount={true}
              className={styles.price__current__badge}
            />
          )}
      </div>
    </div>
  )
}

ProductPrice.propTypes = {
  regularPrice: PropTypes.string,
  regularPriceRaw: PropTypes.string,
  salePrice: PropTypes.string,
  priceRaw: PropTypes.string,
  onSale: PropTypes.bool
}
