import Select from '@/components/atoms/Inputs/Select'
import Text from '@/components/atoms/Inputs/Text'
import {getFieldID} from '@/functions/checkout/checkoutUtil'
import cn from 'classnames'
import PropTypes from 'prop-types'
import styles from './CustomerDetails.module.scss'

/**
 * Render the CustomerDetails component.
 *
 * @param  {object}       props                                  CustomerDetails component props.
 * @param  {string}       props.type                             Type of the CustomerDetails
 * @param  {Array|string} props.countries                        List of countries
 * @param  {Array|string} props.states                           List of states
 * @param  {boolean}      props.isFetchingStates                 Fetching the states
 * @param  {boolean}      props.isRequired                       Field are required
 * @param  {boolean}      props.allowPlaceholderForCountrySelect Check for placeholder for Country Select
 * @param  {string}       props.countrySelectPlaceholderText     The Country select placeholder text
 * @param  {boolean}      props.allowPlaceholderForStateSelect   Check for placeholder for State Select
 * @param  {string}       props.stateSelectPlaceholderText       The State select placeholder text
 * @param  {boolean}      props.isShowPoNumber                   Show the PO number field
 * @param  {boolean}      props.isShowCustomerNumber             Show the customer number field
 * @param  {string}       props.fieldClassName                   Optional classNames for fields
 * @return {Element}                                             The CustomerDetails component.
 */
export default function CustomerDetails({
  type,
  countries,
  states,
  isFetchingStates,
  isRequired,
  allowPlaceholderForCountrySelect,
  countrySelectPlaceholderText,
  allowPlaceholderForStateSelect,
  stateSelectPlaceholderText,
  isShowPoNumber,
  isShowCustomerNumber,
  fieldClassName
}) {
  return (
    <div className={`${styles['grid']} ${styles['gap-sm']}`}>
      <div className={`${styles['col-6@md']}`}>
        <Text
          id={getFieldID('firstName', type)}
          className={cn(styles.billing__field, fieldClassName)}
          label="First Name"
          isRequired={isRequired}
          type="text"
        />
      </div>
      <div className={`${styles['col-6@md']}`}>
        <Text
          id={getFieldID('lastName', type)}
          className={cn(styles.field, fieldClassName)}
          label="Last Name"
          isRequired={isRequired}
          type="text"
        />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Text
          id={getFieldID('company', type)}
          className={cn(styles.field, fieldClassName)}
          label="Company"
          isRequired={isRequired}
          type="text"
        />
      </div>
      {countries && (
        <div className={`${styles['col-12@md']}`}>
          <Select
            id={getFieldID('country', type)}
            label="Country"
            isRequired={isRequired}
            name={getFieldID('country', type)}
            className={`${styles.field} ${styles.field__select} ${fieldClassName} `}
            options={countries.map((country) => ({
              text: country.countryName,
              value: country.countryCode
            }))}
            addEmptyPlaceholderAsFirstItem={allowPlaceholderForCountrySelect}
            placeholderText={countrySelectPlaceholderText}
          />
        </div>
      )}
      <div className={`${styles['col-12@md']}`}>
        <Text
          id={getFieldID('address1', type)}
          className={cn(styles.field, fieldClassName)}
          label="Complete Address 1"
          isRequired={isRequired}
          type="text"
        />
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Text
          id={getFieldID('address2', type)}
          className={cn(styles.field, fieldClassName)}
          label="Complete Address 2"
          type="text"
        />
      </div>
      <div className={styles['col-6@md']}>
        <Text
          id={getFieldID('city', type)}
          className={cn(styles.field, fieldClassName)}
          label="City/Town"
          isRequired={isRequired}
          type="text"
        />
      </div>
      <div className={`${styles['col-6@md']}`}>
        {states && states.length > 0 ? (
          <Select
            id={getFieldID('state', type)}
            name={getFieldID('state', type)}
            label="State/County"
            isDisabled={isFetchingStates}
            isRequired={isRequired}
            className={`${styles.field} ${styles.field__select} ${fieldClassName}`}
            options={states.map((state) => ({
              text: state.stateName,
              value: state.stateCode
            }))}
            placeholderText={stateSelectPlaceholderText}
            addEmptyPlaceholderAsFirstItem={allowPlaceholderForStateSelect}
          />
        ) : (
          <Text
            id={getFieldID('state', type)}
            className={cn(styles.field, fieldClassName)}
            label="State"
            isRequired={isRequired}
            type="text"
          />
        )}
      </div>
      <div className={`${styles['col-12@md']}`}>
        <Text
          id={getFieldID('postcode', type)}
          className={cn(styles.field, fieldClassName)}
          label="Postcode"
          isRequired={isRequired}
          type="text"
        />
      </div>
      {type == 'billing' && (
        <div className={`${styles['col-12@md']}`}>
          <Text
            id={getFieldID('phone', type)}
            className={cn(styles.field, fieldClassName)}
            label="Phone Number"
            isRequired={type == 'billing' ? isRequired : false}
            type="text"
          />
        </div>
      )}
      {type == 'billing' && (
        <div className={`${styles['col-12@md']}`}>
          <Text
            id={getFieldID('email', type)}
            className={cn(styles.field, fieldClassName)}
            label="Email address"
            isRequired
            type="text"
          />
        </div>
      )}
      {isShowPoNumber && (
        <div className={styles['col-6@md']}>
          <Text
            id={getFieldID('poNumber', 'payment')}
            className={styles.field}
            label="Purchase Order #"
            type="text"
          />
        </div>
      )}
      {isShowCustomerNumber && (
        <div className={styles['col-6@md']}>
          <Text
            id={getFieldID('customerNumber', 'payment')}
            className={styles.field}
            label="Customer Number"
            type="text"
          />
        </div>
      )}
    </div>
  )
}

CustomerDetails.propTypes = {
  type: PropTypes.oneOf(['billing', 'shipping']),
  countries: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  states: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isFetchingStates: PropTypes.bool,
  handleOnChange: PropTypes.func,
  input: PropTypes.object,
  isRequired: PropTypes.bool,
  allowPlaceholderForCountrySelect: PropTypes.bool,
  countrySelectPlaceholderText: PropTypes.string,
  allowPlaceholderForStateSelect: PropTypes.bool,
  stateSelectPlaceholderText: PropTypes.string,
  isShowPoNumber: PropTypes.bool,
  isShowCustomerNumber: PropTypes.bool,
  fieldClassName: PropTypes.string
}

CustomerDetails.defaultProps = {
  countrySelectPlaceholderText: '',
  stateSelectPlaceholderText: '',
  allowPlaceholderForCountrySelect: false,
  allowPlaceholderForStateSelect: false,
  isShowPoNumber: false,
  isShowCustomerNumber: false
}
