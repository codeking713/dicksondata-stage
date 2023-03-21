import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../Skeleton.module.scss'

/**
 * Render the OrderReceivedSkeleton component.
 *
 * @author DAP
 * @return {Element} The OrderReceivedSkeleton component.
 */
const OrderReceivedSkeleton = () => {
  return (
    <>
      <div className={`${styles['grid']} ${styles['gap-md']}`}>
        <div className={`${styles['skeleton--center']} ${styles['col-12@md']}`}>
          <Skeleton circle={true} count={1} width={50} height={50} />
        </div>
        <div className={`${styles['skeleton--center']} ${styles['col-12@md']}`}>
          <Skeleton count={1} width={200} height={30} />
        </div>
        <div className={`${styles['skeleton--center']} ${styles['col-12@md']}`}>
          <Skeleton count={1} width={150} height={15} />
          <Skeleton count={1} width={300} height={10} />
          <Skeleton count={1} width={200} height={10} />
        </div>
        <div className={`${styles['col-12@md']}`}></div>
        <div className={`${styles['col-4@md']}`}>
          <Skeleton count={1} height={60} />
        </div>
        <div className={`${styles['col-4@md']}`}>
          <Skeleton count={1} height={60} />
        </div>
        <div className={`${styles['col-4@md']}`}>
          <Skeleton count={1} height={60} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={60} />
        </div>
        <div className={`${styles['col-3@md']}`}>
          <Skeleton count={1} height={100} />
        </div>
        <div className={`${styles['col-3@md']}`}>
          <Skeleton count={3} height={10} />
        </div>
        <div className={`${styles['col-3@md']}`}>
          <Skeleton count={1} height={10} />
        </div>
        <div className={`${styles['col-3@md']}`}>
          <Skeleton count={1} height={10} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={20} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={20} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={20} />
        </div>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={20} />
        </div>
        <div
          className={`${styles['col-12@md']} ${styles['skeleton--right']} ${styles.skeleton__subsection}`}
        >
          <Skeleton count={1} width={150} height={40} />
        </div>
      </div>
    </>
  )
}

export default OrderReceivedSkeleton
