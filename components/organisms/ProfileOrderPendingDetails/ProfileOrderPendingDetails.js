import Button from '@/components/atoms/Button'
import {ModalContext} from '@/components/context/ModalContext'
import AcceptTermsConditions from '@/components/molecules/Checkout/AcceptTermsConditions'
import PaymentModes from '@/components/molecules/Checkout/PaymentModes'
import PayPal from '@/components/molecules/Checkout/PayPal'
import PrivacyPolicy from '@/components/molecules/Checkout/PrivacyPolicy'
import Form from '@/components/molecules/Form'
import PageNotifications from '@/components/molecules/PageNotifications'
import ProfileOrderDetailsSkeleton from '@/components/organisms/ProfileOrderDetails/Skeleton'
import ProfileOrderSummary from '@/components/organisms/ProfileOrderSummary'
import {
  isNull,
  updateCheckoutData,
  updateTheOrder
} from '@/functions/checkout/checkoutUtil'
import {getText} from '@/functions/checkout/textUtil'
import UPDATE_ORDER_MUTATION from '@/lib/next-api/wordpress/checkout/update-order'
import {useMutation} from '@apollo/client'
import {useContext, useState} from 'react'
import styles from './ProfileOrderPendingDetails.module.scss'

/**
 * @param  {object}   props                   Component props.
 * @param  {object}   props.orderData         Pending order data instance
 * @param  {Function} props.notifyOrderUpdate Notify pending order update
 * @return {Element}                          The ProfileOrderPendingDetails
 */
