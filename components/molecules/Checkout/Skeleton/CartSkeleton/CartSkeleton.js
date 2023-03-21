import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../Skeleton.module.scss'

/**
 * Render the CartSkeleton component.
 *
 * @author DAP
 * @return {Element} The CartSkeleton component.
 */
const CartSkeleton = () => {
  return (
    <>
      <div className={`${styles['grid']} ${styles['gap-md']}`}>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={60} />
        </div>
        <div className={`${styles['col-3@md']} ${styles.skeleton__subsection}`}>
          <Skeleton count={1} height={200} />
        </div>
        <div className={`${styles['col-3@md']} ${styles.skeleton__subsection}`}>
          <Skeleton count={3} height={10} />
        </div>
        <div className={`${styles['col-3@md']} ${styles.skeleton__subsection}`}>
          <Skeleton count={1} height={10} />
        </div>
        <div className={`${styles['col-3@md']} ${styles.skeleton__subsection}`}>
          <Skeleton count={1} height={10} />
        </div>
        <div className={`${styles['col-6@md']} ${styles.skeleton__subsection}`}>
          <Skeleton count={1} height={60} />
        </div>
        <div
          className={`${styles['col-12@md']} ${styles.skeleton__subsection}`}
        >
          <Skeleton count={1} height={40} />
        </div>
        <div
          className={`${styles['col-12@md']} ${styles.skeleton__subsection}`}
        >
          <Skeleton count={1} height={40} />
        </div>
        <div
          className={`${styles['col-12@md']} ${styles.skeleton__subsection}`}
        >
          <Skeleton count={1} height={40} />
        </div>
        <div
          className={`${styles['col-12@md']} ${styles.skeleton__subsection}`}
        >
          <Skeleton count={1} height={40} />
        </div>
        <div
          className={`${styles['col-12@md']} ${styles.skeleton__subsection}`}
        >
          <Skeleton count={1} height={40} />
        </div>
        <div
          className={`${styles['col-12@md']} ${styles['skeleton--right']} ${styles.skeleton__subsection}`}
        >
          <Skeleton count={1} width={150} height={40} />
        </div>
        <div className={`${styles['col-12@md']} ${styles.subsection}`}></div>
      </div>
    </>
  )
}

export default CartSkeleton
