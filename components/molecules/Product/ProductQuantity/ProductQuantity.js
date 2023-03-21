import React, {useEffect, useState} from 'react'
import styles from './ProductQuantity.module.scss'

/**
 * Render the ProductQuantity component.
 *
 * @param  {object}   props                      ProductQuantity component props.
 * @param  {Function} props.handleQuantityUpdate Handle Quantity Update
 * @param  {number}   props.defaultQuantity      Default Quantity
 * @param  {number}   props.id                   ID
 * @param  {number}   props.quantityMin          Min Quantity
 * @param  {number}   props.quantityMax          Max Quantity
 * @return {Element}                             The ProductQuantity component.
 */
export default function ProductQuantity({
  id,
  quantityMin = 1,
  quantityMax = 999999,
  handleQuantityUpdate,
  defaultQuantity = 1
}) {
  const [quantity, setQuantity] = useState(defaultQuantity)
  const [quantityMinimum] = useState(quantityMin ? quantityMin : 1)
  const [quantityMaximum] = useState(quantityMax ? quantityMax : 999999)
  const [disabledIncrease, setDisabledIncrease] = useState(true)
  const [disabledDecrease, setDisabledDecrease] = useState(true)

  const handleQuantityDecrease = () => {
    if (quantity > quantityMinimum) {
      var roundedNumber = Math.floor(quantity - 1)
      setQuantity(roundedNumber)
      handleQuantityUpdate(roundedNumber, id)
    }
  }

  const handleQuantityIncrease = () => {
    if (quantity < quantityMaximum) {
      var roundedNumber = Math.floor(quantity + 1)
      setQuantity(roundedNumber)
      handleQuantityUpdate(roundedNumber, id)
    }
  }

  const handleQuantityChange = (newQuantity) => {
    var roundedNumber = Math.floor(newQuantity)
    if (roundedNumber >= quantityMinimum && roundedNumber <= quantityMaximum) {
      setQuantity(roundedNumber)
      handleQuantityUpdate(roundedNumber, id)
    }
  }

  useEffect(() => {
    setDisabledIncrease(Number(quantity) >= Number(quantityMaximum))
    setDisabledDecrease(Number(quantity) <= Number(quantityMinimum))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultQuantity])

  return (
    <div className={styles.summary__inner__top__qty}>
      <button
        className={`${styles.summary__inner__top__qty__minus} ${
          disabledDecrease && styles['summary__inner__top__qty--disabled']
        }`}
        onClick={() => handleQuantityDecrease()}
        disabled={disabledDecrease}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
        >
          <path
            d="M9.31817993,4 L0.681820074,4 C0.305454072,4 0,4.33600365 0,4.75001145 L0,5.24998855 C0,5.66399633 0.305454072,6 0.681820074,6 L9.31817993,6 C9.69454595,6 10,5.66399633 10,5.24998855 L10,4.75001145 C10,4.33600365 9.69454595,4 9.31817993,4 Z"
            transform="matrix(1 0 0 -1 0 10)"
          ></path>
        </svg>
      </button>
      <input
        type="number"
        className={styles.summary__inner__top__qty__amount}
        value={quantity}
        step="1"
        min={quantityMinimum}
        max={quantityMaximum}
        inputMode="numeric"
        onChange={(e) => handleQuantityChange(e.target.value)}
        disabled={disabledIncrease && disabledDecrease}
      />
      <button
        className={`${styles.summary__inner__top__qty__plus} ${
          disabledIncrease && styles['summary__inner__top__qty--disabled']
        }`}
        onClick={() => handleQuantityIncrease()}
        disabled={disabledIncrease}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
        >
          <path d="M9.10714286,4.10714286 L6.07142857,4.10714286 C5.97281319,4.10714286 5.89285714,4.02718681 5.89285714,3.92857143 L5.89285714,0.892857143 C5.89285714,0.399780268 5.49307687,0 5,0 C4.50692313,0 4.10714286,0.399780268 4.10714286,0.892857143 L4.10714286,3.92857143 C4.10714286,4.02718681 4.02718681,4.10714286 3.92857143,4.10714286 L0.892857143,4.10714286 C0.399780268,4.10714286 0,4.50692313 0,5 C0,5.49307687 0.399780268,5.89285714 0.892857143,5.89285714 L3.92857143,5.89285714 C4.02718681,5.89285714 4.10714286,5.97281319 4.10714286,6.07142857 L4.10714286,9.10714286 C4.10714286,9.60021973 4.50692313,10 5,10 C5.49307687,10 5.89285714,9.60021973 5.89285714,9.10714286 L5.89285714,6.07142857 C5.89285714,5.97281319 5.97281319,5.89285714 6.07142857,5.89285714 L9.10714286,5.89285714 C9.60021973,5.89285714 10,5.49307687 10,5 C10,4.50692313 9.60021973,4.10714286 9.10714286,4.10714286 Z"></path>
        </svg>
      </button>
    </div>
  )
}
