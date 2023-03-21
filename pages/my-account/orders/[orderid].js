import LayoutNew from '@/components/common/LayoutNew'
import PageNotifications from '@/components/molecules/PageNotifications'
import ProfileOrderDetails from '@/components/organisms/ProfileOrderDetails'
import ProfileOrderDetailsSkeleton from '@/components/organisms/ProfileOrderDetails/Skeleton'
import ProfileOrderPendingDetails from '@/components/organisms/ProfileOrderPendingDetails'
import UserAccount from '@/components/organisms/UserAccount'
import {getLangCode} from '@/functions/checkout/commonUtil'
import {getFormattedOrder} from '@/functions/checkout/orderUtil'
import {getText} from '@/functions/checkout/textUtil'
import getPagePropTypes from '@/functions/getPagePropTypes'
import getSingleOrderDetails from '@/functions/wordpress/customer/getSingleOrderDetails'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import {useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import styles from './orders.module.scss'

// Define route post type.
const postType = 'page'

/**
 * Render the Account Order Details component.
 *
 * @param  {object}  props      The component attributes as props.
 * @param  {object}  props.post Post data from WordPress.
 * @return {Element}            The Account Order Details component.
 */
export default function OrderDetails({post}) {
  const [order, setOrder] = useState(null)
  const [session] = useSession()
  const [loading, setLoader] = useState(true)
  const [checkoutFormNotification, setCheckoutFormNotification] = useState(null)
  const router = useRouter()
  const {orderid} = router.query
  const StatusList = ['COMPLETED', 'CANCELLED', 'PROCESSING', 'ON_HOLD']

  useEffect(
    () =>
      (async () => {
        await handleGetOrder()
      })(),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session]
  )

  const handleGetOrder = async () => {
    setLoader(true)
    if (orderid && Number(orderid)) {
      const data = await getSingleOrderDetails(
        session?.user.accessToken,
        Number(orderid)
      )

      if (data?.data?.customer?.orders?.edges?.length > 0) {
        var formattedOrder = getFormattedOrder(
          data?.data?.customer?.orders?.edges[0]?.node
        )
        setOrder(formattedOrder)
      }
    }
    setLoader(false)
  }

  const handleOrderUpdate = async (updated) => {
    if (updated) {
      setCheckoutFormNotification({
        type: 'SUCCESS',
        message: getText('CHECKOUT.ORDER_UPDATED'),
        open: true
      })
      await handleGetOrder()
    } else {
      setCheckoutFormNotification({
        type: 'ERROR',
        message: getText('CHECKOUT.ORDER_UPDATE_ERROR'),
        open: true
      })
    }
  }

  if (StatusList.includes(order?.status)) {
    return (
      <LayoutNew seo={{...post?.seo}}>
        <UserAccount>
          <PageNotifications
            {...checkoutFormNotification}
            closeNotification={() => setCheckoutFormNotification(null)}
            className={styles.notification}
          />
          <ProfileOrderDetails orderData={order} loading={loading} />
        </UserAccount>
      </LayoutNew>
    )
  }

  if (order?.status === 'PENDING') {
    return (
      <LayoutNew seo={{...post?.seo}}>
        <UserAccount>
          <ProfileOrderPendingDetails
            orderData={order}
            notifyOrderUpdate={handleOrderUpdate}
          />
        </UserAccount>
      </LayoutNew>
    )
  }

  if (loading)
    return (
      <LayoutNew seo={{...post?.seo}}>
        <UserAccount>
          <ProfileOrderDetailsSkeleton />
        </UserAccount>
      </LayoutNew>
    )

  return (
    <LayoutNew seo={{...post?.seo}}>
      <UserAccount>Invalid Order</UserAccount>
    </LayoutNew>
  )
}

/**
 * Get post static props.
 *
 * @author DAP
 * @param  {object} context        Context for current post.
 * @param  {string} context.locale Locale
 * @return {object}                Post props.
 */
export async function getStaticProps({locale}) {
  return await getPostTypeStaticProps(
    null,
    'myAccount',
    false,
    null,
    getLangCode(locale)
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

OrderDetails.propTypes = {
  ...getPagePropTypes(postType)
}
