import PropTypes from 'prop-types'
import React from 'react'
import styles from './ProductAddonPrice.module.scss'

/**
 * Render the ProductAddonPrice component.
 *
 * @param  {object}  props          ProductAddonPrice component props.
 * @param  {Array}   props.addons   Addons
 * @param  {number}  props.quantity Quantity
 * @param  {string}  props.currency Currency
 * @param  {number}  props.price    Price
 * @param  {string}  props.type     Type
 * @return {Element}                The ProductAddonPrice component.
 */
export default function ProductAddonPrice({
  addons,
  quantity,
  price,
  currency,
  type
}) {
  const renderProductAddonPrice = () => {
    return addons.map((addon) => {
      if (type === 'ORDER') {
        return <div className={styles.addons__addon}>{addon.name}</div>
      } else {
        if (addon.price_type === 'percentage_based') {
          let addonPricePerUnit = Number(Number(addon.price) / 100) * price
          return (
            <div className={styles.addons__addon}>{`${
              addon.name
            } (${currency}${addonPricePerUnit.toFixed(2)})`}</div>
          )
        } else if (addon.price_type === 'flat_fee') {
          let addonPricePerUnit = Number(addon.price) / quantity
          return (
            <div className={styles.addons__addon}>{`${
              addon.name
            } (${currency}${addonPricePerUnit.toFixed(2)})`}</div>
          )
        } else if (addon.price_type === 'quantity_based') {
          return (
            <div className={styles.addons__addon}>{`${
              addon.name
            } (${currency}${Number(addon.price).toFixed(2)})`}</div>
          )
        } else return ''
      }
    })
  }

  return <div className={styles.addons}>{renderProductAddonPrice()}</div>
}

ProductAddonPrice.propTypes = {
  regularPrice: PropTypes.string,
  regularPriceRaw: PropTypes.string,
  salePrice: PropTypes.string,
  priceRaw: PropTypes.string,
  onSale: PropTypes.bool
}
