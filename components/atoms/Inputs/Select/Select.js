import classNames from 'classnames'
import {ErrorMessage, Field} from 'formik'
import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from 'react'
import styles from './Select.module.scss'

/**
 * Render the Select component.
 *
 * @author DAP
 * @param  {object}   props                                The component attributes as props.
 * @param  {string}   props.className                      Select wrapper className.
 * @param  {string}   props.description                    Select description.
 * @param  {string}   props.label                          Select input label.
 * @param  {string}   props.id                             Select input id.
 * @param  {boolean}  props.isRequired                     If input is required.
 * @param  {Array}    props.options                        Array of input options objects.
 * @param  {boolean}  props.isDark                         If input is on dark background
 * @param  {string}   props.defaultValue                   Default selected option
 * @param  {string}   props.placeholderText                Text for the placeholder
 * @param  {boolean}  props.addEmptyPlaceholderAsFirstItem Indicator whether to add a empty placeholder as the first item on the dropdown
 * @param  {Function} props.getValue                       Fetch value from the Select handleChange funtion (Pass useState)
 * @param  {string}   props.optionalLabel                  Optional label - translations
 * @return {Element}                                       The Select component.
 */
export default function Select({
  className,
  description,
  id,
  isRequired,
  label,
  options,
  isDark,
  defaultValue,
  addEmptyPlaceholderAsFirstItem,
  placeholderText,
  getValue,
  optionalLabel
}) {
  const [hasValue, setHasValue] = useState(false)
  const fieldRef = useRef()

  useEffect(() => {
    if (!!options?.length > 0 || defaultValue) {
      if (fieldRef.current.value.trim() !== '' || defaultValue) {
        setHasValue(true)
      } else {
        setHasValue(false)
      }
    }
  }, [options, defaultValue])

  const inputgrpClassNames = classNames(className, styles.inputgrp, {
    [styles['inputgrp--dark']]: isDark
  })

  const selectClassNames = classNames(className, styles.inputgrp__main__input, {
    [styles['inputgrp__main__input--hasvalue']]: hasValue
  })

  const handleChange = (e) => {
    getValue && getValue(e.target.value)
    if (e?.target?.value.trim() !== '') {
      setHasValue(true)
    } else {
      setHasValue(false)
    }
  }

  return (
    <div className={inputgrpClassNames} data-element="select">
      <div className={styles.inputgrp__main}>
        <Field
          as="select"
          id={id}
          name={id}
          className={selectClassNames}
          required={isRequired}
          onChange={(e) => handleChange(e)}
          innerRef={fieldRef}
          defaultValue={defaultValue}
        >
          {addEmptyPlaceholderAsFirstItem && <option>{placeholderText}</option>}
          {!!options?.length > 0 &&
            options.map((option, key) => {
              const {text, value, isSelected, label} = option

              return (
                <option
                  key={key}
                  value={value}
                  label={label}
                  selected={!defaultValue && isSelected}
                >
                  {text}
                </option>
              )
            })}
        </Field>
        {label && (
          <label
            className={styles.inputgrp__main__label}
            htmlFor={id}
            required={isRequired}
          >
            {label}
            {isRequired && (
              <span className={styles.inputgrp__main__label__asterisk}>*</span>
            )}
            {!isRequired && (
              <> ({optionalLabel ? optionalLabel : 'Optional'})</>
            )}
          </label>
        )}
      </div>
      {description && (
        <p className={styles.inputgrp__description}>{description}</p>
      )}
      <ErrorMessage name={id} />
    </div>
  )
}

Select.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholderText: PropTypes.string
}

Select.defaultProps = {
  isRequired: false,
  addEmptyPlaceholderAsFirstItem: true,
  placeholderText: ''
}
