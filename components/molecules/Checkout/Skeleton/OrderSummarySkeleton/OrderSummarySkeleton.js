import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../Skeleton.module.scss'

/**
 * Render the OrderSummarySkeleton component.
 *
 * @author DAP
 * @return {Element} The OrderSummarySkeleton component.
 */
const OrderSummarySkeleton = () => {
  return (
    <>
      <div className={`${styles['grid']} ${styles['gap-md']}`}>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={60} />
        </div>
        <div className={`${styles['col-12@md']}`}></div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-10@md']}`}>
          <Skeleton count={1} height={10} />
          <Skeleton count={1} height={40} />
        </div>
        <div className={`${styles['col-2@md']}`}>
          <Skeleton count={1} height={20} />
        </div>
        <div className={`${styles['col-10@md']}`}>
          <Skeleton count={1} height={50} />
        </div>
        <div className={`${styles['col-2@md']}`}>
          <Skeleton count={1} height={50} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={4} height={35} />
        </div>
        <div className={`${styles['col-4@md']}`}>
          <Skeleton count={1} height={30} />
        </div>
        <div className={`${styles['col-8@md']}`}>
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
          <Skeleton count={1} height={80} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={80} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={3} height={20} />
        </div>
        <div className={`${styles['col-2@md']}`}>
          <Skeleton count={1} height={40} />
        </div>
        <div className={`${styles['col-10@md']}`}>
          <Skeleton count={1} height={40} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={40} />
        </div>
      </div>
    </>
  )
}

export default OrderSummarySkeleton
