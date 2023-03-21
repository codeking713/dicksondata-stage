import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import {AppContext} from '@/components/context/AppContext'
import ApplyCoupon from '@/components/molecules/Checkout/Coupon/ApplyCoupon'
import OrderSummary from '@/components/molecules/Checkout/OrderSummary'
import ProductInfo from '@/components/molecules/Checkout/ProductInfo'
import CartSkeleton from '@/components/molecules/Checkout/Skeleton/CartSkeleton'
import Form from '@/components/molecules/Form'
import NumberTextbox from '@/components/molecules/NumberTextbox'
import PageNotifications from '@/components/molecules/PageNotifications'
import ProductAddonPrice from '@/components/molecules/ProductAddonPrice'
import ProductPrice from '@/components/molecules/ProductPrice'
import SectionHead from '@/components/molecules/SectionHead'
import {
  getFormattedCart,
  getUpdatedItems
} from '@/functions/checkout/checkoutUtil'
import {
  getFloatVal,
  prepareTagManagerDataLayerObj
} from '@/functions/checkout/commonUtil'
import {getText} from '@/functions/checkout/textUtil'
import {isCompositeProductChild} from '@/functions/product/productUtil'
import REMOVE_FROM_CART from '@/lib/next-api/wordpress/checkout/remove-from-cart'
import UPDATE_CART from '@/lib/next-api/wordpress/checkout/update-cart'
import GET_CART from '@/lib/wordpress/_query-partials/getCart'
import {useMutation, useQuery} from '@apollo/client'
import {useRouter} from 'next/router'
import React, {useContext, useState} from 'react'
import TagManager from 'react-gtm-module'
import {v4} from 'uuid'
import styles from './Cart.module.scss'

/**
 * Render the Cart component.
 *
 * @author DAP
 * @return {Element} The Cart component.
 */
