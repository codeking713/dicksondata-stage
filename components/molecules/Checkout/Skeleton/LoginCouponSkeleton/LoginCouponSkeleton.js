import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../Skeleton.module.scss'

/**
 * Render the LoginCouponSkeleton component.
 *
 * @author DAP
 * @return {Element} The LoginCouponSkeleton component.
 */
const LoginCouponSkeleton = () => {
  return (
    <>
      <div className={`${styles['grid']} ${styles['gap-sm']}`}>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={65} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={65} />
        </div>
        <div className={`${styles['col-12@md']}`}></div>
      </div>
    </>
  )
}

export default LoginCouponSkeleton
