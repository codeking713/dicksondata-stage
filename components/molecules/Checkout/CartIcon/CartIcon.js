import {AppContext} from '@/components/context/AppContext'
import {languageRestrictsPerchase} from '@/functions/checkout/commonUtil'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {useContext} from 'react'
import styles from './CartIcon.module.scss'

/**
 * Render the CartIcon component.
 *
 * @param  {object}  props       Props of CartIcon
 * @param  {string}  props.style Style type -> desktop | mobile
 * @return {Element}             The CartIcon component.
 */
export default function CartIcon({style}) {
  const [cart] = useContext(AppContext)
  const {locale, defaultLocale} = useRouter()
  const productsCount =
    null !== cart && Object.keys(cart).length ? cart.totalProductsCount : ''

  if (
    !productsCount ||
    productsCount === 0 ||
    languageRestrictsPerchase(defaultLocale, locale) //We do not allow to view the cart, if the language is different from the default language
  )
    return ''

  return (
    <div className={`${styles.cart}`}>
      <div
        className={`${styles.cart__button} ${
          style == 'MOBILE' && styles['cart__button--mobile']
        }`}
      >
        <div
          className={`${styles.cart__button__icon} ${
            style == 'MOBILE' && styles['cart__button__icon--mobile']
          }`}
        >
          <Link href="/cart">
            <a alt="Cart">
              {productsCount > 0 && (
                <div
                  title={`${productsCount}`}
                  className={styles.cart__button__icon__badge}
                >
                  <span className={styles.cart__button__icon__badge__number}>
                    {productsCount}
                  </span>
                </div>
              )}
              <svg
                width="24"
                height="23"
                viewBox="0 0 24 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.8522 4.29477C23.7072 4.09609 23.4759 3.97852 23.23 3.97852H8.34232C7.91694 3.97852 7.57228 4.32318 7.57228 4.74856C7.57228 5.17395 7.91694 5.51861 8.34232 5.51861H22.1747L21.6194 7.25124H10.0321C9.60671 7.25124 9.26206 7.5959 9.26206 8.02128C9.26206 8.44667 9.60671 8.79133 10.0321 8.79133H21.1256L20.4881 10.7806H10.9305C10.5051 10.7806 10.1605 11.1253 10.1605 11.5508C10.1605 11.9762 10.5051 12.3209 10.9305 12.3209H19.9946L19.4599 13.9893H9.27532L5.09141 1.92942C5.0175 1.71684 4.85476 1.54738 4.64562 1.46505L1.05198 0.0533289C0.655918 -0.101732 0.208996 0.0928059 0.053451 0.488381C-0.101825 0.884171 0.0926594 1.33136 0.488503 1.48691L3.75236 2.76908L7.74738 14.2845C7.57105 14.3459 7.42162 14.4812 7.35357 14.6705L6.19848 17.8791C6.12769 18.0758 6.15686 18.2944 6.27733 18.4654C6.39764 18.6363 6.59331 18.7381 6.80224 18.7381H7.39541C7.02782 19.1472 6.80224 19.6859 6.80224 20.2783C6.80224 21.5522 7.83874 22.5884 9.11242 22.5884C10.3861 22.5884 11.4226 21.5522 11.4226 20.2783C11.4226 19.6859 11.197 19.1472 10.8294 18.7381H15.8661C15.4984 19.1472 15.2728 19.6859 15.2728 20.2783C15.2728 21.5522 16.309 22.5884 17.583 22.5884C18.8569 22.5884 19.8932 21.5522 19.8932 20.2783C19.8932 19.6859 19.6676 19.1472 19.3001 18.7381H20.0215C20.376 18.7381 20.6632 18.4508 20.6632 18.0964C20.6632 17.742 20.3759 17.4547 20.0215 17.4547H7.71531L8.43068 15.4677C8.52306 15.5065 8.62285 15.5295 8.72732 15.5295H20.0214C20.3562 15.5295 20.6525 15.3132 20.7545 14.9946L23.9631 4.98376C24.0384 4.74937 23.9971 4.49344 23.8522 4.29477ZM9.11242 21.305C8.54615 21.305 8.0857 20.8445 8.0857 20.2783C8.0857 19.712 8.54615 19.2515 9.11242 19.2515C9.67869 19.2515 10.1391 19.712 10.1391 20.2783C10.1391 20.8445 9.67869 21.305 9.11242 21.305ZM17.5829 21.305C17.0167 21.305 16.5562 20.8445 16.5562 20.2783C16.5562 19.712 17.0167 19.2515 17.5829 19.2515C18.1492 19.2515 18.6097 19.712 18.6097 20.2783C18.6097 20.8445 18.1492 21.305 17.5829 21.305Z"
                  fill={`${style == 'MOBILE' ? '#fff' : '#1279BD'}`}
                  stroke={`${style == 'MOBILE' ? '#fff' : '#1279BD'}`}
                  strokeWidth="0.1"
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}