const Cart = () => {
  const [cartNotification, setCartNotification] = useState(null)
  const [cart, setCart] = useContext(AppContext)
  const [isCartProcessing, setIsCartProcessing] = useState(true)
  const router = useRouter()

  // Get Cart Data.
  const {data} = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      updateCartLocally(data)
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message
          ? error.graphQLErrors[0].message
          : ''
        setCartNotification({
          type: 'ERROR',
          message: errorMessage,
          open: true
        })
      }
    }
  })

  // Update Cart Mutation.
  const [updateCart, {loading: updateCartProcessing}] = useMutation(
    UPDATE_CART,
    {
      onCompleted: (data) => {
        updateCartLocally({cart: data.updateItemQuantities.cart})
      },
      onError: (error) => {
        if (error) {
          const errorMessage = error?.graphQLErrors?.[0]?.message
            ? error.graphQLErrors[0].message
            : ''
          setCartNotification({
            type: 'ERROR',
            message: errorMessage,
            open: true
          })
        }
      }
    }
  )

  // Remove from Cart Mutation.
  const [removeFromCart, {loading: removeFromCartProcessing}] = useMutation(
    REMOVE_FROM_CART,
    {
      onCompleted: (data) => {
        updateCartLocally({cart: data.removeItemsFromCart.cart})
      },
      onError: (error) => {
        if (error) {
          const errorMessage = error?.graphQLErrors?.[0]?.message
            ? error.graphQLErrors[0].message
            : ''
          setCartNotification({
            type: 'ERROR',
            message: errorMessage,
            open: true
          })
        }
      }
    }
  )

  const updateCartLocally = (data) => {
    // Update cart in the localStorage.
    const updatedCart = getFormattedCart(data)
    localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart))

    // Update cart data in React Context.
    setCart(updatedCart)
    setIsCartProcessing(false)
  }

  const handleRemoveProductClick = (event, cartKey) => {
    event.stopPropagation()

    //Raise remove from cart GTM event
    TagManager.dataLayer({
      dataLayer: {ecommerce: null}
    })
    TagManager.dataLayer({
      dataLayer: prepareTagManagerDataLayerObj(
        cart?.products.find((p) => p.cartKey == cartKey),
        'remove_from_cart'
      )
    })

    removeFromCart({
      variables: {
        input: {
          clientMutationId: v4(),
          keys: [cartKey]
        }
      }
    })
  }

  const couponActionCallback = ({type, message, data, coupon, action}) => {
    if (type === 'SUCCESS') {
      updateCartLocally(data)
      setCartNotification(null)

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
    } else if (type === 'ERROR')
      setCartNotification({
        type: 'ERROR',
        message: message,
        open: true
      })
  }

  const handleQtyChange = (newValue, cartKey) => {
    if (process.browser) {
      // If the previous update cart mutation request is still processing, then return.
      if (updateCartProcessing) {
        return
      }

      if (cart.products.length) {
        const updatedItems = getUpdatedItems(cart.products, newValue, cartKey)

        updateCart({
          variables: {
            input: {
              clientMutationId: v4(),
              items: updatedItems
            }
          }
        })
      }
    }
  }

  const handleProceedToCheckout = () => {
    //Raise remove from cart GTM event
    TagManager.dataLayer({
      dataLayer: {ecommerce: null}
    })
    TagManager.dataLayer({
      dataLayer: prepareTagManagerDataLayerObj(
        cart.products,
        'begin_checkout',
        null,
        null,
        cart
      )
    })

    setIsCartProcessing(true)
    router.push(`/checkout`)
  }

  const columns = [
    {fullName: 'Product', shortName: 'Product'},
    {fullName: 'Price', shortName: 'Price'},
    {fullName: 'Quantity', shortName: 'Qty'},
    {fullName: 'Subtotal', shortName: 'Subtotal'}
  ]

  return (
    <section className={styles.section}>
      <Container>
        <SectionHead
          heading="Your cart"
          alignment="left"
          className={styles.section__head}
        />
        <PageNotifications
          {...cartNotification}
          closeNotification={() => setCartNotification(null)}
          className={styles['section--notification']}
        />
        <div
          className={`${styles.section__cart} ${
            isCartProcessing && styles['section--loader']
          }`}
        >
          {isCartProcessing ? (
            <CartSkeleton />
          ) : (
            <>
              {cart?.products?.length > 0 ? (
                <>
                  <table className={styles.section__cart__table}>
                    <thead>
                      <tr>
                        <th
                          className={`${styles['section__cart__table__cell--left']}`}
                          scope="col"
                        >
                          {columns[0].fullName}
                        </th>
                        <th scope="col">{columns[1].fullName}</th>
                        <th scope="col">{columns[2].fullName}</th>
                        <th
                          className={`${styles['section__cart__table__cell--center']}`}
                          scope="col"
                        >
                          {columns[3].fullName}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.products.length > 0 &&
                        cart.products.map((item) => (
                          <tr key={item.productId}>
                            <td>
                              <ProductInfo
                                handleRemoveProductClick={
                                  handleRemoveProductClick
                                }
                                product={item}
                                showImage={true}
                                showRemoveProduct={
                                  !isCompositeProductChild(item)
                                }
                                isCompositeChild={isCompositeProductChild(item)}
                                disabled={
                                  updateCartProcessing ||
                                  removeFromCartProcessing
                                }
                              />
                            </td>
                            <td data-title={columns[1].shortName}>
                              <div
                                className={`${styles.section__cart__table__cell__price}`}
                              >
                                {!isCompositeProductChild(item) &&
                                  item.type != 'BUNDLE' &&
                                  item.type != 'COMPOSITE' && (
                                    <>
                                      <ProductPrice
                                        price={item.price}
                                        priceRaw={getFloatVal(item.price)}
                                        regularPrice={item.regularPrice}
                                        regularPriceRaw={getFloatVal(
                                          item.regularPrice
                                        )}
                                        onSale={item.onSale}
                                      />
                                      {item.addons &&
                                        item.addons.length > 0 && (
                                          <ProductAddonPrice
                                            addons={item.addons}
                                            quantity={item.qty}
                                            price={getFloatVal(item.price)}
                                            currency="$"
                                          />
                                        )}
                                    </>
                                  )}
                              </div>
                            </td>
                            <td data-title={columns[2].shortName}>
                              <div
                                className={`${styles.section__cart__table__cell__quantity}`}
                              >
                                <NumberTextbox
                                  value={item.qty}
                                  id={item.cartKey}
                                  handleQtyChange={handleQtyChange}
                                  min={1}
                                  max={2147483647}
                                  handleRemoveProductClick={
                                    handleRemoveProductClick
                                  }
                                  disabled={
                                    updateCartProcessing ||
                                    isCompositeProductChild(item)
                                  }
                                />
                              </div>
                            </td>
                            <td data-title={columns[3].shortName}>
                              <div
                                className={`${styles.section__cart__table__cell__total}`}
                              >
                                {getFloatVal(item.subtotal) > 0 &&
                                  item.subtotal}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          colSpan={4}
                          className={`${styles.section__cart__table__cell__actions}`}
                        >
                          <div
                            className={
                              styles.section__cart__table__cell__actions__wrapper
                            }
                          >
                            <ApplyCoupon
                              couponActionCallback={couponActionCallback}
                            />
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <Form
                    showSubmitButton={false}
                    shouldEnableReinitialize={true}
                  >
                    <OrderSummary
                      cart={cart}
                      showHeader={true}
                      couponActionCallback={couponActionCallback}
                      styleType="cart"
                    />
                  </Form>
                  <div className={styles.section__cart__checkout}>
                    <Button
                      onClick={handleProceedToCheckout}
                      size="sm"
                      text="Proceed to Checkout"
                    />
                  </div>
                </>
              ) : (
                <PageNotifications
                  message={getText('CHECKOUT.CART_EMPTY')}
                  type="INFO"
                  open={true}
                />
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  )
}

Cart.propTypes = {}

export default Cart
