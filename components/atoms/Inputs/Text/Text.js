import InputError from '@/components/atoms/Inputs/InputError'
import classNames from 'classnames'
import {Field} from 'formik'
import PropTypes from 'prop-types'
import styles from './Text.module.scss'

/**
 * Render the Text component.
 *
 * @author DAP
 * @param  {object}   props               The component attributes as props.
 * @param  {string}   props.className     Text wrapper className.
 * @param  {string}   props.description   Text description.
 * @param  {string}   props.id            Text input id.
 * @param  {string}   props.label         Text input label.
 * @param  {boolean}  props.isRequired    If input is required.
 * @param  {string}   props.type          Text input type.
 * @param  {boolean}  props.isDisabled    If input is diabled
 * @param  {boolean}  props.isDark        If input is on dark background
 * @param  {string}   props.optionalLabel Optional label
 * @param  {Function} props.getDomElement The underlying DOM node created by Field
 * @return {Element}                      The Text component.
 */
export default function Text({
  className,
  description,
  id,
  isRequired,
  label,
  type,
  isDisabled,
  getDomElement,
  isDark,
  optionalLabel
}) {
  const inputClassNames = classNames(className, styles.inputgrp, {
    [styles['inputgrp--dark']]: isDark
  })

  return (
    <div className={inputClassNames} data-element="input">
      <div className={styles.inputgrp__main}>
        <Field
          aria-required={isRequired}
          id={id}
          name={id}
          innerRef={getDomElement}
          required={isRequired}
          type={type}
          disabled={isDisabled}
          className={styles.inputgrp__main__input}
        />
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
            {!isRequired && <> ({optionalLabel})</>}
          </label>
        )}
      </div>
      {description && (
        <p className={styles.inputgrp__description}>{description}</p>
      )}
      <InputError name={id} />
    </div>
  )
}

Text.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isDark: PropTypes.bool,
  getDomElement: PropTypes.func
}

Text.defaultProps = {
  isRequired: false,
  isDisabled: false,
  isDark: false,
  optionalLabel: 'Optional'
}
