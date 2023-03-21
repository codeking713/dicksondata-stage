import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import { AppContext } from '@/components/context/AppContext'
import Address from '@/components/molecules/Checkout/Address'
import OrderDetails from '@/components/molecules/Checkout/OrderDetails'
import OrderReceivedSkeleton from '@/components/molecules/Checkout/Skeleton/OrderReceivedSkeleton'
import { displayStatus, getFormattedOrder } from '@/functions/checkout/orderUtil'
import getSingleOrderDetails from '@/functions/wordpress/customer/getSingleOrderDetails'
import { useSession } from 'next-auth/client'
import Router from 'next/router'
import { PropTypes } from 'prop-types'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import Moment from 'react-moment'
import styles from './OrderReceived.module.scss'
import orderReceivedReducer from './OrderReceivedReducer'

/**
 * Render the OrderReceived component.
 *
 * @return {Element} The OrderReceived component.
 */
const OrderReceived = () => {
  const initialState = {
    order: undefined,
    isLoading: true
  }

  const orderId = process.browser ? Router.query.id : null
  const [state, dispatcher] = useReducer(orderReceivedReducer, initialState)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [session] = useSession()
  const [, setCart] = useContext(AppContext)

  useEffect(() => {
    //Fail safe - clear the cart if its not already cleared
    setCart(null)
    localStorage.removeItem('woo-next-cart')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsLoggedIn(
      session != null && session?.user != null && session?.user?.email != null
    )
  }, [session])

  useEffect(() => {
    /**
     * Invoke Get Order Action
     */
    async function invokeGetOrderAction() {
      if (orderId !== 'undefined' && orderId !== '' && Number(orderId)) {
        const response = await getSingleOrderDetails(
          session?.user?.accessToken,
          Number(orderId)
        )
        if (response.error) {
          alert(response.errorMessage)
          dispatcher({
            type: 'order',
            payload: null
          })
        } else {
          let orderNode = response.data?.customer?.orders?.edges?.find(
            (edge) => {
              return edge.node.orderNumber === orderId
            }
          )

          if (orderNode) {
            let formatedOrderData = getFormattedOrder(orderNode.node)
            dispatcher({
              type: 'order',
              payload: formatedOrderData
            })
          } else {
            dispatcher({
              type: 'order',
              payload: null
            })
          }
        }
      } else {
        dispatcher({
          type: 'order',
          payload: null
        })
      }

      dispatcher({
        type: 'isLoading',
        payload: false
      })
    }

    if (orderId) invokeGetOrderAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])

  const renderHeader = (message, icon, type) => {
    return (
      <>
        <Icon
          className={`${styles.section__confirmation__header__icon} ${
            styles[`section__confirmation__header__icon--${type}`]
          }`}
          icon={icon}
          size="lg"
          title="Info"
        />
        <div className={styles.section__confirmation__header__message}>
          {message}
        </div>
      </>
    )
  }

  return (
    <section className={styles.section}>
      <Container>
        <div
          className={`${styles.section__confirmation} ${styles['grid']} ${styles['gap-sm']}`}
        >
          {state.isLoading ? (
            <OrderReceivedSkeleton />
          ) : (
            <>
              {state.order === null && (
                <div
                  className={`${styles['col-12']} ${styles.section__confirmation__header}`}
                >
                  {renderHeader('Order not found', 'info', 'warning')}
                </div>
              )}
              {state.order !== null && (
                <>
                  <div
                    className={`${styles['col-12']} ${styles.section__confirmation__header}`}
                  >
                    {(state.order?.status === 'PENDING' ||
                      state.order?.status === 'ON_HOLD') &&
                      renderHeader(
                        <>
                          <div
                            className={
                              styles.section__confirmation__header__heading
                            }
                          >
                            Thank you! Your order is created.
                          </div>
                          <div
                            className={
                              styles.section__confirmation__header__subheading
                            }
                          >
                            <span>Order number is </span>
                            <span
                              className={
                                styles[
                                  'section__confirmation__header__subheading--order'
                                ]
                              }
                            >
                              {state.order?.orderNumber}
                            </span>
                          </div>
                          <div
                            className={
                              styles.section__confirmation__header__description
                            }
                          >
                            <span>
                              Your order is currently in{' '}
                              {displayStatus(state.order?.status)} state.
                            </span>
                          </div>
                        </>,
                        'info',
                        'warning'
                      )}
                    {state.order?.status === 'PROCESSING' &&
                      renderHeader(
                        <>
                          <div
                            className={
                              styles.section__confirmation__header__heading
                            }
                          >
                            Thank you! Your order is confirmed.
                          </div>
                          <div
                            className={
                              styles.section__confirmation__header__subheading
                            }
                          >
                            <span>Your order number is </span>
                            <span
                              className={
                                styles[
                                  'section__confirmation__header__subheading--order'
                                ]
                              }
                            >
                              {state.order?.orderNumber}
                            </span>
                          </div>
                          <div
                            className={
                              styles.section__confirmation__header__description
                            }
                          >
                            <span>
                              We sent an order confirmation message to{' '}
                            </span>
                            <span
                              className={
                                styles[
                                  'section__confirmation__header__description--email'
                                ]
                              }
                            >
                              {state.order?.billing.email}
                            </span>
                            <span> with the details of your order</span>
                          </div>
                        </>,
                        'checkmarkCircle',
                        'success'
                      )}
                  </div>
                  <div
                    className={`${styles['col-12@sm']} ${styles['col-4@md']} ${styles.section__confirmation__address}`}
                  >
                    {state.order?.hasShippingAddress && (
                      <Address
                        {...state.order?.shipping}
                        heading="Shipping Address"
                        addressClassName={
                          styles.section__confirmation__address__item
                        }
                      />
                    )}
                  </div>
                  <div
                    className={`${styles['col-12@sm']} ${styles['col-4@md']} ${styles.section__confirmation__address}`}
                  >
                    {state.order?.hasBillingAddress && (
                      <Address
                        {...state.order?.billing}
                        heading="Billing Address"
                        addressClassName={
                          styles.section__confirmation__address__item
                        }
                      />
                    )}
                  </div>
                  <div
                    className={`${styles['col-12@sm']} ${styles['col-4@md']} ${styles.section__confirmation__order}`}
                  >
                    <div
                      className={styles.section__confirmation__order__header}
                    >
                      Payment Details
                    </div>
                    <div className={styles.section__confirmation__order__lines}>
                      <div>
                        <span>Date: </span>
                        <span
                          className={
                            styles.section__confirmation__order__lines__value
                          }
                        >
                          <Moment format="YYYY MMMM DD">
                            {state.order?.date}
                          </Moment>
                        </span>
                      </div>
                      <div>
                        <span>Payment method: </span>
                        <span
                          className={
                            styles.section__confirmation__order__lines__value
                          }
                        >
                          {state.order?.paymentMethodTitle}
                        </span>
                      </div>
                      {state.order?.poNumber && (
                        <div>
                          <span>PO Number: </span>
                          <span
                            className={
                              styles.section__confirmation__order__lines__value
                            }
                          >
                            {state.order?.poNumber}
                          </span>
                        </div>
                      )}
                      {state.order?.customerNumber && (
                        <div>
                          <span>Customer Number: </span>
                          <span
                            className={
                              styles.section__confirmation__order__lines__value
                            }
                          >
                            {state.order?.customerNumber}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`${styles['col-12']}`}>
                    <OrderDetails order={state.order} />
                  </div>
                  <div className={styles.section__confirmation__cta}>
                    {isLoggedIn && (
                      <Button
                        className={styles.section__confirmation__cta__primary}
                        size="sm"
                        type="primary"
                        text="View order details"
                        url={`/my-account/orders/${state.order?.orderNumber}`}
                        y
                      />
                    )}
                    <Button
                      className={styles.section__confirmation__cta__secondary}
                      size="sm"
                      type="ghost"
                      text="Continue Shopping"
                      url="/products"
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  )
}

OrderReceived.propTypes = {
  lastOrder: PropTypes.any,
  isDataLoading: PropTypes.bool
}

export default OrderReceived
