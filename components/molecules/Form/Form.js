import cn from 'classnames'
import {Form as FormikForm, Formik} from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Form.module.scss'

/**
 * Render Form component.
 *
 * @param  {object}           props                          The component attributes as props.
 * @param  {Element|Function} props.children                 Form children elements.
 * @param  {string}           props.className                Form wrapper class.
 * @param  {object}           props.formDefaults             Formik default data.
 * @param  {string|number}    props.id                       Form id.
 * @param  {object}           props.validationSchema         Yup validation schema object.
 * @param  {Function}         props.onSubmit                 Function to execute when form is submitted
 * @param  {string}           props.buttonText               String to display on the button
 * @param  {boolean}          props.showSubmitButton         Indicate whether show the submit button
 * @param  {boolean}          props.shouldEnableReinitialize Should Formik reset the form when new initialValues change
 * @param  {Function}         props.onChange                 Form field on change
 * @return {Element}                                         The Form component.
 */
export default function Form({
  children,
  className,
  formDefaults,
  id,
  validationSchema,
  onSubmit,
  buttonText,
  showSubmitButton,
  shouldEnableReinitialize,
  onChange
}) {
  let formattedChildren = children
  if ('function' !== typeof children) {
    formattedChildren = () => children
  }

  return (
    <Formik
      initialValues={formDefaults}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={shouldEnableReinitialize}
    >
      {(formikProps) => (
        <FormikForm
          id={id}
          className={cn(styles.form, className)}
          onChange={onChange}
        >
          {formattedChildren(formikProps)}
          {showSubmitButton && (
            <button type="submit" className={styles.form__button}>
              {buttonText}
            </button>
          )}
        </FormikForm>
      )}
    </Formik>
  )
}

Form.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  formDefaults: PropTypes.object,
  id: PropTypes.string,
  validationSchema: PropTypes.object,
  onSubmit: PropTypes.func,
  isDisabled: PropTypes.bool,
  showSubmitButton: PropTypes.bool,
  shouldEnableReinitialize: PropTypes.bool,
  onChange: PropTypes.func
}

Form.defaultProps = {
  formDefaults: {},
  buttonText: 'Submit',
  showSubmitButton: true,
  shouldEnableReinitialize: false
}
