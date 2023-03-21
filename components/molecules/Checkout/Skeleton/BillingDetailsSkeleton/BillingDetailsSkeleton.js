import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../Skeleton.module.scss'

/**
 * Render the BillingDetailsSkeleton component.
 *
 * @author DAP
 * @return {Element} The BillingDetailsSkeleton component.
 */
const BillingDetailsSkeleton = () => {
  return (
    <>
      <div className={`${styles['grid']} ${styles['gap-md']}`}>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={60} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={15} />
        </div>
        <div className={`${styles['col-6@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-6@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-6@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-6@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-6@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-6@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-12@md']}`}></div>
        <div className={`${styles['col-6@md']}`}>
          <Skeleton count={1} height={20} />
        </div>
        <div className={`${styles['col-12@md']}`}></div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
      </div>
    </>
  )
}

export default BillingDetailsSkeleton
