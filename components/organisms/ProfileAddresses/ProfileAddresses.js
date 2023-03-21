import Icon from '@/components/atoms/Icon'
import getCustomerInfo from '@/functions/wordpress/profile/getCustomerInfo'
import classNames from 'classnames'
import {isEqual, omit} from 'lodash'
import {useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import styles from './ProfileAddresses.module.scss'
import ProfileAddressesSkeleton from './Skeleton/ProfileAddresses'

/**
 * Render the ProfileAddresses component.
 *
 * @author DAP
 * @return {Element} The ProfileAddresses component.
 */
const ProfileAddresses = () => {
  const [session] = useSession()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const defaultCustomerInfo = {
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    postcode: '',
    city: '',
    country: '',
    email: '',
    state: '',
    phone: ''
  }

  const initialState = {
    billing: {
      ...defaultCustomerInfo
    },
    shipping: {
      ...defaultCustomerInfo
    }
  }

  const [input, setInput] = useState(initialState)

  /**
   * Fetch customer's shipping and billing data
   */
  useEffect(
    () =>
      (async () => {
        await getCustomerInfo(session?.user.accessToken, session?.user.id).then(
          (response) => {
            if (response?.data?.customer) {
              const newState = {
                billing: response.data.customer.billing,
                shipping: response.data.customer.shipping
              }
              setInput(newState)
              setLoading(false)
            }
          }
        )
      })(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    const clonedState = {
      billing: {...omit(input.billing, ['__typename', 'country', 'state'])},
      shipping: {...omit(input.shipping, ['__typename', 'country', 'state'])}
    }
    const clonedInitState = {
      billing: {...omit(initialState.billing, ['country', 'state'])},
      shipping: {...omit(initialState.shipping, ['country', 'state'])}
    }
    if (
      !isEqual(clonedState, clonedInitState) &&
      clonedState.billing.firstName !== null
    ) {
      setLoading(false)
    }
  }, [input, initialState.billing, initialState.shipping])

  if (loading) {
    return <ProfileAddressesSkeleton />
  }

  return (
    <div>
      <p className={styles.header}>
        The following addresses will be used on the checkout page by default
      </p>
      <div className={styles.section}>
        <div
          className={classNames(
            styles.container,
            !input?.billing && styles.container__copy__bg__color
          )}
        >
          <div className={styles.container__header}>
            Billing address{' '}
            <span
              className={styles.container__iconbtn}
              onClick={() => router.push('/my-account/addresses/billing')}
            >
              {input?.billing && input?.billing.firstName ? (
                <>
                  <Icon title="Edit" style="fill" icon="editAlt" /> Edit
                </>
              ) : (
                <>
                  <Icon title="Add" style="fill" icon="editAlt" /> Add
                </>
              )}
            </span>
          </div>
          <div
            className={classNames(
              styles.container__copy,
              !input?.billing && styles.container__copy__bg__color
            )}
          >
            {input?.billing && input?.billing?.firstName ? (
              <>
                <div>
                  <strong>Full Name: </strong> {input?.billing?.firstName}{' '}
                  {input?.billing?.lastName}
                </div>
                <div>
                  <strong>Company: </strong> {input?.billing?.company}
                </div>
                <div>
                  <strong>Address 1: </strong> {input?.billing?.address1}
                </div>
                <div>
                  <strong>Address 2: </strong> {input?.billing?.address2}
                </div>
                <div>
                  <strong>Post Code: </strong> {input?.billing?.postcode}
                </div>
                <div>
                  <strong>City: </strong> {input?.billing?.city}
                </div>
                <div>
                  <strong>Country: </strong> {input?.billing?.country}
                </div>
                <div>
                  <strong>Email: </strong> {input?.billing?.email}
                </div>
                <div>
                  <strong>Phone: </strong> {input?.billing?.phone}
                </div>
                <div>
                  <strong>State: </strong>
                  {input?.billing?.state}
                </div>
              </>
            ) : (
              <div>No Address on File</div>
            )}
          </div>
        </div>
        <div
          className={classNames(
            styles.container,
            !input?.shipping && styles.container__copy__bg__color
          )}
        >
          <div className={styles.container__header}>
            Shipping address{' '}
            <span
              className={styles.container__iconbtn}
              onClick={() => router.push('/my-account/addresses/shipping')}
            >
              {input?.shipping && input?.shipping.firstName ? (
                <>
                  <Icon title="Edit" style="fill" icon="editAlt" /> Edit
                </>
              ) : (
                <>
                  <Icon title="Add" style="fill" icon="editAlt" /> Add
                </>
              )}
            </span>
          </div>
          <div className={styles.container__copy}>
            {input?.shipping && input?.shipping?.firstName ? (
              <>
                <div>
                  <strong>Full Name: </strong> {input?.shipping?.firstName}{' '}
                  {input?.shipping?.lastName}
                </div>
                <div>
                  <strong>Company: </strong> {input?.shipping?.company}
                </div>
                <div>
                  <strong>Address 1: </strong> {input?.shipping?.address1}
                </div>
                <div>
                  <strong>Address 2: </strong> {input?.shipping?.address2}
                </div>
                <div>
                  <strong>Post Code: </strong> {input?.shipping?.postcode}
                </div>
                <div>
                  <strong>City: </strong> {input?.shipping?.city}
                </div>
                <div>
                  <strong>Country: </strong> {input?.shipping?.country}
                </div>
                <div>
                  <strong>Phone: </strong> {input?.shipping?.phone}
                </div>
                <div>
                  <strong>State: </strong>
                  {input?.shipping?.state}
                </div>
              </>
            ) : (
              <>
                <div>No Address on File</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileAddresses
