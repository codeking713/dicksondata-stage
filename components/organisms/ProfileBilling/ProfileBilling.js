import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import CustomerDetails from '@/components/molecules/Checkout/CustomerDetails'
import Form from '@/components/molecules/Form'
import getCountries from '@/functions/wordpress/common/getCountries'
import getStates from '@/functions/wordpress/common/getStates'
import getCustomerInfo from '@/functions/wordpress/profile/getCustomerInfo'
import updateCustomerBilling from '@/functions/wordpress/profile/updateCustomerBilling'
import {useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import styles from './ProfileBilling.module.scss'
/**
 * Render the ProfileBilling component.
 *
 * @author DAP
 * @return {Element} The ProfileBilling component.
 */
export default function ProfileBilling() {
  const [session] = useSession()
  const [error, setError] = useState('')
  const router = useRouter()

  /**
   * Fetch customer's billing data
   */
  useEffect(
    () =>
      (async () => {
        await getCustomerInfo(session?.user.accessToken, session?.user.id).then(
          (response) => {
            if (response?.data?.customer) {
              setInput(response.data.customer.billing)
              setSelectedCountry(response.data.customer.billing.country)
            }
          }
        )
      })(),
    [session]
  )
  const [input, setInput] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(input?.country)

  /* Fetch Countries */
  useEffect(
    () =>
      (async () => {
        const list = await getCountries(session?.user?.id)
        setCountries(list?.data?.wooCountries?.billingCountries)
      })(),
    [session?.user?.id]
  )
  const [countries, setCountries] = useState('')

  /* Fetch States */
  useEffect(
    () =>
      (async () => {
        setIsFetchingStates(true)
        const list = await getStates(selectedCountry)
        setStates(list?.data?.wooStates?.states)
        setIsFetchingStates(false)
      })(),
    [selectedCountry]
  )
  const [isFetchingStates, setIsFetchingStates] = useState(false)
  const [states, setStates] = useState('')

  const formDefaults = () => {
    let newFormDefaults = {}
    for (let s in input) {
      newFormDefaults['billing_' + s] = input[s] != null ? input[s] : ''
    }
    return newFormDefaults
  }

  const handleOnChange = async (event) => {
    const {target} = event || {}
    if ('billing_country' == target.name) {
      setInput({
        ...input,
        country: event.target.value
      })
      setSelectedCountry(event.target.value)
    } else {
      const fieldObj = target.name.split('_')

      if (fieldObj[0] == 'billing') {
        setInput({
          ...input,
          [fieldObj[1]]: event.target.value
        })
      }
    }
  }

  const handleSubmit = async ({
    billing_firstName,
    billing_lastName,
    billing_company,
    billing_address1,
    billing_address2,
    billing_postcode,
    billing_city,
    billing_country,
    billing_email,
    billing_state,
    billing_phone
  }) => {
    setError('')
    const res = await updateCustomerBilling(
      session?.user.accessToken,
      session?.user.id,
      billing_firstName,
      billing_lastName,
      billing_company,
      billing_address1,
      billing_address2,
      billing_postcode,
      billing_city,
      billing_country,
      billing_email,
      billing_state,
      billing_phone
    )
    if (res.error) {
      setError(
        'Please make sure to fill all the required fields with valid information'
      )
    } else {
      router.push('/my-account/addresses')
    }
  }

  if (!input) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <span
          className={styles['container__header--style']}
          onClick={() => router.push('/my-account/addresses')}
        >
          <Icon size="md" icon="chevron" title="chevron" />
        </span>{' '}
        Billing address
      </div>
      <p className={styles.container__note}>
        Please note: taxes are estimates and may differ from what is billed
      </p>
      <Form
        formDefaults={formDefaults()}
        className={styles.container__form}
        showSubmitButton={false}
        onSubmit={handleSubmit}
        shouldEnableReinitialize={true}
        onChange={(event) => handleOnChange(event)}
      >
        {input && (
          <CustomerDetails
            input={input}
            type="billing"
            countries={countries}
            states={states}
            isFetchingStates={isFetchingStates}
            handleOnChange={(event) => handleOnChange(event)}
            isRequired={true}
            allowPlaceholderForCountrySelect={true}
            allowPlaceholderForStateSelect={true}
            countrySelectPlaceholderText="Select a Country"
            stateSelectPlaceholderText="Select a State"
            fieldClassName={styles['contianer__fields--margin']}
          />
        )}
        {error && (
          <div className={styles.container__error}>
            <Icon size="lg" title="info" icon="info" />{' '}
            <strong className={styles['container__error--margin']}>
              {error}
            </strong>
          </div>
        )}
        <Button
          className={styles['container__button--submit']}
          text="Save address"
          isSubmit={true}
        />
        <Button
          type="ghost"
          text="Cancel"
          onClick={() => router.push('/my-account/addresses')}
        />
      </Form>
    </div>
  )
}
