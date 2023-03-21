import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../Skeleton.module.scss'

/**
 * Render the ProductSupportSkeleton component.
 *
 * @author DAP
 * @return {Element} The ProductSupportSkeleton component.
 */
const ProductSupportSkeleton = () => {
  return (
    <>
      <div className={`${styles['grid']} ${styles['gap-lg']}`}>
        <div className={`${styles['col-12@md']}`}>
          <Skeleton count={1} height={10} width={250} />
        </div>
        <div className={`${styles['skeleton__header']} ${styles['col-12@md']}`}>
          <Skeleton
            className={styles.skeleton__header__image}
            count={1}
            height={60}
            width={60}
          />
          <Skeleton count={1} height={60} width={400} />
        </div>
        <div className={`${styles['col-3@md']}`}>
          <Skeleton count={1} height={400} />
        </div>
        <div className={`${styles['col-9@md']}`}>
          <div className={`${styles['grid']} ${styles['gap-sm']}`}>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} height={50} />
            </div>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} height={50} />
            </div>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} height={50} />
            </div>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} height={50} />
            </div>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} height={50} />
            </div>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} height={50} />
            </div>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} height={50} />
            </div>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} height={50} />
            </div>
            <div className={`${styles['col-12@md']}`}>
              <Skeleton count={1} height={50} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductSupportSkeleton
