import ProfileOrderSummary from '@/components/organisms/ProfileOrderSummary'
import {displayStatus} from '@/functions/checkout/orderUtil'
import styles from './ProfileOrderDetails.module.scss'

/**
 * @param  {object}  props           Component props
 * @param  {object}  props.orderData Order data
 * @return {Element}                 The ProfileOrderDetails component.
 */
export default function ProfileOrderDetails({orderData}) {
  const date = new Date(orderData?.date)

  return (
    <div>
      <p className={styles.note}>
        Order no. {orderData.orderNumber} was placed on{' '}
        {`${date?.toLocaleString('default', {
          month: 'long'
        })} ${date?.getDate()}, ${date?.getFullYear()}`}{' '}
        and currently <b>{displayStatus(orderData.status)}</b>
      </p>
      <ProfileOrderSummary
        header="Order details"
        orderData={orderData}
      ></ProfileOrderSummary>
      {/* <div className={styles.container__btn}>
        <Button
          className={styles['container__btn--white']}
          text={orderData.status == 'COMPLETED' ? 'Order again' : 'Order'}
        />
      </div> */}
      <div className={styles.container}>
        <div className={styles.container__header}>Billing address</div>
        <div className={styles.container__copy}>
          <div>
            {orderData?.billing.firstName} {orderData?.billing.lastName}
          </div>
          <div>{orderData?.billing.address1}</div>
          <div>{orderData?.billing.state}</div>
        </div>
      </div>
    </div>
  )
}
