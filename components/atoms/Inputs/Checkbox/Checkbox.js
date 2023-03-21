import {Field} from 'formik'
import PropTypes from 'prop-types'
import styles from './Checkbox.module.scss'

/**
 * Render Checkbox component.
 *
 * @param  {object}        props           The component attributes as props.
 * @param  {string}        props.className Input className.
 * @param  {string|number} props.id        Input id.
 * @param  {any}           props.label     Input label.
 * @param  {string}        props.name      Input name.
 * @param  {string|number} props.value     Input value.
 * @param  {Function}      props.onChange  Checkbox change event
 * @param  {boolean}       props.checked   Checkbox is Checked
 * @param  {boolean}       props.disabled  Disable field
 * @return {Element}                       The Checkbox component.
 */
export default function Checkbox({
  className,
  id,
  label,
  name,
  value,
  onChange,
  checked,
  disabled
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className={styles.field}>
          <Field
            id={id}
            name={name}
            type="checkbox"
            value={value || name}
            checked={checked}
            onChange={onChange}
            className={styles.field__checkbox}
            disabled={disabled}
          />
          {label}
        </label>
      )}
    </div>
  )
}

Checkbox.propTypes = {
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool
}
