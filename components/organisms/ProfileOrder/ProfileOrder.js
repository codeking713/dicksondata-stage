import Icon from '@/components/atoms/Icon'
import PageNotifications from '@/components/molecules/PageNotifications'
import {displayStatus} from '@/functions/checkout/orderUtil'
import getCustomerOrderDetails from '@/functions/wordpress/customer/getCustomerOrderDetails'
import {useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import styles from './ProfileOrder.module.scss'
import ProfileOrderSkeleton from './Skeleton/ProfileOrderSkeleton'

/**
 * Render the ProfileOrder component.
 *
 * @author DAP
 * @return {Element} The ProfileOrder component.
 */
export default function ProfileOrder() {
  const router = useRouter()
  const [data, setData] = useState(null)
  const [loading, setLoader] = useState(true)
  const [session] = useSession()

  useEffect(
    () =>
      (async () => {
        const data = await getCustomerOrderDetails(session?.user.accessToken)
        setData(data)
        setLoader(false)
      })(),
    [session]
  )

  const orders = data?.data?.customer?.orders?.edges || []

  if (loading) return <ProfileOrderSkeleton />

  return (
    <div className={styles.container}>
      {orders && orders.length ? (
        <table className={styles.table}>
          <thead>
            <tr className={styles.table__header}>
              <th scope="col">Order</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((element, index) => {
              const {status, total, date, orderNumber} = element?.node
              const newDateString = new Date(date)
              const items = element?.node?.lineItems?.nodes?.length
              return (
                <tr key={index}>
                  <td
                    data-label="Order"
                    onClick={() =>
                      router.push('/my-account/orders/' + orderNumber)
                    }
                    className={styles.table__link}
                  >
                    {orderNumber}
                  </td>
                  <td data-label="Date">{`${newDateString.toLocaleString(
                    'default',
                    {
                      month: 'long'
                    }
                  )} ${newDateString.getDate()}, ${newDateString.getFullYear()}`}</td>
                  <td data-label="Status">{displayStatus(status)}</td>
                  <td data-label="Total">
                    {total} for {items} items
                  </td>
                  <td data-label="Actions">
                    <span
                      onClick={() =>
                        router.push('/my-account/orders/' + orderNumber)
                      }
                    >
                      {element?.node?.status == 'PENDING' ? (
                        <>
                          <Icon title="fileText" style="line" icon="fileText" />
                          <Icon
                            title="creditCard"
                            style="line"
                            icon="creditCard"
                          />
                          <Icon
                            title="closeCircle"
                            style="line"
                            icon="closeCircle"
                          />
                        </>
                      ) : (
                        <Icon
                          title="Edit"
                          style="fill"
                          icon="editAlt"
                          className={styles.table__action}
                        />
                      )}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <PageNotifications
          message={'No orders have yet been placed with this account'}
          type="INFO"
          open={true}
        />
      )}
    </div>
  )
}
