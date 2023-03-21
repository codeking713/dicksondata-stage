import {Field} from 'formik'
import PropTypes from 'prop-types'
import styles from './Radio.module.scss'

/**
 * Render Radio component.
 *
 * @param  {object}         props           The component attributes as props.
 * @param  {string}         props.className Input className.
 * @param  {string|number}  props.id        Input id.
 * @param  {string|Element} props.label     Input label.
 * @param  {string}         props.name      Input name.
 * @param  {string}         props.value     Input value.
 * @param  {Function}       props.onChange  Radio change event
 * @param  {boolean}        props.checked   Indicate if the radio is checked
 * @param  {string}         props.align     Alignment of the radio button
 * @return {Element}                        The Radio component.
 */
export default function Radio({
  className,
  id,
  label,
  name,
  value,
  onChange,
  checked,
  align
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className={`${styles.field} ${
            align == 'right' && styles['field--right']
          }`}
        >
          {align == 'right' && label}
          <Field
            id={id}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className={styles.field__radio}
          />
          {align == 'left' && label}
        </label>
      )}
    </div>
  )
}

Radio.defaultProps = {
  align: 'left'
}

Radio.propTypes = {
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'right'])
}
