import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Checkbox from '@/components/atoms/Inputs/Checkbox'
import Text from '@/components/atoms/Inputs/Text'
import {AppContext} from '@/components/context/AppContext'
import Accordion from '@/components/molecules/Accordion'
import AcceptTermsConditions from '@/components/molecules/Checkout/AcceptTermsConditions'
import Coupon from '@/components/molecules/Checkout/Coupon/ApplyCoupon'
import CustomerDetails from '@/components/molecules/Checkout/CustomerDetails'
import OrderSummary from '@/components/molecules/Checkout/OrderSummary'
import PaymentModes from '@/components/molecules/Checkout/PaymentModes'
import PrivacyPolicy from '@/components/molecules/Checkout/PrivacyPolicy'
import BillingDetailsSkeleton from '@/components/molecules/Checkout/Skeleton/BillingDetailsSkeleton'
import LoginCouponSkeleton from '@/components/molecules/Checkout/Skeleton/LoginCouponSkeleton'
import OrderSummarySkeleton from '@/components/molecules/Checkout/Skeleton/OrderSummarySkeleton'
import Form from '@/components/molecules/Form'
import PageNotifications from '@/components/molecules/PageNotifications'
import SectionHead from '@/components/molecules/SectionHead'
import Login from '@/components/organisms/Login'
import {clearTheCart} from '@/functions/checkout/cartUtil'
import {
  createTheOrder,
  getFormattedCart,
  isNull,
  transformCustomerData,
  validateAddressFields
} from '@/functions/checkout/checkoutUtil'
import {prepareTagManagerDataLayerObj} from '@/functions/checkout/commonUtil'
import {getText} from '@/functions/checkout/textUtil'
import getCountries from '@/functions/wordpress/common/getCountries'
import getStates from '@/functions/wordpress/common/getStates'
import getCustomerInfo from '@/functions/wordpress/profile/getCustomerInfo'
import CHECKOUT_MUTATION from '@/lib/next-api/wordpress/checkout/checkout'
import CHECKOUT_REVIEW from '@/lib/next-api/wordpress/checkout/checkout-review'
import CLEAR_CART_MUTATION from '@/lib/next-api/wordpress/checkout/clear-cart'
import {initializeWpApollo} from '@/lib/wordpress/connector'
import GET_CART from '@/lib/wordpress/_query-partials/getCart'
import {useMutation, useQuery} from '@apollo/client'
import {isEmpty} from 'lodash'
import debounce from 'lodash.debounce'
import {useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import {useCallback, useContext, useEffect, useReducer, useState} from 'react'
import TagManager from 'react-gtm-module'
import 'react-loading-skeleton/dist/skeleton.css'
import {v4} from 'uuid'
import {paypal_payflow_error_message} from '../../../constant'
import CHECKOUT_PAYFLOW_QUERY from '../../../lib/next-api/wordpress/checkout/checkout-payflow'
import styles from './Checkout.module.scss'
import customerInfoReducer from './customerInfoReducer'

/**
 * Render the Checkout component.
 *
 * @author DAP
 * @return {Element} The Checkout component.
 */
const Checkout = () => {
  const [termConditionsAgreement, setTermConditionsAgreement] = useState(false)
  const [checkoutFormNotification, setCheckoutFormNotification] = useState(null)
  const [checkoutCouponNotification, setCheckoutCouponNotification] =
    useState(null)
  const [cart, setCart] = useContext(AppContext)
  const [session, loading] = useSession()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isCheckoutProcessing, setIsCheckoutProcessing] = useState(false)
  const [order, setOrder] = useState(null)

  const apolloClient = initializeWpApollo()

  const [isFetchingShippingStates, setIsFetchingShippingStates] =
    useState(false)
  const [isFetchingBillingStates, setIsFetchingBillingStates] = useState(false)

  const initialState = {
    billing: null,
    shipping: null,
    poNumber: null,
    customerNumber: null,
    customerNote: null,
    shipToDifferentAddress: false,
    shippingMethods: null,
    //paymentMethod: 'custom_paypal_payflow_gateway'
    paymentMethod: 'custom_po_gateway' //Change to disable Paypal payments
  }

  //Meta data
  const [countries, setCountries] = useState()
  const [billingStates, setBillingStates] = useState()
  const [shippingStates, setShippingStates] = useState()
  const [createTheOrderMutation] = useMutation(CHECKOUT_MUTATION)
  const [state, dispatcher] = useReducer(customerInfoReducer, initialState)
  const [isCheckoutReviewProcessing, setIsCheckoutReviewProcessing] =
    useState(false)
  const [isCustomerInfoProcessing, setIsCustomerInfoProcessing] =
    useState(false)

  const [payFlowData, setPayFlowData] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [paypalPayFlowErrorMessage, setPaypalPayFlowErrorMessage] =
    useState(null)

  useEffect(() => {
    /**
     * Invoke Get Country Action
     */
    async function invokeGetCountryAction() {
      await getCountries()
        .then((response) => {
          setCountries(response.data.wooCountries)

          //Get states
          //We will only fetch the billing state. The shipping state can be fetched when the "ship to different address" is clicked
          if (state.billing?.country) {
            fetchStateData('billing', state.billing.country)
          }
        })
        .catch((error) => {
          setCheckoutFormNotification({
            type: 'ERROR',
            message: getText('CHECKOUT.GET_COUNTRY_ERROR'),
            open: true
          })
          console.error(error)
        })
    }
    //Step 1 - Call only once per page load
    invokeGetCountryAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsLoggedIn(
      session != null && session?.user != null && session?.user?.email != null
    )
  }, [session])

  useEffect(() => {
    /**
     * Invoke Checkout Complete
     */
    async function invokeCheckoutComplete() {
      //if (order && !paypalPayFlowErrorMessage && !isProcessing) {
      if (order && !isProcessing) {
        router
          .push(`/checkout/order-received/?id=${order.databaseId}`)
          .then(async () => {
            //With paypal, we need to manually clear the cart
            await clearTheCart(clearCartMutation)
              .then(() => {
                //clear the local storage and state
                localStorage.removeItem('woo-next-cart')
                setCart(null)
              })
              .catch((error) => {
                console.error(error)
                setCheckoutFormNotification({
                  type: 'ERROR',
                  message: getText('CHECKOUT.CLEAR_CART_ERROR'),
                  open: true
                })
              })
          })
      }
    }

    invokeCheckoutComplete()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //}, [order, paypalPayFlowErrorMessage, isProcessing])
  }, [order, isProcessing])

  const transformAddress = (address) => {
    return {
      address1: address.address1 ? address.address1 : '',
      address2: address.address2 ? address.address2 : '',
      city: address.city ? address.city : '',
      company: address.company ? address.company : '',
      country: address.country ? address.country : '',
      email: address.email ? address.email : '',
      firstName: address.firstName ? address.firstName : '',
      lastName: address.lastName ? address.lastName : '',
      phone: address.phone ? address.phone : '',
      postcode: address.postcode ? address.postcode : '',
      state: address.state ? address.state : '',
      intermediateCountry: address.country ? address.country : ''
    }
  }

  useEffect(() => {
    /**
     * Invoke Get Customer Info Action
     */
    async function invokeGetCustomerInfoAction() {
      setIsCustomerInfoProcessing(true)
      await getCustomerInfo(session?.user.accessToken, session?.user.id)
        .then((response) => {
          setIsCustomerInfoProcessing(false)
          if (response?.data?.customer) {
            dispatcher({
              type: 'billing',
              payload: transformAddress(response.data.customer.billing)
            })

            dispatcher({
              type: 'shipping',
              payload: transformAddress(response.data.customer.shipping)
            })
          }
        })
        .catch((error) => {
          console.error(error)
          setCheckoutFormNotification({
            type: 'ERROR',
            message: getText('CHECKOUT.GET_CUSTOMER_ERROR'),
            open: true
          })
          setIsCustomerInfoProcessing(false)
        })
    }

    ///Step 2
    //Get user session and populate the customer info
    if (!loading) invokeGetCustomerInfoAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, loading])

  const invokeCheckoutReview = (isAddressChange = false) => {
    setIsCheckoutReviewProcessing(true)
    const postData = transformCustomerData(state, true)
    if (postData.billing.country)
      checkoutReview({
        variables: {
          input: {
            clientMutationId: v4(),
            isAddressChange: isAddressChange,
            shippingMethods: postData.shippingMethods,
            shipping:
              postData.shipping.country != '' ? postData.shipping : null,
            billing: postData.billing.country != '' ? postData.billing : null
          }
        }
      })
  }

  //Checkout review mutation
  const [checkoutReview] = useMutation(CHECKOUT_REVIEW, {
    onCompleted: (data) => {
      //Receive the latest cart info as part of this api call and then populate the state.
      //This will reduce the number of graphql calls that get triggered during a address change
      updateCartLocally(data.checkoutReview)
    },
    onError: (error) => {
      setCheckoutFormNotification({
        type: 'ERROR',
        message: getText('CHECKOUT.REVIEW_ORDER_ERROR'),
        open: true
      })
      console.error(error)
      setIsCheckoutReviewProcessing(false)
    }
  })

  useEffect(() => {
    if (state.billing === null || state.shipping === null) return

    if (
      validateAddressFields(state.billing, state.shippingMethods) &&
      !state.shipToDifferentAddress &&
      cart
    ) {
      invokeCheckoutReview(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.billing?.intermediateCountry,
    state.billing?.country,
    state.billing?.state,
    state.billing?.postcode,
    state.billing?.address1,
    state.billing?.address2,
    state.billing?.city
  ])

  useEffect(() => {
    if (state.billing === null || state.shipping === null) return

    if (
      validateAddressFields(state.shipping, state.shippingMethods) &&
      state.shipToDifferentAddress &&
      cart
    ) {
      invokeCheckoutReview(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.shipping?.country,
    state.shipping?.intermediateCountry,
    state.shipping?.state,
    state.shipping?.postcode,
    state.shipping?.address1,
    state.shipping?.address2,
    state.shipping?.city
  ])

  useEffect(() => {
    if (state.billing === null || state.shipping === null) return

    if (
      validateAddressFields(
        state.shipToDifferentAddress ? state.shipping : state.billing,
        state.shippingMethods
      ) &&
      cart
    ) {
      invokeCheckoutReview(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.shipToDifferentAddress])

  useEffect(() => {
    if (state.billing === null || state.shipping === null) return

    if (
      validateAddressFields(
        state.shipToDifferentAddress ? state.shipping : state.billing,
        state.shippingMethods
      ) &&
      cart
    ) {
      invokeCheckoutReview(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.shippingMethods])

  // Get Cart Data.
  const {data} = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      updateCartLocally(data)
    },
    onError: (error) => {
      setCheckoutFormNotification({
        type: 'ERROR',
        message: getText('CHECKOUT.GET_CART_ERROR'),
        open: true
      })
      console.error(error)
    }
  })

  const updateCartLocally = (data) => {
    // Update cart in the localStorage.
    const updatedCart = getFormattedCart(data)
    localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart))

    // Update cart data in React Context.
    setCart(updatedCart)
    if (updatedCart?.chosenShippingMethods?.length > 0) {
      //We only set the first index, need to find out if there are other scenarios which will send multiple
      dispatcher({
        type: 'shippingMethods',
        payload: updatedCart.chosenShippingMethods[0]
      })
    }

    setIsCheckoutReviewProcessing(false)
  }

  useEffect(() => {
    if (state.billing?.country) {
      fetchStateData('billing', state.billing.country)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.billing?.country])

  useEffect(() => {
    if (state.shipping?.country && state.shipToDifferentAddress) {
      fetchStateData('shipping', state.shipping.country)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.shipping?.country])

  const [clearCartMutation] = useMutation(CLEAR_CART_MUTATION)

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
    if (!cart || cart?.products.length == 0)
      setCheckoutFormNotification({
        type: 'ERROR',
        message: getText('CHECKOUT.CART_EMPTY'),
        open: true
      })

    // Paypal payFlow
    if ('custom_paypal_payflow_gateway' === state.paymentMethod) {
      const checkOutData = {
        acct: payFlowData?.acct || '',
        amount: cart?.total ? cart?.total?.replace('$', '') : '0',
        city: state?.billing?.city,
        country_code: state.billing.country || '',
        cvv: payFlowData?.cvv || '',
        expdate: payFlowData?.expdate?.replace('/', '') || '',
        first_name: state?.billing?.firstName || '',
        last_name: state?.billing?.lastName || '',
        state: state?.billing?.state || '',
        street: state.billing?.address1?.street || '',
        zip: state.billing?.address1?.zip || ''
      }

      handlePayFlowToCheckout(checkOutData, state)
      return
    }

    // PayPal checkout flow
    // if ('custom_paypal_gateway' === state.paymentMethod) {
    //   setModalContent('')
    //   setContent(
    //     <div className={styles.section__model}>
    //       <PayPal
    //         handleCheckout={handleCheckout}
    //         customerData={state}
    //         handleOrderUpdate={handleOrderUpdate}
    //         handleError={handlePaymentError}
    //       />
    //     </div>
    //   )
    //   setIsOpen(true)
    // } else
    if ('custom_po_gateway' === state.paymentMethod) {
      let orderData = await handleCheckout(state)

      //Raise remove from cart GTM event
      if (orderData) {
        TagManager.dataLayer({
          dataLayer: {ecommerce: null}
        })
        TagManager.dataLayer({
          dataLayer: prepareTagManagerDataLayerObj(
            cart?.products,
            'purchase',
            cart?.appliedCoupons
              ? cart?.appliedCoupons
                  .map((c) => {
                    return c.code
                  })
                  .join(', ')
              : null,
            orderData?.data?.checkout?.order,
            cart
          )
        })
      }

      setOrder(orderData.data.checkout.order)
    } else {
      setCheckoutFormNotification({
        type: 'ERROR',
        message: getText('CHECKOUT.PAYMENT_TYPE_ERROR'),
        open: true
      })
    }

    //clear error
    setCheckoutFormNotification(null)
  }

  const handlePayFlowToCheckout = async (data) => {
    setIsProcessing(true)
    const tempState = {
      ...state,
      isPaid: true
    }

    let orderId = parseFloat(order?.orderNumber) || null

    if (!order) {
      let orderData = await handleCheckout(tempState)
      setOrder(orderData?.data?.checkout?.order)

      orderId = parseFloat(orderData?.data?.checkout?.order?.orderNumber)
    }

    if (!orderId) {
      setPaypalPayFlowErrorMessage('')
      setIsCheckoutProcessing(false)
      setIsProcessing(false)
      return
    }

    const res = await apolloClient.query({
      query: CHECKOUT_PAYFLOW_QUERY,
      variables: {
        ...data,
        order_id: orderId || ''
      }
    })

    if (res?.data?.customPaypalPayFlowField?.message !== 'Approved') {
      setPaypalPayFlowErrorMessage(paypal_payflow_error_message)
    }

    if (res?.data?.customPaypalPayFlowField?.message === 'Approved') {
      setPaypalPayFlowErrorMessage('')
    }

    setIsCheckoutProcessing(false)
    setIsProcessing(false)
  }

  const getFormattedError = (error) => {
    if (
      error.includes(
        'An account is already registered with your email address.'
      )
    ) {
      //We will strip off the anchor tag from the error message
      return `An account is already registered with your email address.`
    }

    return error
  }

  const handleCheckout = async (orderData) => {
    if (!isProcessing) setIsProcessing(true)
    setIsCheckoutProcessing(true)
    //Step 1: Build order data for request
    const checkOutData = transformCustomerData(orderData)

    //Step 2: Create the order
    const createCustomerOrder = await createTheOrder(
      createTheOrderMutation,
      checkOutData,
      session?.user.accessToken
    )

    if (state.paymentMethod === 'custom_paypal_gateway')
      setIsCheckoutProcessing(false)

    if (state.paymentMethod === 'custom_po_gateway') {
      setIsCheckoutProcessing(false)
      setIsProcessing(false)
    }

    if (!isEmpty(createCustomerOrder?.error)) {
      setCheckoutFormNotification({
        type: 'ERROR',
        message: getFormattedError(createCustomerOrder?.error),
        open: true
      })
      console.error(createCustomerOrder)
      setIsCheckoutProcessing(false)
      setIsProcessing(false)
      return null
    }

    if (!(createCustomerOrder.data.checkout.order.databaseId > 0)) {
      console.error(createCustomerOrder)
      setCheckoutFormNotification({
        type: 'ERROR',
        message: getText('CHECKOUT.CREATE_ORDER_ERROR'),
        open: true
      })
      console.error(createCustomerOrder)
      setIsCheckoutProcessing(false)
      setIsProcessing(false)
      return null
    }

    return createCustomerOrder
  }

  const router = useRouter()

  const handleOnPaymentModeChange = (currentPaymentMethod) => {
    dispatcher({
      type: 'paymentMethod',
      payload: currentPaymentMethod
    })
  }

  const handleOnChange = async (event) => {
    const {target} = event || {}
    switch (target.name) {
      case 'agreeToTermsAndConditions':
        setTermConditionsAgreement(!termConditionsAgreement)
        break
      case 'shipping_state':
        //The shipping states can be a select option list or textbox depending on the selected country. Debouncing a select onchange does not work. Hence the condition
        if (shippingStates && shippingStates.length > 0)
          dispatcher({
            type: target.name,
            payload: event.target.value
          })
        else debouncedCustomerInfoChangeHandler(event, target.name)
        break
      case 'billing_state':
        //The billing states can be a select option list or textbox depending on the selected country. Debouncing a select onchange does not work. Hence the condition
        if (billingStates && billingStates.length > 0)
          dispatcher({
            type: target.name,
            payload: event.target.value
          })
        else debouncedCustomerInfoChangeHandler(event, target.name)
        break
      case 'billing_address1':
      case 'billing_address2':
      case 'billing_city':
      case 'billing_postcode':
      case 'shipping_address1':
      case 'shipping_address2':
      case 'shipping_city':
      case 'shipping_postcode':
        debouncedCustomerInfoChangeHandler(event, target.name)
        break
      case 'shippingMethods':
      case 'billing_firstName':
      case 'billing_lastName':
      case 'billing_company':
      case 'billing_country':
      case 'billing_phone':
      case 'billing_email':
      case 'shipping_firstName':
      case 'shipping_lastName':
      case 'shipping_company':
      case 'shipping_country':
      case 'shipping_phone':
      case 'shipping_email':
      case 'shipToDifferentAddress':
      case 'customerNote':
      case 'payment_poNumber':
      case 'payment_customerNumber':
        dispatcher({type: target.name, payload: event.target.value})
        break
      default:
        break
    }
  }

  const fetchStateData = async (type, country) => {
    if (type === 'shipping') {
      dispatcher({
        type: 'shipping_intermediateCountry',
        payload: ''
      })
      setIsFetchingShippingStates(true)
      await getStates(country).then((response) => {
        dispatcher({
          type: 'shipping_intermediateCountry',
          payload: country
        })
        if (
          response?.data?.wooStates?.states &&
          response?.data?.wooStates?.states.length > 0
        ) {
          setShippingStates(response.data.wooStates.states)
          if (!state.shipping.state) {
            //If a default state is not available, set the 1st one in the list
            dispatcher({
              type: 'shipping_state',
              payload: response.data.wooStates.states[0].stateCode
            })
          }
        } else {
          setShippingStates('')
          dispatcher({
            type: 'shipping_state',
            payload: ''
          })
        }
        setIsFetchingShippingStates(false)
      })
    } else if (type === 'billing') {
      dispatcher({
        type: 'billing_intermediateCountry',
        payload: ''
      })
      setIsFetchingBillingStates(true)
      await getStates(country).then((response) => {
        dispatcher({
          type: 'billing_intermediateCountry',
          payload: country
        })
        if (
          response?.data?.wooStates?.states &&
          response?.data?.wooStates?.states.length > 0
        ) {
          setBillingStates(response.data.wooStates.states)
          if (!state.billing.state) {
            //If a default state is not available, set the 1st one in the list
            dispatcher({
              type: 'billing_state',
              payload: response.data.wooStates.states[0].stateCode
            })
          }
        } else {
          setBillingStates('')
          dispatcher({
            type: 'billing_state',
            payload: ''
          })
        }
        setIsFetchingBillingStates(false)
      })
    }
  }

  const couponActionCallback = ({type, message, data, coupon, action}) => {
    if (type === 'SUCCESS') {
      setCheckoutCouponNotification(null)
      updateCartLocally(data)

      //Raise add to cart GTM event
      if (action === 'APPLY') {
        TagManager.dataLayer({
          dataLayer: {ecommerce: null}
        })
        TagManager.dataLayer({
          dataLayer: prepareTagManagerDataLayerObj(
            cart?.products,
            'select_promotion',
            coupon,
            null,
            cart
          )
        })
      }
    } else if (type === 'ERROR') {
      console.error(message)
      setCheckoutCouponNotification({
        type: 'ERROR',
        message: message,
        open: true
      })
    }
  }

  const formDefaults = () => {
    var newFormDefaults = {}
    for (var s in state?.shipping) {
      newFormDefaults['shipping_' + s] = !isNull(state.shipping[s])
        ? state.shipping[s]
        : ''
    }
    for (var b in state?.billing) {
      newFormDefaults['billing_' + b] = !isNull(state.billing[b])
        ? state.billing[b]
        : ''
    }

    newFormDefaults['payment_poNumber'] = !isNull(state?.poNumber)
      ? state.poNumber
      : ''

    newFormDefaults['payment_customerNumber'] = !isNull(state?.customerNumber)
      ? state.customerNumber
      : ''

    newFormDefaults['payment_cc'] = !isNull(state?.paymentMethod)
      ? state.paymentMethod
      : ''

    newFormDefaults['customerNote'] = !isNull(state?.customerNote)
      ? state.customerNote
      : ''

    newFormDefaults['shippingMethods'] = !isNull(state?.shippingMethods)
      ? state.shippingMethods
      : ''

    return newFormDefaults
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCustomerInfoChangeHandler = useCallback(
    debounce((event, field) => {
      switch (field) {
        case 'billing_address1':
        case 'billing_address2':
        case 'billing_postcode':
        case 'billing_city':
        case 'billing_state':
        case 'shipping_address1':
        case 'shipping_address2':
        case 'shipping_postcode':
        case 'shipping_city':
        case 'shipping_state':
          dispatcher({type: field, payload: event.target.value})
          break
        default:
          break
      }
    }, 500),
    []
  )

  const isShippingMethodsAvailable = () => {
    if (
      !cart ||
      !cart.availableShippingMethods ||
      cart.availableShippingMethods.length === 0 ||
      !cart.availableShippingMethods
    )
      return false

    return cart.availableShippingMethods[0]?.rates?.length > 0
  }

  const [refreshLogin, setRefreshLogin] = useState(false)

  const openNotification = (open) => {
    setRefreshLogin(open)
  }

  return (
    <section className={styles.section}>
      <Container>
        <SectionHead
          heading="Checkout"
          alignment="left"
          className={styles.section__head}
        />
        {cart?.products?.length > 0 ? (
          <div className={styles.section__checkout}>
            {isCheckoutProcessing ? (
              <LoginCouponSkeleton />
            ) : (
              <>
                {!isLoggedIn && (
                  <Accordion
                    refresh={refreshLogin}
                    accordionSectionClasName={
                      styles.section__checkout__accordion
                    }
                    accordionTitleClassName={
                      styles.section__checkout__accordion__tab
                    }
                    accordionIconClassName={
                      styles.section__checkout__accordion__icon
                    }
                    accordionContentClassName={
                      styles.section__checkout__accordion__content
                    }
                    accordionTextClassName={
                      styles.section__checkout__accordion__text
                    }
                    isRichtextTitle={true}
                    title={
                      <>
                        Returning customer?{' '}
                        <span
                          className={
                            styles.section__checkout__accordion__tab__link
                          }
                        >
                          Click here to login
                        </span>
                      </>
                    }
                    dangerouslySetInnerHTML={false}
                    content={
                      <div
                        className={
                          styles.section__checkout__accordion__content__wrapper
                        }
                      >
                        <p>{getText('CHECKOUT.CUSTOMER_LOGIN_INSTRUCTIONS')}</p>
                        <Login
                          className={
                            styles.section__checkout__accordion__content__wrapper__login
                          }
                          isTwoColumnLayout={true}
                          openNotification={() => openNotification(true)}
                        />
                      </div>
                    }
                  />
                )}
                <Accordion
                  refresh={checkoutCouponNotification?.open}
                  accordionSectionClasName={styles.section__checkout__accordion}
                  accordionTitleClassName={
                    styles.section__checkout__accordion__tab
                  }
                  accordionIconClassName={
                    styles.section__checkout__accordion__icon
                  }
                  accordionTextClassName={
                    styles.section__checkout__accordion__text
                  }
                  accordionContentClassName={
                    styles.section__checkout__accordion__content
                  }
                  isRichtextTitle={true}
                  title={
                    <>
                      Have a coupon?{' '}
                      <span
                        className={
                          styles.section__checkout__accordion__tab__link
                        }
                      >
                        Click here to enter your code
                      </span>
                    </>
                  }
                  dangerouslySetInnerHTML={false}
                  content={
                    <>
                      <div
                        className={`${styles['section__checkout__accordion__content__wrapper']} ${styles['grid']} ${styles['gap-sm']}`}
                      >
                        <div className={` ${styles['col-12@md']}`}>
                          <PageNotifications
                            {...checkoutCouponNotification}
                            closeNotification={() =>
                              setCheckoutCouponNotification(null)
                            }
                          />
                          <p>{getText('CHECKOUT.COUPON_INSTRUCTIONS')}</p>
                        </div>
                        <div
                          className={`${styles['section__checkout__accordion__content__wrapper__coupon']} ${styles['col-6@md']}`}
                        >
                          <Coupon couponActionCallback={couponActionCallback} />
                        </div>
                      </div>
                    </>
                  }
                />
              </>
            )}
            {state.billing && state.shipping && !isCheckoutProcessing ? (
              <Form
                onSubmit={onSubmit}
                showSubmitButton={false}
                shouldEnableReinitialize={true}
                formDefaults={formDefaults()}
                onChange={(event) => handleOnChange(event)}
              >
                <div className={`${styles['grid']} ${styles['gap-sm']}`}>
                  <div className={`${styles['col-7@md']}`}>
                    {isCustomerInfoProcessing ? (
                      <BillingDetailsSkeleton />
                    ) : (
                      <>
                        <div className={styles.section__checkout__header}>
                          Billing details
                        </div>
                        <div className={`${styles.section__checkout__content}`}>
                          <PageNotifications
                            {...checkoutFormNotification}
                            closeNotification={() =>
                              setCheckoutFormNotification(null)
                            }
                          />
                          <div
                            className={
                              styles.section__checkout__content__header
                            }
                          >
                            {getText('CHECKOUT.TAX_INSTRUCTIONS')}
                          </div>
                          {state.billing && state.billing != null && (
                            <CustomerDetails
                              input={state.billing}
                              type="billing"
                              countries={countries?.billingCountries}
                              states={billingStates}
                              isFetchingStates={isFetchingBillingStates}
                              isRequired={true}
                              isShowCustomerNumber={true}
                              isShowPoNumber={true}
                            />
                          )}

                          <div
                            className={styles.section__checkout__content__type}
                          >
                            <Checkbox
                              type="checkbox"
                              label="Ship to a different address?"
                              id="shipToDifferentAddress"
                              name="shipToDifferentAddress"
                            />
                          </div>
                          <div
                            className={
                              styles['section__checkout__content__additional']
                            }
                          >
                            {state.shipToDifferentAddress &&
                              state.shipping &&
                              state.shipping != null && (
                                <CustomerDetails
                                  input={state.shipping}
                                  type="shipping"
                                  countries={countries?.shippingCountries}
                                  states={shippingStates}
                                  isFetchingStates={isFetchingShippingStates}
                                  isRequired={state.shipToDifferentAddress}
                                />
                              )}
                            <div
                              className={
                                styles[
                                  'section__checkout__content__additional--notes'
                                ]
                              }
                            >
                              <Text
                                id="customerNote"
                                name="customerNote"
                                className={styles.field}
                                label="Order Notes"
                                type="text"
                                value={state.customerNote}
                                onChange={handleOnChange}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={`${styles['col-5@md']}`}>
                    {isCheckoutReviewProcessing || isCustomerInfoProcessing ? (
                      <OrderSummarySkeleton />
                    ) : (
                      <>
                        <div className={styles.section__checkout__header}>
                          Your order
                        </div>
                        <div
                          className={`${styles.section__checkout__content} ${styles['section__checkout__content--border']}`}
                        >
                          <div
                            className={
                              styles.section__checkout__content__summary
                            }
                          >
                            <OrderSummary
                              cart={cart}
                              showHeader={true}
                              couponActionCallback={couponActionCallback}
                              showProducts={true}
                              styleType="checkout"
                              shippingMethods={state.shippingMethods}
                              handleShippingOnChange={handleOnChange}
                            />
                          </div>
                          <div
                            className={
                              styles.section__checkout__content__payment
                            }
                          >
                            <PaymentModes
                              paymentMethod={state.paymentMethod}
                              handleOnChange={setPayFlowData}
                              payFlowData={payFlowData}
                              setPayFlowData={setPayFlowData}
                              handleOnPaymentModeChange={
                                handleOnPaymentModeChange
                              }
                              paypalPayflowErrorMessage={
                                paypalPayFlowErrorMessage
                              }
                              setPaypalPayFlowErrorMessage={
                                setPaypalPayFlowErrorMessage
                              }
                              enablePaypal={false}
                            />
                          </div>
                          <div
                            className={
                              styles.section__checkout__content__policy
                            }
                          >
                            <PrivacyPolicy />
                          </div>
                          <div
                            className={styles.section__checkout__content__terms}
                          >
                            <AcceptTermsConditions
                              termConditionsAgreement={termConditionsAgreement}
                              handleOnChange={handleOnChange}
                            />
                          </div>
                          <div
                            className={
                              styles.section__checkout__content__checkout
                            }
                          >
                            <Button
                              size="sm"
                              isSubmit={true}
                              text="Proceed to Checkout"
                              loading={isProcessing}
                              disabled={
                                !termConditionsAgreement ||
                                isCheckoutProcessing ||
                                !isShippingMethodsAvailable()
                              }
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Form>
            ) : (
              <div className={`${styles['grid']} ${styles['gap-sm']}`}>
                <div className={`${styles['col-7@md']}`}>
                  <BillingDetailsSkeleton />
                </div>
                <div className={`${styles['col-5@md']}`}>
                  <OrderSummarySkeleton />
                </div>
              </div>
            )}
          </div>
        ) : (
          <PageNotifications
            message={getText('CHECKOUT.CART_EMPTY')}
            type="INFO"
            open={true}
          />
        )}
      </Container>
    </section>
  )
}

Checkout.propTypes = {}

export default Checkout
