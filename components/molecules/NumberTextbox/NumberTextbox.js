import Icon from '@/components/atoms/Icon'
import {getTranslation} from '@/functions/utility'
import {useWordPressContext} from 'components/common/WordPressProvider'
import PropTypes from 'prop-types'
import React, {useState, useEffect} from 'react'
import styles from './NumberTextbox.module.scss'

/**
 * Render the NumberTextbox component.
 *
 * @param  {object}   props                 NumberTextbox component props.
 * @param  {number}   props.value           Textbox value
 * @param  {Function} props.handleQtyChange Text input change event handler
 * @param  {number}   props.min             Min textbox value
 * @param  {string}   props.id              Textbox id
 * @param  {string}   props.className       Override style
 * @param  {boolean}  props.disabled        Enable/Disable the component for data entry
 * @param  {number}   props.max             Max taxtbox value
 * @return {Element}                        The NumberTextbox component.
 */
export default function NumberTextbox({
  value,
  handleQtyChange,
  id,
  min,
  max,
  className,
  disabled
}) {
  const [currentValue, setCurrentValue] = useState(value)
  const {headlessConfig} = useWordPressContext()

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const handleIncrement = () => {
    if (currentValue + 1 <= max) {
      setCurrentValue(currentValue + 1)
      handleQtyChange(currentValue + 1, id)
    } else {
      setCurrentValue(currentValue)
    }
  }

  const handleDecrement = () => {
    if (currentValue > min) {
      setCurrentValue(currentValue - 1)
      handleQtyChange(currentValue - 1, id)
    } else setCurrentValue(currentValue)
  }

  const handleQtyChangeEvent = (event) => {
    const newQty = event.target.value ? parseInt(event.target.value) : min
    if (newQty >= min && newQty <= max) {
      setCurrentValue(newQty)
      handleQtyChange(newQty, id)
    } else setCurrentValue(currentValue)
  }

  return (
    <div className={`${styles.section} ${className}`}>
      <button
        className={`${styles.section__button} ${
          disabled && styles['section__button--hide']
        }`}
        onClick={() => handleDecrement()}
        disabled={disabled}
      >
        <Icon
          title={getTranslation(headlessConfig, 'DECREASE')}
          icon="minusCircle"
          className={styles.section__button__icon}
        />
      </button>
      <input
        type="number"
        min={min}
        max={max}
        key={id}
        className={styles.section__textbox}
        value={currentValue}
        onChange={() => handleQtyChangeEvent(event)}
        disabled={disabled}
      />
      <button
        className={`${styles.section__button} ${
          disabled && styles['section__button--hide']
        }`}
        onClick={() => handleIncrement()}
        disabled={disabled}
      >
        <Icon
          title={getTranslation(headlessConfig, 'INCREASE')}
          icon="plusCircle"
          className={styles.section__button__icon}
        />
      </button>
    </div>
  )
}

NumberTextbox.propTypes = {
  value: PropTypes.number,
  handleQtyChange: PropTypes.func,
  id: PropTypes.string,
  min: PropTypes.number,
  className: PropTypes.string,
  disabled: PropTypes.bool
}

NumberTextbox.defaultProps = {
  min: 1,
  value: 1,
  disabled: false
}