export default function ProfileOrderPendingDetails({
  orderData,
  notifyOrderUpdate
}) {
  const [order, setOrder] = useState(orderData)
  const [termConditionsAgreement, setTermConditionsAgreement] = useState(false)
  const [isCheckoutProcessing, setIsCheckoutProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('custom_po_gateway')
  const [checkoutFormNotification, setCheckoutFormNotification] = useState(null)
  const [updateTheOrderMutation] = useMutation(UPDATE_ORDER_MUTATION)
  const [
    setIsOpen,
    setModalContent,
    setContent,
    setIsCloseButtonVisible,
    setIsShouldCloseOnOverlayClick
  ] = useContext(ModalContext)

  const onSubmit = async () => {
    setCheckoutFormNotification(null)
    if (!termConditionsAgreement) {
      setCheckoutFormNotification({
        type: 'ERROR',
        message: getText('CHECKOUT.ACCEPT_TERMS_ERROR'),
        open: true
      })
      return
    }

    //Validations
    if (order?.products?.length == 0)
      setCheckoutFormNotification({
        type: 'ERROR',
        message: getText('CHECKOUT.EMPTY_ORDER'),
        open: true
      })

    //PayPal checkout flow
    if ('custom_paypal_gateway' === paymentMethod) {
      setModalContent('')
      setContent(
        <div className={styles.section__model}>
          <PayPal
            handleCheckout={handleCheckout}
            customerData={order}
            handleOrderUpdate={handleOrderUpdate}
            handleError={handlePaymentError}
          />
        </div>
      )
      setIsOpen(true)
    } else if ('custom_po_gateway' === paymentMethod) {
      var orderData = await handleCheckout(order)
      await handleOrderUpdate(
        Number(orderData.data.checkout.order.orderNumber),
        'ON_HOLD',
        false,
        order.customerNumber,
        order.poNumber
      )
        .then(() => {
          setCheckoutFormNotification({
            type: 'SUCCESS',
            message: getText('CHECKOUT.ORDER_UPDATED'),
            open: true
          })
          notifyOrderUpdate(orderData.data.checkout.order)
        })
        .catch(() => {
          setCheckoutFormNotification({
            type: 'ERROR',
            message: getText('CHECKOUT.ORDER_UPDATE_ERROR'),
            open: true
          })
        })
    } else {
      setCheckoutFormNotification({
        type: 'ERROR',
        message: getText('CHECKOUT.PAYMENT_TYPE_ERROR'),
        open: true
      })
    }
  }

  const handlePaymentError = (error) => {
    closeModel()
    setIsCheckoutProcessing(false)
    //This is the error returned from paypal action.order.create when the order create flow was abandoned due to a issue in the order or order validation failure
    //This means a order was not created, hence we do not need to show the payment failure message
    //At the moment we do not have a way to abandon the paypal order after triggering the actions.order.create function
    if (error !== 'Expected an order id to be passed') {
      //https://developer.paypal.com/docs/checkout/standard/customize/handle-errors/
      //Based on the paypal documentation we should not display the paypal error to the user, instead show a generic error.
      setCheckoutFormNotification({
        type: 'ERROR',
        message: getText('CHECKOUT.PAYPAL_GENERIC_ERROR'),
        open: true
      })
    }
  }

  const handleOnChange = async (event) => {
    const {target} = event || {}
    switch (target.name) {
      case 'agreeToTermsAndConditions':
        setTermConditionsAgreement(!termConditionsAgreement)
        break
      case 'payment_poNumber':
        setOrder({...order, poNumber: event.target.value})
        break
      case 'payment_customerNumber':
        setOrder({...order, customerNumber: event.target.value})
        break
      default:
        break
    }
  }

  const handleCheckout = async () => {
    setIsCheckoutProcessing(true)
    let customerOrder = {
      data: {
        checkout: {
          order: order
        }
      }
    }
    return customerOrder
  }

  const closeModel = () => {
    setIsCloseButtonVisible(true)
    setIsShouldCloseOnOverlayClick(true)
    setContent('')
    setIsOpen(false)
  }

  const handleOrderUpdate = async (
    orderId,
    nextStatus,
    isPaid = true,
    customerNumber,
    poNumber
  ) => {
    closeModel()
    setIsCheckoutProcessing(true) //Show checkout loading screen

    const checkOutData = updateCheckoutData(
      orderId,
      nextStatus,
      isPaid,
      customerNumber,
      poNumber
    )
    const updateCustomerOrder = await updateTheOrder(
      updateTheOrderMutation,
      checkOutData
    )
      .then(async (response) => {
        setOrder(response.updateOrder.order)
        notifyOrderUpdate(true)
      })
      .catch((error) => {
        notifyOrderUpdate(false)
        setCheckoutFormNotification({
          type: 'ERROR',
          message: getText('CHECKOUT.UPDATE_PAYMENT_ERROR'),
          open: true
        })
        console.error(error)
        setIsCheckoutProcessing(false)
      })
    return updateCustomerOrder
  }

  const formDefaults = () => {
    var newFormDefaults = {}
    newFormDefaults['payment_poNumber'] = !isNull(order?.poNumber)
      ? order.poNumber
      : ''
    newFormDefaults['payment_customerNumber'] = !isNull(order?.customerNumber)
      ? order.customerNumber
      : ''

    return newFormDefaults
  }

  return isCheckoutProcessing ? (
    <ProfileOrderDetailsSkeleton />
  ) : (
    <div className={styles.checkout}>
      <PageNotifications
        {...checkoutFormNotification}
        closeNotification={() => setCheckoutFormNotification(null)}
        className={styles.checkout__notification}
      />
      <ProfileOrderSummary orderData={order} header="Checkout" />
      <Form
        onSubmit={onSubmit}
        showSubmitButton={false}
        onChange={(event) => handleOnChange(event)}
        formDefaults={formDefaults()}
      >
        <div className={styles.checkout__payment}>
          <PaymentModes
            paymentMethod={paymentMethod}
            handleOnChange={(currentPaymentMethod) =>
              setPaymentMethod(currentPaymentMethod)
            }
            showPOFields={true}
            enablePaypal={false}
          />
        </div>
        <div className={styles.checkout__policy}>
          <PrivacyPolicy />
        </div>
        <div className={styles.checkout__terms}>
          <AcceptTermsConditions
            termConditionsAgreement={termConditionsAgreement}
            handleOnChange={handleOnChange}
          />
        </div>
        <div className={styles.checkout__btn}>
          <Button
            size="sm"
            isSubmit={true}
            text="Proceed to Checkout"
            disabled={!termConditionsAgreement || isCheckoutProcessing}
          />
        </div>
      </Form>
    </div>
  )
}
